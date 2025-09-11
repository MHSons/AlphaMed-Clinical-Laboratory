// ✅ Save new patient into localStorage
function savePatient(patient) {
  try {
    let patients = JSON.parse(localStorage.getItem("patients") || "[]");

    // Duplicate check: same name + same date
    const exists = patients.some(
      p => p.name.toLowerCase() === patient.name.toLowerCase() &&
           (p.date || "").split("T")[0] === (patient.date || "").split("T")[0]
    );

    if (exists) {
      if (!confirm("Patient with same name already exists today. Do you want to add again?")) {
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

// ✅ Get all patients
function getAllPatients() {
  try {
    return JSON.parse(localStorage.getItem("patients") || "[]");
  } catch (err) {
    console.error("Error reading patients:", err);
    return [];
  }
}

// ✅ Clear all patients (use carefully)
function clearAllPatients() {
  if (confirm("Are you sure you want to delete all patients?")) {
    localStorage.removeItem("patients");
    alert("All patients cleared!");
  }
}

// ✅ Table search utility
function attachTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;

  input.addEventListener("keyup", function () {
    const filter = input.value.toLowerCase();
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      const rowText = rows[i].textContent.toLowerCase();
      rows[i].style.display = rowText.includes(filter) ? "" : "none";
    }
  });
}
