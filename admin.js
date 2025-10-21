```javascript
function loadAllPatients() {
  const patients = window.getAllPatients();
  const tbody = document.getElementById("adminPatientList");
  const errorDiv = document.getElementById("error");
  tbody.innerHTML = "";

  if (!patients.length) {
    errorDiv.textContent = "No patients found";
    return;
  }

  errorDiv.textContent = "";
  patients.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.mrn}</td>
      <td>${p.name}</td>
      <td>${p.cnic}</td>
      <td>${p.phone || "N/A"}</td>
      <td>${p.department}</td>
      <td>${p.tests
        .map(testId => {
          const test = Object.values(window.testData).flat().find(t => t.id === testId);
          return test ? test.name : testId;
        })
        .join(", ")}</td>
      <td>${p.date}</td>
      <td><button onclick="deletePatient(${index})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  if (document.getElementById("searchAdmin")) {
    window.attachTableSearch("searchAdmin", "adminPatientTable");
  }
}

function deletePatient(index) {
  if (!confirm("Are you sure you want to delete this patient?")) return;
  const patients = window.getAllPatients();
  patients.splice(index, 1);
  localStorage.setItem("patients", JSON.stringify(patients));
  alert("Patient deleted successfully!");
  loadAllPatients();
}

document.addEventListener("DOMContentLoaded", () => {
  loadAllPatients();
});
```

