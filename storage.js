/* =========================================================
   storage.js — Local Storage Manager for Medical Lab System
   ---------------------------------------------------------
   - All data stored locally (for demo use only)
   - Replace with server API in production
========================================================= */

// ✅ Initialize default structure if not exists
if (!localStorage.getItem("lab_data")) {
  localStorage.setItem(
    "lab_data",
    JSON.stringify({
      users: [
        { id: 1, name: "Admin", username: "admin", password: "12345", role: "admin" },
        { id: 2, name: "Receptionist", username: "reception", password: "12345", role: "reception" },
        { id: 3, name: "Technician", username: "tech", password: "12345", role: "technician" }
      ],
      patients: [],
      tests: [],
      reports: []
    })
  );
}

/* ---------------------------------------------------------
   Helper Functions
--------------------------------------------------------- */
function getData() {
  return JSON.parse(localStorage.getItem("lab_data"));
}

function setData(data) {
  localStorage.setItem("lab_data", JSON.stringify(data));
}

/* ---------------------------------------------------------
   USER AUTHENTICATION
--------------------------------------------------------- */
function loginUser(username, password) {
  const db = getData();
  const user = db.users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem("lab_current_user", JSON.stringify(user));
    return user;
  } else {
    return null;
  }
}

function getCurrentUser() {
  const user = localStorage.getItem("lab_current_user");
  return user ? JSON.parse(user) : null;
}

function logoutUser() {
  localStorage.removeItem("lab_current_user");
}

/* ---------------------------------------------------------
   PATIENT MANAGEMENT
--------------------------------------------------------- */
function registerPatient(patientData) {
  const db = getData();
  patientData.id = Date.now();
  db.patients.push(patientData);
  setData(db);
  return patientData;
}

function getPatients() {
  const db = getData();
  return db.patients;
}

/* ---------------------------------------------------------
   TEST MANAGEMENT
--------------------------------------------------------- */
function addTestResult(testData) {
  const db = getData();
  testData.id = Date.now();
  db.tests.push(testData);
  setData(db);
  return testData;
}

function getTestResults(patientId) {
  const db = getData();
  return db.tests.filter(t => t.patientId === patientId);
}

/* ---------------------------------------------------------
   REPORT MANAGEMENT
--------------------------------------------------------- */
function addReport(reportData) {
  const db = getData();
  reportData.id = Date.now();
  db.reports.push(reportData);
  setData(db);
  return reportData;
}

function getReports() {
  const db = getData();
  return db.reports;
}

/* ---------------------------------------------------------
   USER MANAGEMENT (Admin)
--------------------------------------------------------- */
function addUser(user) {
  const db = getData();
  user.id = Date.now();
  db.users.push(user);
  setData(db);
  return user;
}

function getUsers() {
  return getData().users;
}

/* ---------------------------------------------------------
   UTILITY
--------------------------------------------------------- */
function clearAllData() {
  localStorage.removeItem("lab_data");
  localStorage.removeItem("lab_current_user");
  alert("All local data cleared.");
}
