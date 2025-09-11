// ✅ Simple login system (local demo)
function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // ✅ Hardcoded users for demo
  const users = {
    "admin": { password: "admin123", role: "admin", redirect: "admin.html" },
    "reception": { password: "recept123", role: "reception", redirect: "reception.html" },
    "technician": { password: "tech123", role: "technician", redirect: "technician.html" }
  };

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  const user = users[username.toLowerCase()];

  if (user && user.password === password) {
    // Save session
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
  if (!user) {
    alert("You must login first.");
    window.location.href = "index.html"; // redirect to login
    return;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied!");
    window.location.href = "index.html";
  }
}

// ✅ Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully.");
  window.location.href = "index.html";
}

// ✅ Date formatter
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2,"0")}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getFullYear()}`;
}

// ✅ Random ID generator (for patients/tests if needed)
function generateId(prefix="ID") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}
