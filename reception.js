```javascript
function loadTestsByDepartment() {
  const department = document.getElementById("department")?.value;
  const testsContainer = document.getElementById("tests");
  if (!testsContainer) return;

  testsContainer.innerHTML = "";

  if (!window.testData) {
    testsContainer.innerHTML = '<div class="error">Test data not loaded!</div>';
    return;
  }

  if (department && window.testData[department]) {
    window.testData[department].forEach(test => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.innerHTML = `
        <input type="checkbox" value="${test.id}">
        <strong>${test.name}</strong> 
        <span style="color:#555; font-size: 13px">
          (${test.parameter}, Normal: ${test.normalRange})
        </span>`;
      testsContainer.appendChild(label);
    });
  }
}

function registerPatient(event) {
  event.preventDefault();
  const patient = {
    name: document.getElementById("name")?.value.trim(),
    cnic: document.getElementById("cnic")?.value.trim(),
    phone: document.getElementById("phone")?.value.trim(),
    department: document.getElementById("department")?.value,
    tests: Array.from(
      document.querySelectorAll('#tests input[type="checkbox"]:checked')
    ).map(c => c.value),
    date: document.getElementById("date")?.value || new Date().toISOString().split("T")[0],
    mrn: `MRN-${Date.now()}`
  };
  const errorDiv = document.getElementById("error");

  if (!patient.name || !patient.cnic || !patient.department || patient.tests.length === 0) {
    errorDiv.textContent = "Please fill required fields (Name, CNIC, Department, Tests)";
    return;
  }

  if (!/^\d{5}-\d{7}-\d{1}$/.test(patient.cnic)) {
    errorDiv.textContent = "Invalid CNIC format (e.g., 12345-1234567-1)";
    return;
  }

  if (patient.phone && !/^\d{4}-\d{7}$/.test(patient.phone)) {
    errorDiv.textContent = "Invalid phone format (e.g., 0300-1234567)";
    return;
  }

  const saved = window.savePatient(patient);
  if (!saved) {
    errorDiv.textContent = "⚠️ This CNIC is already registered";
    return;
  }

  localStorage.setItem("latestPatient", JSON.stringify(patient));
  alert("Patient registered successfully!");
  window.location.href = "registration-slip.html";
}

function loadPatientList() {
  const patients = window.getAllPatients();
  const tbody = document.getElementById("patientList");
  if (!tbody) return;

  tbody.innerHTML = "";

  patients.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.cnic}</td>
      <td>${p.phone || ""}</td>
      <td>${p.department}</td>
      <td>${p.tests
        .map(testId => {
          const test = Object.values(window.testData).flat().find(t => t.id === testId);
          return test ? test.name : testId;
        })
        .join(", ")}</td>
      <td>${p.date}</td>
    `;
    tbody.appendChild(tr);
  });

  if (document.getElementById("searchPatient")) {
    window.attachTableSearch("searchPatient", "patientListTable");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const departmentSelect = document.getElementById("department");
  if (departmentSelect) {
    departmentSelect.addEventListener("change", loadTestsByDepartment);
    loadTestsByDepartment();
  }

  const patientForm = document.getElementById("patientForm");
  if (patientForm) {
    patientForm.addEventListener("submit", registerPatient);
  }

  loadPatientList();
});
```

