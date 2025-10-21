```javascript
function savePatient(patient) {
  try {
    let patients = JSON.parse(localStorage.getItem("patients") || "[]");
    if (patients.some(p => p.cnic === patient.cnic)) {
      if (!confirm("Patient with this CNIC is already registered. Do you want to add again?")) {
        return false;
      }
    }
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));
    return true;
  } catch (err) {
    console.error("Error saving patient:", err);
    return false;
  }
}

function getAllPatients() {
  try {
    return JSON.parse(localStorage.getItem("patients") || "[]");
  } catch (err) {
    console.error("Error reading patients:", err);
    return [];
  }
}

function saveTestResult(result) {
  try {
    let results = JSON.parse(localStorage.getItem("results") || "[]");
    results.push(result);
    localStorage.setItem("results", JSON.stringify(results));
    return true;
  } catch (err) {
    console.error("Error saving test result:", err);
    return false;
  }
}

function getAllResults() {
  try {
    return JSON.parse(localStorage.getItem("results") || "[]");
  } catch (err) {
    console.error("Error reading results:", err);
    return [];
  }
}

function clearAllPatients() {
  if (confirm("Are you sure you want to delete all patients?")) {
    localStorage.removeItem("patients");
    localStorage.removeItem("results");
    alert("All patients and results cleared!");
  }
}

function validateUser(username, password) {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.some(user => user.username === username && user.password === password);
  } catch (err) {
    console.error("Error validating user:", err);
    return false;
  }
}

function attachTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener("keyup", function () {
    const filter = input.value.toLowerCase();
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].getElementsByTagName("th").length > 0) continue;
      const rowText = rows[i].textContent.toLowerCase();
      rows[i].style.display = rowText.includes(filter) ? "" : "none";
    }
  });
}
```
