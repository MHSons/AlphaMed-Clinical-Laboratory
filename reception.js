// reception.js — Handles Reception Panel Logic

document.addEventListener("DOMContentLoaded", () => {
  const user = getLoggedInUser();
  if (!user || user.role !== "reception") {
    alert("Access denied! Reception staff only.");
    window.location.href = "login.html";
    return;
  }

  loadPatients();
});

function loadPatients() {
  const patients = getAllPatients();
  const tbody = document.getElementById("patientTable");
  tbody.innerHTML = "";

  if (patients.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">No registered patients found.</td></tr>`;
    return;
  }

  patients.forEach((p, index) => {
    const tr = document.createElement("tr");
    const testStatus = p.testStatus || "Pending";
    const slipLink = `<a href="slip.html?id=${p.id}" target="_blank">View Slip</a>`;

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.testName}</td>
      <td class="status ${testStatus === "Completed" ? "status-complete" : "status-pending"}">${testStatus}</td>
      <td>${slipLink}</td>
      <td>
        <button class="btn btn-small" onclick="printSlip('${p.id}')">🖨️ Print</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function printSlip(patientId) {
  window.open(`slip.html?id=${patientId}`, "_blank");
}
