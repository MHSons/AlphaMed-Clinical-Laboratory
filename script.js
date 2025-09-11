// ✅ Local Storage Keys
const PATIENTS_KEY = "alphaMed_patients";
const RESULTS_KEY = "alphaMed_results";

// ✅ Load data from localStorage
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// ✅ Save data to localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ✅ Navigation between sections
function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ✅ Patient Entry (Reception Panel)
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

// ✅ Save Result (Technician)
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

// ✅ Render Admin Panel (Enhanced)
function renderAdmin() {
  const patients = loadData(PATIENTS_KEY);
  const results = loadData(RESULTS_KEY);
  const container = document.getElementById("adminOutput");

  if (!container) return;

  container.innerHTML = patients
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
    .join("");
}

// ✅ Clear All Data (Admin)
function resetData() {
  if (confirm("Are you sure you want to delete all data?")) {
    localStorage.removeItem(PATIENTS_KEY);
    localStorage.removeItem(RESULTS_KEY);
    renderReception();
    renderTechnician();
    renderAdmin();
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
