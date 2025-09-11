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

// Show alert
function showAlert(message, type = "info") {
  const color = {
    success: "#28a745",
    error: "#dc3545",
    info: "#007bff"
  }[type];

  const alert = document.createElement("div");
  alert.style.background = color;
  alert.style.color = "#fff";
  alert.style.padding = "10px";
  alert.style.margin = "15px auto";
  alert.style.width = "90%";
  alert.style.borderRadius = "6px";
  alert.style.textAlign = "center";
  alert.innerText = message;

  document.body.prepend(alert);

  setTimeout(() => alert.remove(), 3000);
}

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Load user from storage
function loadUserInfo() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const userInfoDiv = document.getElementById("userInfo");
  if (userInfoDiv) {
    userInfoDiv.innerHTML = `
      <strong>${user.role}</strong> - ${user.name}<br>
      <small>${user.cnic}</small>
    `;
  }
}

// Confirm before delete
function confirmDelete(callback) {
  if (confirm("Are you sure you want to delete this record?")) {
    callback();
  }
}

// Generate unique ID (for MRN or test entry)
function generateID(prefix = "ID") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Search filter for any table
function setupSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;

  input.addEventListener("keyup", function () {
    const filter = input.value.toLowerCase();
    const rows = table.getElementsByTagName("tr");

    Array.from(rows).forEach((row, i) => {
      if (i === 0) return; // skip table header
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });
}
