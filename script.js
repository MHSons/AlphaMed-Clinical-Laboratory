// ✅ Local Storage Keys
const PATIENTS_KEY = "alphaMed_patients";
const RESULTS_KEY = "alphaMed_results";
const DEPARTMENTS_KEY = "alphaMed_departments";

// ✅ Load data
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// ✅ Save data
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ✅ Navigation
function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ✅ Initialize Departments (if empty)
function initDepartments() {
  let departments = loadData(DEPARTMENTS_KEY);
  if (departments.length === 0) {
    departments = [
      { name: "Biochemistry", tests: ["LFT", "RFT", "Glucose"] },
      { name: "Hematology", tests: ["CBC", "Platelet Count", "Hemoglobin"] }
    ];
    saveData(DEPARTMENTS_KEY, departments);
  }
}
initDepartments();

// ✅ Reception Patient Entry
document.getElementById("patientForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const patients = loadData(PATIENTS_KEY);

  const patient = {
    id: Date.now(),
    name: document.getElementById("patientName").value,
    age: document.getElementById("patientAge").value,
    gender: document.getElementById("patientGender").value,
    department: document.getElementById("department").value,
    test: document.getElementById("testName").value,
    status: "Pending"
  };

  patients.push(patient);
  saveData(PATIENTS_KEY, patients);

  renderReception();
  renderTechnician();
  renderAdmin();

  e.target.reset();
  alert("Patient Added Successfully ✅");
});

// ✅ Render Reception Panel
function renderReception() {
  const patients = loadData(PATIENTS_KEY);
  const container = document.getElementById("receptionOutput");

  if (!container) return;

  container.innerHTML = patients
    .map(
      p => `
      <div class="border p-2 rounded mb-2 bg-white shadow">
        <strong>${p.name}</strong> (${p.age}, ${p.gender}) <br>
        Dept: ${p.department} | Test: ${p.test} <br>
        Status: <span class="font-semibold ${p.status === "Pending" ? "text-red-500" : "text-green-600"}">${p.status}</span>
      </div>`
    )
    .join("");
}

// ✅ Render Technician Panel
function renderTechnician() {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const container = document.getElementById("technicianOutput");

  if (!container) return;

  container.innerHTML = patients
    .map(p => {
      const result = results.find(r => r.patientId === p.id);

      if (p.status === "Pending") {
        return `
        <div class="border p-2 rounded mb-2 bg-white shadow">
          <p><strong>${p.name}</strong> | ${p.department} | ${p.test}</p>
          <input type="text" id="result-${p.id}" placeholder="Enter Result" class="border p-1 rounded w-full mt-2">
          <button onclick="saveResult(${p.id})" class="mt-2 px-3 py-1 bg-green-600 text-white rounded">Save Result</button>
        </div>`;
      } else {
        return `
        <div class="border p-2 rounded mb-2 bg-white shadow">
          <p><strong>${p.name}</strong> | ${p.department} | ${p.test}</p>
          <p class="text-green-700 font-semibold">Result: ${result?.result || "N/A"}</p>
          <button onclick="printReport(${p.id})" class="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Print Report</button>
          <button onclick="downloadReport(${p.id})" class="mt-2 px-3 py-1 bg-gray-700 text-white rounded">Download PDF</button>
        </div>`;
      }
    })
    .join("");
}

// ✅ Save Result
function saveResult(patientId) {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);

  const patient = patients.find(p => p.id === patientId);
  const resultValue = document.getElementById(`result-${patientId}`).value;

  if (!resultValue) {
    alert("Please enter a result!");
    return;
  }

  patient.status = "Completed";
  results.push({ patientId, result: resultValue, date: new Date().toLocaleString() });

  saveData(PATIENTS_KEY, patients);
  saveData(RESULTS_KEY, results);

  renderReception();
  renderTechnician();
  renderAdmin();
  alert("Result saved ✅");
}

// ✅ Render Admin Panel (Enhanced with Dept/Test Management)
function renderAdmin() {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const departments = loadData(DEPARTMENTS_KEY);
  const container = document.getElementById("adminOutput");

  if (!container) return;

  container.innerHTML = `
    <h3 class="text-lg font-bold mb-2">Patients</h3>
    ${patients
      .map(p => {
        const result = results.find(r => r.patientId === p.id);
        return `
        <div class="border p-2 rounded mb-2 bg-white shadow">
          <strong>${p.name}</strong> (${p.department} - ${p.test}) <br>
          Status: ${p.status} <br>
          ${result ? `Result: <span class="font-semibold">${result.result}</span> (on ${result.date})` : ""}
          ${
            result
              ? `
            <div class="mt-2">
              <button onclick="printReport(${p.id})" class="px-3 py-1 bg-blue-600 text-white rounded">Print Report</button>
              <button onclick="downloadReport(${p.id})" class="px-3 py-1 bg-gray-700 text-white rounded">Download PDF</button>
            </div>`
              : ""
          }
        </div>`;
      })
      .join("")}

    <h3 class="text-lg font-bold mt-4 mb-2">Departments & Tests</h3>
    ${departments
      .map(
        d => `
        <div class="border p-2 rounded mb-2 bg-white shadow">
          <strong>${d.name}</strong><br>
          Tests: ${d.tests.join(", ")}
        </div>`
      )
      .join("")}

    <div class="mt-4">
      <input id="newDept" placeholder="New Department" class="border p-1 rounded">
      <button onclick="addDepartment()" class="px-3 py-1 bg-purple-600 text-white rounded">Add Department</button>
    </div>

    <div class="mt-2">
      <select id="deptSelect" class="border p-1 rounded">
        ${departments.map(d => `<option value="${d.name}">${d.name}</option>`).join("")}
      </select>
      <input id="newTest" placeholder="New Test" class="border p-1 rounded">
      <button onclick="addTest()" class="px-3 py-1 bg-indigo-600 text-white rounded">Add Test</button>
    </div>

    <div class="mt-4">
      <button onclick="resetData()" class="px-3 py-1 bg-red-600 text-white rounded">Clear All Data</button>
    </div>
  `;
}

// ✅ Add Department
function addDepartment() {
  const name = document.getElementById("newDept").value.trim();
  if (!name) return alert("Enter department name!");

  const departments = loadData(DEPARTMENTS_KEY);
  departments.push({ name, tests: [] });
  saveData(DEPARTMENTS_KEY, departments);

  renderAdmin();
  renderDeptDropdown();
  alert("Department added ✅");
}

// ✅ Add Test
function addTest() {
  const deptName = document.getElementById("deptSelect").value;
  const test = document.getElementById("newTest").value.trim();
  if (!test) return alert("Enter test name!");

  const departments = loadData(DEPARTMENTS_KEY);
  const dept = departments.find(d => d.name === deptName);
  dept.tests.push(test);

  saveData(DEPARTMENTS_KEY, departments);

  renderAdmin();
  renderDeptDropdown();
  alert("Test added ✅");
}

// ✅ Render Dept/Test dropdowns in Reception
function renderDeptDropdown() {
  const departments = loadData(DEPARTMENTS_KEY);
  const deptSelect = document.getElementById("department");
  const testSelect = document.getElementById("testName");

  if (!deptSelect || !testSelect) return;

  deptSelect.innerHTML = departments.map(d => `<option value="${d.name}">${d.name}</option>`).join("");

  // ✅ Auto-update test list on dept change
  deptSelect.onchange = () => {
    const selected = departments.find(d => d.name === deptSelect.value);
    testSelect.innerHTML = selected.tests.map(t => `<option value="${t}">${t}</option>`).join("");
  };

  // ✅ Initialize first dept tests
  if (departments.length > 0) {
    deptSelect.value = departments[0].name;
    testSelect.innerHTML = departments[0].tests.map(t => `<option value="${t}">${t}</option>`).join("");
  }
}

// ✅ Clear All Data
function resetData() {
  if (confirm("Are you sure you want to delete all data?")) {
    localStorage.clear();
    initDepartments();
    renderReception();
    renderTechnician();
    renderAdmin();
    renderDeptDropdown();
    alert("All data cleared ❌");
  }
}

// ✅ Print Report
function printReport(patientId) {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const patient = patients.find(p => p.id === patientId);
  const result = results.find(r => r.patientId === patientId)?.result || "N/A";

  generateReport(patient, result);
}

// ✅ Download Report
function downloadReport(patientId) {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const patient = patients.find(p => p.id === patientId);
  const result = results.find(r => r.patientId === patientId)?.result || "N/A";

  window.downloadReport(patient, result);
}

// ✅ Initial Render
renderReception();
renderTechnician();
renderAdmin();
renderDeptDropdown();
