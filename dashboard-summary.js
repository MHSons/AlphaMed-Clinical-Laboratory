```javascript
document.addEventListener("DOMContentLoaded", () => {
  updateDashboardSummary();
});

function updateDashboardSummary() {
  const patients = window.getAllPatients();
  const results = window.getAllResults();
  const users = window.getAllUsers();

  const today = new Date().toISOString().split("T")[0];
  const todayPatients = patients.filter(patient => patient.date === today);

  setText("totalPatients", patients.length);
  setText("totalUsers", users.length);
  setText("totalResults", results.length);
  setText("todayPatients", todayPatients.length);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value || "0";
  }
}
```

### Updates to `admin-dashboard.html`
`admin-dashboard.html` (artifact ID: `506422b4-51d0-4e54-abaf-402e778a0110`) ko update kar raha hoon taaki `todayPatients` count display ho aur `dashboard-summary.js` ke saath align rahe.

<xaiArtifact artifact_id="a87cd914-30ac-4dc7-be80-ab48f8bd51a9" artifact_version_id="a1d78628-345e-4f92-acb5-3111f5d81920" title="admin-dashboard.html" contentType="text/html">
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard - Alpha-Med Clinical Lab</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="storage.js"></script>
  <script defer src="script.js"></script>
  <script defer src="dashboard-summary.js"></script>
</head>
<body onload="checkLogin('admin')">
  <header>
    <h1>Admin Dashboard</h1>
    <p>Alpha-Med Clinical Lab - Full Access Panel</p>
  </header>

  <div class="container">
    <div class="summary">
      <h2>System Overview</h2>
      <div class="summary-stats">
        <div class="stat-card">
          <h3>Total Patients</h3>
          <p id="totalPatients">0</p>
        </div>
        <div class="stat-card">
          <h3>Today's Patients</h3>
          <p id="todayPatients">0</p>
        </div>
        <div class="stat-card">
          <h3>Total Users</h3>
          <p id="totalUsers">0</p>
        </div>
        <div class="stat-card">
          <h3>Total Test Results</h3>
          <p id="totalResults">0</p>
        </div>
      </div>
    </div>

    <div class="dashboard">
      <div class="card" onclick="location.href='manage_users.html'">
        <h3>Manage Users</h3>
        <p>Add, edit, or remove users (Receptionist & Technician)</p>
      </div>
      <div class="card" onclick="location.href='register_patient.html'">
        <h3>Register Patient</h3>
        <p>Reception module access</p>
      </div>
      <div class="card" onclick="location.href='add_test_result.html'">
        <h3>Enter Test Results</h3>
        <p>Technician result entry panel</p>
      </div>
      <div class="card" onclick="location.href='view_reports.html'">
        <h3>View Reports</h3>
        <p>All patient reports overview</p>
      </div>
      <div class="card" onclick="checkExportLink()">
        <h3>Export Data</h3>
        <p>Export results to Excel or PDF</p>
      </div>
      <div class="card" onclick="location.href='settings.html'">
        <h3>System Settings</h3>
        <p>Change password, branding, etc.</p>
      </div>
    </div>
  </div>

  <footer>&copy; 2025 Alpha-Med Clinical Lab</footer>

  <script>
    function checkExportLink() {
      alert("Export functionality is under development.");
    }
  </script>
</body>
</html>
```
