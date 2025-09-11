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

// ✅ Initialize Departments (with Normal Ranges)
function initDepartments() {
  let departments = loadData(DEPARTMENTS_KEY);
  if (departments.length === 0) {
    departments = [
      {
        name: "Biochemistry",
        tests: [
          { name: "LFT", range: "10-40 U/L", parameter: "ALT/SGPT" },
          { name: "RFT", range: "0.6-1.2 mg/dl", parameter: "Creatinine" },
          { name: "Glucose", range: "70-110 mg/dl", parameter: "Fasting Sugar" }
        ]
      },
      {
        name: "Hematology",
        tests: [
          { name: "CBC", range: "4.0-11.0 x10^9/L", parameter: "WBC Count" },
          { name: "Platelet Count", range: "150-450 x10^9/L", parameter: "Platelets" },
          { name: "Hemoglobin", range: "13-17 g/dl", parameter: "Hb" }
        ]
      }
    ];
    saveData(DEPARTMENTS_KEY, departments);
  }
}
initDepartments();

// ✅ Reception Patient Entry
document.getElementById("patientForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const patients = loadData(PATIENTS_KEY);
  const departments = loadData(DEPARTMENTS_KEY);

  const department = document.getElementById("department").value;
  const test = document.getElementById("testName").value;

  const selectedDept = departments.find(d => d.name === department);
  const selectedTest = selectedDept.tests.find(t => t.name === test);

  const patient = {
    id: Date.now(),
    name: document.getElementById("patientName").value,
    age: document.getElementById("patientAge").value,
    gender: document.getElementById("patientGender").value,
    department,
    test,
    range: selectedTest.range,
    parameter: selectedTest.parameter,
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

// ✅ Reception Panel (with Search)
function renderReception(searchQuery = "") {
  const patients = loadData(PATIENTS_KEY);
  const container = document.getElementById("receptionOutput");
  if (!container) return;

  const filtered = patients.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(p.id).includes(searchQuery)
  );

  container.innerHTML = `
    <input type="text" id="searchReception" placeholder="Search by Name or MRN" class="border p-1 rounded mb-2 w-full">
    ${filtered
      .map(
        p => `
      <div class="border p-2 rounded mb-2 bg-white shadow">
        <strong>${p.name}</strong> (${p.age}, ${p.gender}) <br>
        MRN: ${p.id} <br>
        Dept: ${p.department} | Test: ${p.test} <br>
        Normal Range: ${p.range} (${p.parameter}) <br>
        Status: <span class="font-semibold ${p.status === "Pending" ? "text-red-500" : "text-green-600"}">${p.status}</span>
      </div>`
      )
      .join("")}
  `;

  document.getElementById("searchReception").oninput = e => renderReception(e.target.value);
}

// ✅ Technician Panel (with Filter/Search)
function renderTechnician(searchQuery = "", statusFilter = "All") {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const container = document.getElementById("technicianOutput");
  if (!container) return;

  let filtered = patients;
  if (statusFilter !== "All") {
    filtered = filtered.filter(p => p.status === statusFilter);
  }

  filtered = filtered.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(p.id).includes(searchQuery)
  );

  container.innerHTML = `
    <div class="flex gap-2 mb-2">
      <input type="text" id="searchTech" placeholder="Search by Name or MRN" class="border p-1 rounded flex-1">
      <select id="statusFilter" class="border p-1 rounded">
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>
    </div>
    ${filtered
      .map(p => {
        const result = results.find(r => r.patientId === p.id);
        if (p.status === "Pending") {
          return `
          <div class="border p-2 rounded mb-2 bg-white shadow">
            <p><strong>${p.name}</strong> | ${p.department} | ${p.test}</p>
            <p>Parameter: ${p.parameter} | Normal Range: ${p.range}</p>
            <input type="text" id="result-${p.id}" placeholder="Enter Result" class="border p-1 rounded w-full mt-2">
            <button onclick="saveResult(${p.id})" class="mt-2 px-3 py-1 bg-green-600 text-white rounded">Save Result</button>
          </div>`;
        } else {
          return `
          <div class="border p-2 rounded mb-2 bg-white shadow">
            <p><strong>${p.name}</strong> | ${p.department} | ${p.test}</p>
            <p class="text-green-700 font-semibold">Result: ${result?.result || "N/A"}</p>
            <p>Normal Range: ${p.range} (${p.parameter})</p>
            <button onclick="printReport(${p.id})" class="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Print Report</button>
            <button onclick="downloadReport(${p.id})" class="mt-2 px-3 py-1 bg-gray-700 text-white rounded">Download PDF</button>
          </div>`;
        }
      })
      .join("")}
  `;

  document.getElementById("searchTech").oninput = e => renderTechnician(e.target.value, document.getElementById("statusFilter").value);
  document.getElementById("statusFilter").onchange = e => renderTechnician(document.getElementById("searchTech").value, e.target.value);
}

// ✅ Admin Panel (with Search)
function renderAdmin(searchQuery = "") {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const departments = loadData(DEPARTMENTS_KEY);
  const container = document.getElementById("adminOutput");
  if (!container) return;

  const filtered = patients.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(p.id).includes(searchQuery)
  );

  container.innerHTML = `
    <h3 class="text-lg font-bold mb-2">Patients</h3>
    <input type="text" id="searchAdmin" placeholder="Search by Name or MRN" class="border p-1 rounded mb-2 w-full">
    ${filtered
      .map(p => {
        const result = results.find(r => r.patientId === p.id);
        return `
        <div class="border p-2 rounded mb-2 bg-white shadow">
          <strong>${p.name}</strong> (${p.department} - ${p.test}) <br>
          MRN: ${p.id} <br>
          Parameter: ${p.parameter} | Normal Range: ${p.range} <br>
          Status: ${p.status} <br>
          ${result ? `Result: <span class="font-semibold">${result.result}</span> (on ${result.date})` : ""}
        </div>`;
      })
      .join("")}

    <h3 class="text-lg font-bold mt-4 mb-2">Departments & Tests</h3>
    ${departments
      .map(
        d => `
        <div class="border p-2 rounded mb-2 bg-white shadow">
          <strong>${d.name}</strong><br>
          Tests:<br>
          ${d.tests.map(t => `- ${t.name} (${t.parameter}) [${t.range}]`).join("<br>")}
        </div>`
      )
      .join("")}
  `;

  document.getElementById("searchAdmin").oninput = e => renderAdmin(e.target.value);
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

// ✅ Initial Render
renderReception();
renderTechnician();
renderAdmin();
renderDeptDropdown();
