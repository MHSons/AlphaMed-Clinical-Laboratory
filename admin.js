// ✅ Load all patients in admin panel
function loadAllPatients() {
  const patients = getAllPatients();
  const tbody = document.getElementById("adminPatientList");
  tbody.innerHTML = "";

  patients.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.gender}</td>
      <td>${p.age || ""}</td>
      <td>${p.phone || ""}</td>
      <td>${p.department}</td>
      <td>${(p.tests || []).join(", ")}</td>
      <td>${(p.date || "").split("T")[0]}</td>
    `;
    tbody.appendChild(tr);
  });

  if (document.getElementById("searchAdmin")) {
    attachTableSearch("searchAdmin", "adminPatientTable");
  }
}

// ✅ Auto-load when page opens
document.addEventListener("DOMContentLoaded", () => {
  loadAllPatients();
});
