// ✅ Updated login system (frontend/demo)
function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  // ✅ Hardcoded users (demo)
  const users = {
    "admin": { password: "admin123", role: "admin", redirect: "admin.html" },
    "reception": { password: "recept123", role: "reception", redirect: "reception.html" },
    "technician": { password: "tech123", role: "technician", redirect: "technician.html" }
  };

  const user = users[username.toLowerCase()];

  if (user && user.password === password) {
    // ✅ Save session in LocalStorage
    localStorage.setItem("loggedInUser", JSON.stringify({ username, role: user.role }));
    alert(`Welcome ${username}! Redirecting...`);
    window.location.href = user.redirect;
  } else {
    alert("Invalid username or password.");
  }
}

// ✅ Check login on each page
function checkLogin(requiredRole) {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  // If not logged in, redirect to login page
  if (!user) {
    console.log("No user session found. Redirecting to login.");
    // Optional: For testing, you can comment the redirect line
    // window.location.href = "index.html";
    return;
  }

  // Check if user has required role
  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied! You do not have permission to view this page.");
    window.location.href = "index.html";
  }
}

// ✅ Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully.");
  window.location.href = "index.html";
}

// ✅ Utility functions
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2,"0")}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getFullYear()}`;
}

function generateId(prefix="ID") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}
