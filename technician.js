// technician.js — controls the technician dashboard actions

document.addEventListener("DOMContentLoaded", () => {
  loadTechnicianTests();
});

// Load all tests assigned to this technician
function loadTechnicianTests() {
  const user = getLoggedInUser();
  if (!user || user.role !== "technician") {
    alert("Access denied! Only technicians can view this page.");
    window.location.href = "login.html";
    return;
  }

  const tests = getAllTests();
  const tbody = document.getElementById("techTests");
  tbody.innerHTML = "";

  const assignedTests = tests.filter(t => t.technician === user.username);

  if (assignedTests.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6'>No tests assigned yet.</td></tr>";
    return;
  }

  assignedTests.forEach((test, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${test.patientName}</td>
      <td>${test.testName}</td>
      <td>${test.sampleType}</td>
      <td class="${test.status === "Completed" ? "status-done" : "status-pending"}">${test.status}</td>
      <td>${test.result ? test.result : "-"}</td>
      <td>
        ${
          test.status === "Completed"
            ? `<button class="btn-small btn-outline" disabled>Done</button>`
            : `<button class="btn-small" onclick="openResultModal(${index})">Add Result</button>`
        }
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Open modal to enter result
function openResultModal(index) {
  document.getElementById("selectedIndex").value = index;
  document.getElementById("resultModal").style.display = "flex";
}

// Close result modal
function closeModal() {
  document.getElementById("resultModal").style.display = "none";
}

// Save the result entered by the technician
function saveTestResult() {
  const index = document.getElementById("selectedIndex").value;
  const result = document.getElementById("testResult").value.trim();

  if (!result) {
    alert("Please enter a valid test result!");
    return;
  }

  const tests = getAllTests();
  const user = getLoggedInUser();
  const assignedTests = tests.filter(t => t.technician === user.username);

  if (!assignedTests[index]) {
    alert("Invalid test selection!");
    closeModal();
    return;
  }

  // Find the global test index in all tests
  const globalIndex = tests.findIndex(
    t =>
      t.patientName === assignedTests[index].patientName &&
      t.testName === assignedTests[index].testName
  );

  tests[globalIndex].result = result;
  tests[globalIndex].status = "Completed";

  saveAllTests(tests);
  alert("Test result saved successfully!");
  document.getElementById("testResult").value = "";
  closeModal();
  loadTechnicianTests();
}
