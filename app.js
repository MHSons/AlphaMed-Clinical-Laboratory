/** app.js
  Usage:
  - Place next to your index.html (which loads React, ReactDOM, Babel, qrcode and jsbarcode via CDN)
  - Open index.html in browser (or push to GitHub Pages)
*/

const { useState, useEffect, useRef } = React;

/* ----------------------
  Simple IndexedDB wrapper
-------------------------*/
const DB_NAME = "labdb_v1";
const DB_VERSION = 1;
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("meta")) db.createObjectStore("meta", { keyPath: "key" });
      if (!db.objectStoreNames.contains("users")) db.createObjectStore("users", { keyPath: "username" });
      if (!db.objectStoreNames.contains("departments")) db.createObjectStore("departments", { keyPath: "code" });
      if (!db.objectStoreNames.contains("patients")) db.createObjectStore("patients", { keyPath: "mrn" });
      if (!db.objectStoreNames.contains("reports")) db.createObjectStore("reports", { keyPath: "id" });
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function idbPut(store, value) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readwrite");
    const s = tx.objectStore(store);
    const r = s.put(value);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbGet(store, key) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readonly");
    const s = tx.objectStore(store);
    const r = s.get(key);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbGetAll(store) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readonly");
    const s = tx.objectStore(store);
    const r = s.getAll();
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbDelete(store, key) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readwrite");
    const s = tx.objectStore(store);
    const r = s.delete(key);
    r.onsuccess = () => res();
    r.onerror = () => rej(r.error);
  });
}

/* ----------------------
  Seed initial data
-------------------------*/
async function seedIfNeeded() {
  const seeded = await idbGet("meta", "seeded_v1").catch(()=>null);
  if (seeded && seeded.value === true) return;

  // create default users (passwords cleartext for local-only demo)
  const users = [
    { username: "admin", password: "admin123", role: "admin", displayName: "Administrator" },
    { username: "reception", password: "recep123", role: "reception", displayName: "Reception" },
    { username: "tech", password: "tech123", role: "tech", displayName: "Technician" },
    { username: "patho", password: "patho123", role: "pathologist", displayName: "Pathologist" }
  ];
  for (const u of users) await idbPut("users", u);

  // 20 departments each with 20 tests and 3 parameters
  for (let d=1; d<=20; d++) {
    const deptCode = `DEPT${String(d).padStart(2,"0")}`;
    const deptName = `Department ${d}`;
    const tests = [];
    for (let t=1; t<=20; t++) {
      const testCode = `T${String(d).padStart(2,"0")}${String(t).padStart(2,"0")}`;
      const testName = `Test ${d}-${t}`;
      const params = [
        { name: "Param A", unit: "U/L", normal: "10-50" },
        { name: "Param B", unit: "mg/dL", normal: "0.1-1.2" },
        { name: "Param C", unit: "mmol/L", normal: "3.5-5.0" }
      ];
      tests.push({ code: testCode, name: testName, params });
    }
    await idbPut("departments", { code: deptCode, name: deptName, tests });
  }

  await idbPut("meta", { key: "seeded_v1", value: true });
}

/* ----------------------
  Utilities
-------------------------*/
function generateMRN() {
  const d = new Date();
  const ts = d.getFullYear().toString().slice(-2) + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0");
  const rnd = Math.floor(1000 + Math.random()*9000);
  return `MRN-${ts}-${rnd}`;
}
function generateReportId() {
  return `REP-${Date.now().toString().slice(-8)}`;
}

/* ----------------------
  Main App
-------------------------*/
function App(){
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard"); // dashboard, patients, new_patient, create_report, reports, dept
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      await seedIfNeeded();
      const depts = await idbGetAll("departments");
      const pats = await idbGetAll("patients");
      const reps = await idbGetAll("reports");
      setDepartments(depts || []);
      setPatients(pats || []);
      setReports((reps || []).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    })();
  }, []);

  useEffect(()=>{
    if (selectedReport) {
      // show QR for selectedReport
      (async()=>{
        try {
          const payload = {
            reportId: selectedReport.id,
            mrn: selectedReport.mrn,
            patient: selectedReport.patient,
            tests: selectedReport.tests.map(t=> ({ code: t.code, name: t.name, results: t.results }) )
          };
          const q = await QRCode.toDataURL(JSON.stringify(payload));
          setQrDataUrl(q);
        } catch(e){
          setQrDataUrl("");
        }
      })();
    } else setQrDataUrl("");
  }, [selectedReport]);

  async function refreshAll(){
    const depts = await idbGetAll("departments");
    const pats = await idbGetAll("patients");
    const reps = await idbGetAll("reports");
    setDepartments(depts || []);
    setPatients(pats || []);
    setReports((reps || []).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)));
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  if (!user) {
    return <Auth onLogin={async (u)=>{
      // set user object from DB
      const dbu = await idbGet("users", u.username);
      setUser(dbu);
      setView("dashboard");
      await refreshAll();
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <Header user={user} onLogout={()=>{ setUser(null); setView("dashboard"); }} qr={qrDataUrl} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="flex gap-2 mb-3 flex-wrap">
              <button className={`px-3 py-2 rounded ${view==='dashboard' ? 'bg-primary text-white' : 'bg-white'}`} onClick={()=>setView("dashboard")}>Dashboard</button>
              <button className={`px-3 py-2 rounded ${view==='patients' ? 'bg-primary text-white' : 'bg-white'}`} onClick={()=>setView("patients")}>Patients</button>
              <button className={`px-3 py-2 rounded ${view==='new_patient' ? 'bg-primary text-white' : 'bg-white'}`} onClick={()=>setView("new_patient")}>Register Patient</button>
              <button className={`px-3 py-2 rounded ${view==='create_report' ? 'bg-primary text-white' : 'bg-white'}`} onClick={()=>setView("create_report")}>Create Report</button>
              <button className={`px-3 py-2 rounded ${view==='reports' ? 'bg-primary text-white' : 'bg-white'}`} onClick={()=>setView("reports")}>Reports</button>
              <button className={`px-3 py-2 rounded ${view==='dept' ? 'bg-primary text-white' : 'bg-white'}`} onClick={()=>setView("dept")}>Departments</button>
            </div>

            <div className="bg-white p-4 rounded shadow">
              {view === "dashboard" && <Dashboard reports={reports} patients={patients} onOpenReport={(r)=>{ setSelectedReport(r); setView("reports"); }} />}
              {view === "patients" && <PatientsList patients={patients} onEdit={async (p)=>{ await idbPut("patients", p); await refreshAll(); }} onOpen={(p)=>{ setSelectedReport(null); setView("create_report"); /* preselect patient via window state if desired */ }} />}
              {view === "new_patient" && <NewPatient onSaved={async (p)=>{ await idbPut("patients", p); await refreshAll(); setView("patients"); }} />}
              {view === "create_report" && <CreateReport departments={departments} patients={patients} onSaved={async ()=>{ await refreshAll(); }} user={user} />}
              {view === "reports" && <ReportsList reports={reports} onOpen={async (r)=>{ setSelectedReport(r); }} onDelete={async (id)=>{ if (user.role !== 'admin'){ alert('Only admin can delete reports'); return; } await idbDelete("reports", id); await refreshAll(); setSelectedReport(null); }} />}
              {view === "dept" && <DeptView departments={departments} />}
            </div>
          </div>

          <aside className="bg-white p-4 rounded shadow">
            <div className="mb-3">
              <h4 className="font-semibold">Quick Search</h4>
              <input className="border p-2 w-full rounded" placeholder="Search patient / MRN / report" value={searchQ} onChange={(e)=>setSearchQ(e.target.value)} />
            </div>

            <div className="mb-3">
              <h4 className="font-semibold">Latest Reports</h4>
              <div className="space-y-2 max-h-64 overflow-auto">
                {reports.slice(0,10).map(r=>(
                  <div key={r.id} className="p-2 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{r.patient.fullName}</div>
                      <div className="text-xs text-gray-500">MRN: {r.mrn}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <button className="text-sm px-2 py-1 border rounded" onClick={()=>{ setSelectedReport(r); /* show qr */ }}>Open</button>
                      <div className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Your Role</h4>
              <div className="text-sm">{user.displayName} • <span className="capitalize">{user.role}</span></div>
            </div>
          </aside>
        </div>

        <div className="mt-4">
          {selectedReport ? <ReportPreview report={selectedReport} qrDataUrl={qrDataUrl} /> : <div className="text-sm text-gray-500">Select a report to preview</div>}
        </div>

      </div>
    </div>
  );
}

/* ----------------------
  Header Component
-------------------------*/
function Header({ user, onLogout, qr }) {
  return (
    <header className="flex items-center justify-between bg-white p-3 rounded mb-4 shadow">
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="w-16 h-16 object-contain" alt="logo" />
        <div>
          <div className="text-xl font-bold text-primary">AlphaMed Clinical Laboratory</div>
          <div className="text-xs text-gray-500">Quality Assurance Through Advanced Technology</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {qr ? <img src={qr} className="w-20 h-20 border p-1 bg-white" alt="qr" /> : <div className="text-xs text-gray-400">No QR</div>}
        <div className="text-sm text-gray-700 mr-4">Signed in as <strong>{user.displayName}</strong></div>
        <button className="px-3 py-2 border rounded" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

/* ----------------------
  Auth Component (Login)
-------------------------*/
function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // login or register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("reception");

  async function handleLogin(e) {
    e.preventDefault();
    const u = await idbGet("users", username);
    if (!u || u.password !== password) return alert("Invalid credentials");
    onLogin(u);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!username || !password || !displayName) return alert("Fill all fields");
    const exists = await idbGet("users", username);
    if (exists) return alert("Username taken");
    const newUser = { username, password, role, displayName };
    await idbPut("users", newUser);
    alert("User created. You can login now.");
    setMode("login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">AlphaMed Lab — {mode === "login" ? "Login" : "Register"}</h3>
        {mode === "login" ? (
          <form onSubmit={handleLogin}>
            <input className="border p-2 w-full mb-2 rounded" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input className="border p-2 w-full mb-2 rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button className="w-full bg-primary text-white p-2 rounded mb-2">Login</button>
            <div className="text-sm text-center">
              <a href="#" onClick={(e)=>{e.preventDefault(); setMode("register");}}>Create new user</a>
            </div>
            <div className="text-xs text-gray-500 mt-3">Demo users: admin/admin123, reception/recep123, tech/tech123, patho/patho123</div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input className="border p-2 w-full mb-2 rounded" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input className="border p-2 w-full mb-2 rounded" placeholder="Display Name" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
            <input className="border p-2 w-full mb-2 rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <select className="border p-2 w-full mb-2 rounded" value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="reception">Reception</option>
              <option value="tech">Technician</option>
              <option value="pathologist">Pathologist</option>
              <option value="admin">Admin</option>
            </select>
            <button className="w-full bg-primary text-white p-2 rounded mb-2">Register</button>
            <div className="text-sm text-center">
              <a href="#" onClick={(e)=>{e.preventDefault(); setMode("login");}}>Back to login</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ----------------------
  Dashboard
-------------------------*/
function Dashboard({ reports, patients, onOpenReport }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Patients</div>
          <div className="text-2xl font-bold">{patients.length}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Reports</div>
          <div className="text-2xl font-bold">{reports.length}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Recent Report</div>
          <div className="text-sm">{reports[0] ? `${reports[0].patient.fullName} • ${new Date(reports[0].createdAt).toLocaleString()}` : 'No reports yet'}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Recent Reports</h4>
        <div className="space-y-2">
          {reports.slice(0,10).map(r=>(
            <div key={r.id} className="p-2 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{r.patient.fullName}</div>
                <div className="text-xs text-gray-500">MRN: {r.mrn}</div>
              </div>
              <div>
                <button className="px-2 py-1 border rounded" onClick={()=>onOpenReport(r)}>Open</button>
              </div>
            </div>
          ))}
          {reports.length===0 && <div className="text-sm text-gray-500">No reports yet</div>}
        </div>
      </div>
    </div>
  );
}

/* ----------------------
  Patients List & NewPatient
-------------------------*/
function PatientsList({ patients, onEdit, onOpen }) {
  const [q, setQ] = useState("");
  const list = patients.filter(p => (p.fullName || "").toLowerCase().includes(q.toLowerCase()) || (p.mrn||"").toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <input placeholder="Search patient / MRN" className="flex-1 border p-2 rounded" value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
      <div className="space-y-2 max-h-96 overflow-auto">
        {list.map(p=>(
          <div key={p.mrn} className="p-2 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.fullName}</div>
              <div className="text-xs text-gray-500">{p.mrn} • {p.phone || '-'}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 border rounded" onClick={()=>onOpen(p)}>Create Report</button>
              <button className="px-2 py-1 border rounded" onClick={()=>{ const np = {...p, fullName: p.fullName + ' (edited)'}; onEdit(np); }}>Edit</button>
            </div>
          </div>
        ))}
        {list.length===0 && <div className="text-sm text-gray-500">No patients</div>}
      </div>
    </div>
  );
}

function NewPatient({ onSaved }) {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  async function save() {
    if (!fullName) return alert("Enter full name");
    const mrn = generateMRN();
    const p = { mrn, fullName, dob, gender, phone, address, createdAt: new Date().toISOString() };
    await idbPut("patients", p);
    alert("Patient registered: " + mrn);
    if (onSaved) onSaved(p);
    // clear
    setFullName(""); setDob(""); setGender(""); setPhone(""); setAddress("");
  }

  return (
    <div>
      <h4 className="font-semibold mb-2">Register New Patient</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input className="border p-2 rounded" placeholder="Full name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={dob} onChange={(e)=>setDob(e.target.value)} />
        <select className="border p-2 rounded" value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
        </select>
        <input className="border p-2 rounded" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <input className="border p-2 rounded md:col-span-2" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
      </div>
      <div className="mt-3">
        <button className="px-4 py-2 bg-secondary text-white rounded" onClick={save}>Save Patient</button>
      </div>
    </div>
  );
}

/* ----------------------
  Create Report
-------------------------*/
function CreateReport({ departments, patients, onSaved, user }) {
  const [patientMrn, setPatientMrn] = useState("");
  const [sampleId, setSampleId] = useState("");
  const [collectedOn, setCollectedOn] = useState(new Date().toISOString().slice(0,10));
  const [selectedDeptCode, setSelectedDeptCode] = useState(departments[0]?.code || "");
  const [selectedTests, setSelectedTests] = useState([]); // array of {code, name, results: [{name, unit, normal, value}]}

  useEffect(()=> {
    setSelectedDeptCode(departments[0]?.code || "");
  }, [departments]);

  function addTest(test){
    if (selectedTests.find(t=>t.code===test.code)) return;
    const r = test.params.map(p=> ({ name: p.name, unit: p.unit, normal: p.normal, value: "" }));
    setSelectedTests(s => [...s, { code: test.code, name: test.name, results: r }]);
  }
  function removeTest(code){
    setSelectedTests(s => s.filter(t=>t.code!==code));
  }
  function updateResult(testCode, idx, val){
    setSelectedTests(s => s.map(t => t.code===testCode ? { ...t, results: t.results.map((r,i)=> i===idx ? { ...r, value: val } : r) } : t));
  }

  async function saveReport(){
    if (!patientMrn) return alert("Select patient MRN");
    const patient = await idbGet("patients", patientMrn);
    if (!patient) return alert("Patient not found");
    if (selectedTests.length===0) return alert("Add at least one test");
    const id = generateReportId();
    const mrn = patientMrn;
    const reportObj = {
      id,
      reportId: id,
      mrn,
      patient,
      sampleId: sampleId || `SMP-${Date.now().toString().slice(-6)}`,
      collectedOn,
      createdAt: new Date().toISOString(),
      createdBy: user.username,
      tests: selectedTests,
      status: "entered", // technician should normally enter; for simplicity we mark entered
    };
    await idbPut("reports", reportObj);
    alert("Report saved: " + id);
    setSelectedTests([]);
    setSampleId("");
    if (onSaved) onSaved();
  }

  return (
    <div>
      <h4 className="font-semibold mb-2">Create Report</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        <select className="border p-2 rounded" value={patientMrn} onChange={(e)=>setPatientMrn(e.target.value)}>
          <option value="">Select patient (MRN)</option>
          {patients.map(p=> <option key={p.mrn} value={p.mrn}>{p.fullName} — {p.mrn}</option>)}
        </select>
        <input className="border p-2 rounded" placeholder="Sample ID (optional)" value={sampleId} onChange={(e)=>setSampleId(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={collectedOn} onChange={(e)=>setCollectedOn(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="font-semibold mb-2">Department Tests</div>
          <select className="border p-2 rounded w-full mb-2" value={selectedDeptCode} onChange={(e)=>setSelectedDeptCode(e.target.value)}>
            {departments.map(d=> <option key={d.code} value={d.code}>{d.name}</option>)}
          </select>
          <div className="max-h-64 overflow-auto border rounded p-2">
            {(departments.find(d=>d.code===selectedDeptCode)?.tests || []).map(t=>(
              <div key={t.code} className="flex justify-between items-center p-2 border-b">
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.code}</div>
                </div>
                <button className="px-2 py-1 bg-primary text-white rounded" onClick={()=>addTest(t)}>Add</button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="font-semibold mb-2">Tests in Sample</div>
          {selectedTests.length===0 && <div className="text-sm text-gray-500">No tests added</div>}
          <div className="space-y-2 max-h-96 overflow-auto">
            {selectedTests.map(t=>(
              <div key={t.code} className="p-2 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.code}</div>
                  </div>
                  <button className="px-2 py-1 border rounded" onClick={()=>removeTest(t.code)}>Remove</button>
                </div>
                <div className="space-y-1">
                  {t.results.map((r,idx)=>(
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="w-40 text-xs">{r.name} <div className="text-xxs text-gray-400">{r.unit} | {r.normal}</div></div>
                      <input className="flex-1 border p-1 rounded" value={r.value} onChange={(e)=>updateResult(t.code, idx, e.target.value)} placeholder="Enter result" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 bg-secondary text-white rounded" onClick={saveReport}>Save Report</button>
            <button className="px-4 py-2 border rounded" onClick={()=>{ setSelectedTests([]); }}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------
  Reports List & Preview
-------------------------*/
function ReportsList({ reports, onOpen, onDelete }) {
  const [q, setQ] = useState("");
  const list = reports.filter(r => (r.patient.fullName||"").toLowerCase().includes(q.toLowerCase()) || (r.mrn||"").toLowerCase().includes(q.toLowerCase()) || (r.sampleId||"").toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <input className="flex-1 border p-2 rounded" placeholder="Search report / patient / MRN" value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
      <div className="space-y-2 max-h-96 overflow-auto">
        {list.map(r=>(
          <div key={r.id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{r.patient.fullName}</div>
              <div className="text-xs text-gray-500">MRN: {r.mrn} • {r.sampleId}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 border rounded" onClick={()=>onOpen(r)}>Open</button>
              <button className="px-2 py-1 border rounded" onClick={()=>{ navigator.clipboard?.writeText(r.mrn); alert('MRN copied'); }}>Copy MRN</button>
              <button className="px-2 py-1 border rounded" onClick={()=>{ if(confirm('Delete report?')) onDelete(r.id); }}>Delete</button>
            </div>
          </div>
        ))}
        {list.length===0 && <div className="text-sm text-gray-500">No reports</div>}
      </div>
    </div>
  );
}

/* ----------------------
  Report Preview
-------------------------*/
function ReportPreview({ report, qrDataUrl }) {
  const barcodeRef = useRef(null);

  useEffect(()=>{
    if (barcodeRef.current && report) {
      try {
        JsBarcode(barcodeRef.current, report.mrn, { format: "CODE128", displayValue: true, height: 40 });
      } catch(e){}
    }
  }, [report]);

  if (!report) return null;

  return (
    <div className="bg-white p-4 rounded shadow mt-4 relative">
      {/* watermark */}
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
        <img src="/logo.png" style={{width:300,opacity:0.04}} alt="watermark"/>
      </div>

      <div style={{position:'relative'}} className="p-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-16 h-16 object-contain" alt="logo"/>
            <div>
              <div className="font-bold text-lg">AlphaMed Clinical Laboratory</div>
              <div className="text-xs text-gray-500">Quality Assurance Through Advanced Technology</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm">MRN: <strong>{report.mrn}</strong></div>
            <div className="text-sm">Sample: <strong>{report.sampleId}</strong></div>
            <div className="text-sm">Date: <strong>{new Date(report.createdAt).toLocaleString()}</strong></div>
            <div className="mt-2">{qrDataUrl ? <img src={qrDataUrl} className="w-24 h-24" alt="qr" /> : null}</div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="text-sm">
          <div><strong>Patient:</strong> {report.patient.fullName} • {report.patient.gender} • DOB: {report.patient.dob || '-'}</div>
          <div className="mt-2">
            {report.tests.map(t=>(
              <div key={t.code} className="mt-3">
                <div className="font-semibold">{t.name} <span className="text-xs text-gray-500">({t.code})</span></div>
                <table className="w-full text-sm mt-1 table-fixed">
                  <thead><tr className="text-left"><th>Parameter</th><th>Result</th><th>Unit</th><th>Normal</th></tr></thead>
                  <tbody>
                    {t.results.map((r,i)=>(
                      <tr key={i}><td>{r.name}</td><td>{r.value || '-'}</td><td>{r.unit}</td><td>{r.normal}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs">Generated by AlphaMed Lab</div>
          <div>
            <svg ref={barcodeRef}></svg>
          </div>
        </div>

        <div className="mt-3">
          <button className="px-3 py-2 border rounded no-print" onClick={()=>window.print()}>Print</button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------
  Departments view
-------------------------*/
function DeptView({ departments }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Departments & Tests</h4>
      <div className="space-y-2">
        {departments.map(d=>(
          <div key={d.code} className="p-2 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-xs text-gray-500">{d.code} • {d.tests.length} tests</div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
              {d.tests.slice(0,9).map(t=>(
                <div key={t.code} className="p-2 border rounded text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.code}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------
  Render App
-------------------------*/
ReactDOM.render(<App />, document.getElementById("root"));
