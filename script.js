// Utility function to sanitize inputs (prevent XSS)
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Login function with enhanced validation and backend integration
async function loginUser() {
  const username = sanitizeInput(document.getElementById("username")?.value.trim());
  const password = sanitizeInput(document.getElementById("password")?.value.trim());
  const userType = sanitizeInput(document.getElementById("userType")?.value);

  // Reset error messages
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const userTypeError = document.getElementById("userTypeError");
  if (usernameError) usernameError.style.display = 'none';
  if (passwordError) passwordError.style.display = 'none';
  if (userTypeError) userTypeError.style.display = 'none';

  let valid = true;

  // Validation
  if (!userType) {
    if (userTypeError) userTypeError.style.display = 'block';
    valid = false;
  }
  if (!username || (!username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && username.length < 3)) {
    if (usernameError) usernameError.style.display = 'block';
    valid = false;
  }
  if (!password || password.length < 6) {
    if (passwordError) passwordError.style.display = 'block';
    valid = false;
  }

  if (!valid) {
    alert("Please correct the errors in the form.");
    return;
  }

  try {
    // Backend API call (replace with your endpoint)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userType, username, password })
    });
    const data = await response.json();

    if (response.ok) {
      // Save session (JWT or session ID recommended over LocalStorage)
      localStorage.setItem("loggedInUser", JSON.stringify({
        username,
        role: data.role || userType,
        token: data.token || null
      }));
      alert(`Welcome ${username}! Redirecting...`);

      // Role-based redirects
      switch (userType.toLowerCase()) {
        case 'admin':
          window.location.href = 'admin-dashboard.html';
          break;
        case 'reception':
          window.location.href = 'reception_dashboard.html';
          break;
        case 'technician':
          window.location.href = 'technician_dashboard.html';
          break;
        case 'patient':
          window.location.href = 'view_reports.html';
          break;
        default:
          window.location.href = 'index.html';
      }
    } else {
      alert(data.message || "Invalid username or password.");
    }
  } catch (error) {
    console.error('Login error:', error);
    alert("Error connecting to server. Please try again later.");
  }
}

// Check login status and role
function checkLogin(requiredRole) {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  if (!user) {
    console.log("No user session found. Redirecting to login.");
    window.location.href = "index.html";
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied! You do not have permission to view this page.");
    window.location.href = "index.html";
    return false;
  }

  return true;
}

// Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully.");
  window.location.href = "index.html";
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.nextElementSibling;
  if (input && button) {
    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "password" ? "Show" : "Hide";
  }
}

// Format date (DD-MM-YYYY)
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getFullYear()}`;
}

// Generate unique ID
function generateId(prefix = "ID") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}

// Load departments/tests (placeholder for test-data.js integration)
function loadTestData() {
  // Example data (replace with test-data.js fetch)
  const departments = [
    {
      name: "Hematology",
      tests: [
        { id: generateId("TEST"), name: "CBC", description: "Complete Blood Count", sample: "Blood", prep: "No fasting", turnaround: "24 hours" },
        { id: generateId("TEST"), name: "Hemoglobin A1c", description: "Diabetes monitoring", sample: "Blood", prep: "No fasting", turnaround: "24 hours" }
      ]
    },
    {
      name: "Biochemistry",
      tests: [
        { id: generateId("TEST"), name: "Lipid Profile", description: "Cholesterol levels", sample: "Blood", prep: "12-hour fasting", turnaround: "24 hours" }
      ]
    }
  ];

  // Example: Render departments/tests dynamically (update DOM as needed)
  const container = document.getElementById("testDataContainer");
  if (container) {
    container.innerHTML = departments.map(dept => `
      <div class="card">
        <h3>${dept.name}</h3>
        <ul>
          ${dept.tests.map(test => `<li>${test.name}: ${test.description} (Sample: ${test.sample})</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }
}

// Initialize page (call on load)
document.addEventListener('DOMContentLoaded', () => {
  // Check login status on protected pages
  const protectedPages = ['admin-dashboard.html', 'reception_dashboard.html', 'technician_dashboard.html', 'view_reports.html'];
  const currentPage = window.location.pathname.split('/').pop();
  if (protectedPages.includes(currentPage)) {
    const requiredRole = currentPage.includes('admin') ? 'admin' :
                         currentPage.includes('reception') ? 'reception' :
                         currentPage.includes('technician') ? 'technician' : 'patient';
    checkLogin(requiredRole);
  }

  // Load test data if applicable
  if (document.getElementById("testDataContainer")) {
    loadTestData();
  }
});
