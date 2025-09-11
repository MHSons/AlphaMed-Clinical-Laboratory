// Toggle password visibility
function togglePassword(id) {
  const passwordField = document.getElementById(id);
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

// Validate CNIC format
function validateCNIC(cnic) {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(cnic);
}

// Show alert helper
function showAlert(msg) {
  alert(msg);
}

// Attach search helper for tables
function attachTableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('keyup', function () {
    const filter = input.value.toLowerCase();
    const rows = table.getElementsByTagName('tr');
    Array.from(rows).forEach((row, i) => {
      if (i === 0) return; // skip header
      row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
  });
}

// --- Unified auth and helpers added ---
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert('Invalid credentials');
    return false;
  }
  sessionStorage.setItem('currentUser', JSON.stringify({username: user.username, role: user.role}));
  if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
  else if (user.role === 'reception') window.location.href = 'reception_dashboard.html';
  else if (user.role === 'technician') window.location.href = 'technician_dashboard.html';
  else window.location.href = 'index.html';
  return true;
}

// Seed basic users if not present
(function seedDefaultUsers(){
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      {username: 'admin', password: 'admin123', role: 'admin'},
      {username: 'reception', password: 'recept123', role: 'reception'},
      {username: 'tech', password: 'tech123', role: 'technician'}
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    console.log('Default users seeded.');
  }
})();
// --- end auth helpers ---
