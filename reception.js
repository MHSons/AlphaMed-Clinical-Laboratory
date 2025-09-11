// Load tests by department
function loadTestsByDepartment() {
  const department = document.getElementById("department").value;
  const testsContainer = document.getElementById("tests");
  testsContainer.innerHTML = "";

  if (department && testData[department]) {
    testData[department].forEach(test => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${test.name}"> ${test.name}`;
      testsContainer.appendChild(label);
    });
  }
}

// Register Patient
function registerPatient() {
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const department = document.getElementById("department").value;

  const selectedTests = Array.from(document.querySelectorAll("#tests input[type='checkbox']:checked")).map(cb => cb.value);

  if (!name || !gender || !age || !phone || !department || selectedTests.length === 0) {
    alert("Please fill all fields and select at least one test.");
    return;
  }

  const patientId = "MRN-" + Date.now().toString().slice(-6);
  const date = new Date().toLocaleString();

  const patient = {
    id: patientId,
    name,
    gender,
    age,
    phone,
    address,
    department,
    tests: selectedTests,
    date
  };

  // Store in localStorage
  let patients = JSON.parse(localStorage.getItem("patients") || "[]");
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));

  // Save current patient in session for slip
  sessionStorage.setItem("currentPatient", JSON.stringify(patient));

  alert("Patient registered successfully!");

  // Redirect to slip page
  window.location.href = "registration-slip.html";
}

// Load patient list in table
function loadPatientList() {
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  const tbody = document.getElementById("patientList");
  if (!tbody) return;

  tbody.innerHTML = "";
  patients.reverse().forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.gender}</td>
      <td>${p.age}</td>
      <td>${p.phone}</td>
      <td>${p.department}</td>
      <td>${p.tests.join(", ")}</td>
      <td>${p.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Filter patient list by search input
function filterPatients() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#patientTable tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

// Auto-load patient list if element is present
document.addEventListener("DOMContentLoaded", () => {
  loadPatientList();
});
