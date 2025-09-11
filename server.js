// Alpha Med Lab - server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'lab.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);

const db = new sqlite3.Database(DB_FILE);

// view engine & static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'alpha-med-secret', resave: false, saveUninitialized: true }));

// --- DB init & seed ---
function seedDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tests_master (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      department_id INTEGER,
      test_code TEXT,
      test_name TEXT,
      parameter TEXT,
      normal_min REAL,
      normal_max REAL,
      unit TEXT,
      FOREIGN KEY(department_id) REFERENCES departments(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_code TEXT UNIQUE,
      name TEXT,
      dob TEXT,
      phone TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tests_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_code TEXT UNIQUE,
      patient_id INTEGER,
      master_test_id INTEGER,
      status TEXT,
      result_value TEXT,
      result_flag TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(master_test_id) REFERENCES tests_master(id)
    )`);

    // insert default users if none
    db.get("SELECT COUNT(*) as c FROM users", (err, row) => {
      if (!row || row.c === 0) {
        const stmt = db.prepare("INSERT INTO users (username,password,role) VALUES (?,?,?)");
        stmt.run('admin','admin123','admin');
        stmt.run('reception','reception123','reception');
        stmt.run('tech','tech123','technician');
        stmt.finalize();
        console.log('Inserted default users');
      }
    });

    // seed departments + tests if empty
    db.get("SELECT COUNT(*) as c FROM departments", (err, row) => {
      if (!row || row.c === 0) {
        const departments = [
          "Hematology","Biochemistry","Microbiology","Immunology",
          "Serology","Hormones","Urinalysis","Toxicology",
          "Histopathology","Cytology","Genetics","Blood Bank",
          "Microbiology Cultures","Virology","Parasitology","Electrolytes",
          "Cardiac Markers","Liver Function","Renal Function","Endocrinology"
        ];
        const insertDept = db.prepare("INSERT INTO departments (name) VALUES (?)");
        departments.forEach(d => insertDept.run(d));
        insertDept.finalize(() => {
          console.log('Inserted departments');
          // create tests for each department
          db.all("SELECT id,name FROM departments", (err, rows) => {
            const insertTest = db.prepare(`INSERT INTO tests_master
              (department_id,test_code,test_name,parameter,normal_min,normal_max,unit)
              VALUES (?,?,?,?,?,?,?)`);
            rows.forEach(dept => {
              for (let i=1;i<=25;i++){
                const testName = `${dept.name} Test ${i}`;
                const code = dept.name.substring(0,3).toUpperCase() + '-' + String(i).padStart(3,'0');
                const param = `Param ${i}`;
                const base = 10 + (i % 30);
                const min = (base * 0.5).toFixed(2);
                const max = (base * 1.5).toFixed(2);
                const unit = (i % 2 === 0) ? 'mg/dL' : 'IU/L';
                insertTest.run(dept.id, code, testName, param, Number(min), Number(max), unit);
              }
            });
            insertTest.finalize(()=>console.log('Inserted master tests'));
          });
        });
      }
    });
  });
}

// Call seed
seedDatabase();

// --- Auth helpers ---
function requireLogin(req,res,next){
  if(!req.session.user) return res.redirect('/login');
  next();
}

function requireRole(role){
  return (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    if(req.session.user.role !== role) return res.status(403).send('Access denied');
    next();
  }
}

// --- Routes ---
app.get('/', (req,res)=>{
  if(!req.session.user) return res.redirect('/login');
  const role = req.session.user.role;
  if(role==='admin') return res.redirect('/admin');
  if(role==='reception') return res.redirect('/reception');
  if(role==='technician') return res.redirect('/technician');
  res.redirect('/login');
});

app.get('/login', (req,res)=> res.render('login',{error:null}));
app.post('/login', (req,res)=>{
  const { username, password } = req.body;
  db.get("SELECT id,username,role FROM users WHERE username=? AND password=?", [username,password], (err,row)=>{
    if(err) return res.render('login',{error:'DB error'});
    if(!row) return res.render('login',{error:'Invalid credentials'});
    req.session.user = row;
    res.redirect('/');
  });
});
app.get('/logout', (req,res)=> { req.session.destroy(()=>res.redirect('/login')); });

app.get('/admin', requireRole('admin'), (req,res)=>{
  db.all("SELECT id,username,role FROM users", (err, users)=>{
    db.all(`SELECT d.id, d.name, COUNT(tm.id) as tests_count
            FROM departments d LEFT JOIN tests_master tm ON tm.department_id=d.id
            GROUP BY d.id ORDER BY d.name`, (err2, depts)=>{
      res.render('admin',{user:req.session.user, users, departments:depts});
    });
  });
});

app.get('/reception', requireRole('reception'), (req,res)=>{
  db.all("SELECT * FROM patients ORDER BY created_at DESC LIMIT 200", (err, patients)=>{
    db.all("SELECT * FROM departments ORDER BY name", (err2, depts)=>{
      res.render('reception',{user:req.session.user, patients, departments:depts});
    });
  });
});

app.post('/patients', requireRole('reception'), (req,res)=>{
  const { name, dob, phone } = req.body;
  const patient_code = shortid.generate();
  db.run("INSERT INTO patients (patient_code,name,dob,phone) VALUES (?,?,?,?)",
    [patient_code,name,dob,phone], function(err){
      res.redirect('/reception');
    });
});

app.get('/api/tests/by-dept/:deptId', requireRole('reception'), (req,res)=>{
  const did = req.params.deptId;
  db.all("SELECT id,test_code,test_name,parameter,normal_min,normal_max,unit FROM tests_master WHERE department_id=? ORDER BY test_name",
    [did], (err, rows)=> {
      res.json(rows || []);
    });
});

app.post('/order-tests', requireRole('reception'), (req,res)=>{
  const { patient_id, tests } = req.body;
  let testIds = [];
  if(!tests) return res.redirect('/reception');
  if(Array.isArray(tests)) testIds = tests;
  else testIds = String(tests).split(',');
  const stmt = db.prepare("INSERT INTO tests_orders (order_code,patient_id,master_test_id,status,created_at) VALUES (?,?,?,?,datetime('now'))");
  testIds.forEach(tid => {
    const order_code = shortid.generate();
    stmt.run(order_code, patient_id, tid, 'pending');
  });
  stmt.finalize(()=>res.redirect('/reception'));
});

app.get('/technician', requireRole('technician'), (req,res)=>{
  db.all(`SELECT to_table.id as order_id, to_table.order_code, p.name as patient_name, p.patient_code, tm.test_name, tm.parameter, tm.normal_min, tm.normal_max, tm.unit, to_table.status, to_table.result_value
          FROM tests_orders to_table
          JOIN tests_master tm ON to_table.master_test_id = tm.id
          JOIN patients p ON to_table.patient_id = p.id
          WHERE to_table.status IN ('pending','inprogress')
          ORDER BY to_table.created_at ASC`, (err, rows) => {
    res.render('technician',{user:req.session.user, orders:rows});
  });
});

app.post('/technician/result/:orderId', requireRole('technician'), (req,res)=>{
  const orderId = req.params.orderId;
  const { result_value, status } = req.body;
  db.get(`SELECT tm.normal_min, tm.normal_max FROM tests_orders to_table JOIN tests_master tm ON to_table.master_test_id=tm.id WHERE to_table.id=?`, [orderId], (err,row)=>{
    let flag = 'normal';
    if(row){
      const num = parseFloat(result_value);
      if(!isNaN(num)){
        if(num < row.normal_min) flag = 'low';
        else if(num > row.normal_max) flag = 'high';
      }
    }
    db.run("UPDATE tests_orders SET result_value=?, result_flag=?, status=?, updated_at=datetime('now') WHERE id=?",
      [result_value, flag, status || 'completed', orderId], function(err2){
        res.redirect('/technician');
      });
  });
});

app.get('/patient/view', (req,res)=> res.render('patient_lookup',{error:null}));
app.post('/patient/view', (req,res)=>{
  const { patient_code } = req.body;
  db.get("SELECT * FROM patients WHERE patient_code=?", [patient_code], (err, p)=>{
    if(!p) return res.render('patient_lookup',{error:'Patient not found'});
    db.all(`SELECT to_table.order_code, tm.test_name, tm.parameter, tm.unit, tm.normal_min, tm.normal_max, to_table.status, to_table.result_value, to_table.result_flag, to_table.created_at
            FROM tests_orders to_table JOIN tests_master tm ON to_table.master_test_id=tm.id
            WHERE to_table.patient_id=?
            ORDER BY to_table.created_at DESC`, [p.id], (err2, orders)=>{
      res.render('patient',{patient:p, orders});
    });
  });
});

app.get('/patient/:code', (req,res)=>{
  const code = req.params.code;
  db.get("SELECT * FROM patients WHERE patient_code=?", [code], (err,p)=>{
    if(!p) return res.status(404).send('Not found');
    db.all(`SELECT to_table.order_code, tm.test_name, tm.parameter, tm.unit, tm.normal_min, tm.normal_max, to_table.status, to_table.result_value, to_table.result_flag, to_table.created_at
            FROM tests_orders to_table JOIN tests_master tm ON to_table.master_test_id=tm.id
            WHERE to_table.patient_id=? ORDER BY to_table.created_at DESC`, [p.id], (err2, orders)=>{
      res.render('patient',{patient:p, orders});
    });
  });
});

app.post('/admin/users', requireRole('admin'), (req,res)=>{
  const { username, password, role } = req.body;
  db.run("INSERT INTO users (username,password,role) VALUES (?,?,?)", [username,password,role], function(err){
    res.redirect('/admin');
  });
});

app.listen(PORT, ()=> console.log(`Alpha Med Lab running on http://localhost:${PORT}`));
