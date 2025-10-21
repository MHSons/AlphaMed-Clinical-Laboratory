/* =========================================================
   script.js — Core Logic for Medical Lab System (Local Demo)
   ---------------------------------------------------------
   - Handles login/logout
   - Role-based redirects
   - Page protection
   - Common utilities
========================================================= */

/* ========== LOGIN HANDLER ========== */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const user = loginUser(username, password);
      if (user) {
        alert(`Welcome, ${user.name}!`);
        redirectByRole(user.role);
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  // auto-fill footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // protect dashboard pages
  protectPages();
});

/* ========== LOGOUT HANDLER ========== */
function logout() {
  logoutUser();
  window.location.href = "login.html";
}

/* ========== ROLE REDIRECTS ========== */
function redirectByRole(role) {
  switch (role) {
    case "admin":
      window.location.href = "admin-dashboard.html";
      break;
    case "reception":
      window.location.href = "reception_dashboard.html";
      break;
    case "technician":
      window.location.href = "technician_dashboard.html";
      break;
    default:
      window.location.href = "index.html";
  }
}

/* ========== PAGE PROTECTION ========== */
function protectPages() {
  const restrictedPages = [
    "admin-dashboard.html",
    "reception_dashboard.html",
    "technician_dashboard.html",
    "add_test_result.html",
    "manage_users.html",
    "report.html",
    "export.html"
  ];

  const currentPage = location.pathname.split("/").pop();
  const user = getCurrentUser();

  if (restrictedPages.includes(currentPage)) {
    if (!user) {
      alert("Please login first!");
      window.location.href = "login.html";
      return;
    }

    // role-based access control
    if (currentPage.startsWith("admin") && user.role !== "admin") {
      alert("Access denied! Admins only.");
      window.location.href = "index.html";
    }

    if (currentPage.startsWith("reception") && user.role !== "reception") {
      alert("Access denied! Reception only.");
      window.location.href = "index.html";
    }

    if (currentPage.startsWith("technician") && user.role !== "technician") {
      alert("Access denied! Technician only.");
      window.location.href = "index.html";
    }
  }
}

/* ========== HELPER UI FUNCTIONS ========== */
function showCurrentUserInfo() {
  const user = getCurrentUser();
  const userEl = document.getElementById("currentUser");

  if (userEl && user) {
    userEl.textContent = `${user.name} (${user.role})`;
  }
}

/* ========== DYNAMIC NAV LOGIC ========== */
function setupNav() {
  const user = getCurrentUser();
  const navLogin = document.querySelector(".btn-login");
  const navLogout = document.querySelector(".btn-logout");

  if (user && navLogin) navLogin.style.display = "none";
  if (user && navLogout) navLogout.style.display = "inline-block";
}

/* ========== LOCAL DEMO UTILS ========== */
function resetDemoData() {
  if (confirm("This will erase all data and reset defaults. Continue?")) {
    clearAllData();
    location.reload();
  }
}
