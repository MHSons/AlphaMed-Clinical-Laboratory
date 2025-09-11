document.addEventListener("DOMContentLoaded", () => {
  updateDashboardSummary();
});

// Main summary update function
function updateDashboardSummary() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const reports = JSON.parse(localStorage.getItem("reports")) || [];

  const today = new Date().toISOString().split("T")[0];
  const todayPatients = patients.filter(patient => patient.date === today);
  const completedReports = reports.filter(report => report.status === "Completed");

  // Update DOM values
  setText("totalPatients", patients.length);
  setText("todayPatients", todayPatients.length);
  setText("totalReports", reports.length);
  setText("completedReports", completedReports.length);
}

// Helper function to safely update element text
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}
