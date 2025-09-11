// ✅ Load tests when department changes
function loadTestsByDepartment() {
  if (!window.testData) {
    console.warn("testData not loaded");
    document.getElementById("tests").innerHTML = "<em>Tests not available (data missing).</em>";
    return;
  }

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

// ✅ Register patient
function registerPatient() {
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const department = document.getElementById("department").value;

  const testsChecked = Array.from(document.querySelectorAll('#tests input[type="checkbox"]:checked')).map(c => c.value);

  if (!name || !department) {
    alert("Please fill required fields (Name and Department).");
    return;
  }

  const patient = {
    id: Date.now(),
    name, gender, age, phone, address, department,
    tests: testsChecked,
    date: new Date().toISOString()
  };

  // ✅ Save to localStorage
  if (typeof savePatient === "function") {
    const ok = savePatient(patient);
    if (!ok) return;
  } else {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));
  }

  alert("Patient registered successfully!");
  loadPatientList();
}

// ✅ Load patient list
function loadPatientList() {
  const patients = (typeof getAllPatients === "function") ? getAllPatients() : JSON.parse(localStorage.getItem("patients") || "[]");

  const tbody = document.getElementById("patientList");
  tbody.innerHTML = "";
  patients.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.name}</td><td>${p.gender}</td><td>${p.age||''}</td><td>${p.phone||''}</td><td>${p.department}</td><td>${(p.tests||[]).join(", ")}</td><td>${(p.date||'').split("T")[0]}</td>`;
    tbody.appendChild(tr);
  });

  if (document.getElementById("searchPatient")) {
    attachTableSearch("searchPatient", "patientListTable");
  }
}

// ✅ Init on page load
document.addEventListener("DOMContentLoaded", () => {
  loadPatientList();
});
