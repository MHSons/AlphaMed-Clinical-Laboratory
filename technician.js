// ✅ Load patients for technician
function loadTechPatients() {
  const patients = getAllPatients();
  const tbody = document.getElementById("techPatientList");
  tbody.innerHTML = "";

  patients.forEach((p, idx) => {
    const tr = document.createElement("tr");

    // Tests with input fields
    let testInputs = "";
    if (p.tests && p.tests.length > 0) {
      p.tests.forEach(t => {
        // Normal range from test-data.js
        let range = "";
        for (let dept in testData) {
          const testObj = testData[dept].find(x => x.name === t);
          if (testObj) {
            range = testObj.normalRange;
            break;
          }
        }

        const resultValue = p.results && p.results[t] ? p.results[t] : "";

        testInputs += `
          <div style="margin-bottom:5px;">
            <label><strong>${t}</strong> (Normal: ${range})</label><br/>
            <input type="text" id="res_${p.id}_${t}" value="${resultValue}" placeholder="Enter result">
          </div>
        `;
      });
    } else {
      testInputs = "<em>No tests selected</em>";
    }

    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.department}</td>
      <td>${(p.tests || []).join(", ")}</td>
      <td>
        ${testInputs}
        <button class="btn-save" onclick="saveResults(${p.id})">Save</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (document.getElementById("searchTech")) {
    attachTableSearch("searchTech", "techPatientTable");
  }
}

// ✅ Save technician results
function saveResults(patientId) {
  let patients = getAllPatients();
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return;

  if (!patient.results) patient.results = {};

  (patient.tests || []).forEach(t => {
    const input = document.getElementById(`res_${patientId}_${t}`);
    if (input) {
      patient.results[t] = input.value.trim();
    }
  });

  localStorage.setItem("patients", JSON.stringify(patients));
  alert("Results saved successfully!");
}

// ✅ Auto-load on page open
document.addEventListener("DOMContentLoaded", () => {
  loadTechPatients();
});
