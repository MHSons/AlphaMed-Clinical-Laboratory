// admin.js - Admin Dashboard
class AdminDashboard {
  constructor() {
    this.init();
  }

  init() {
    this.checkAccess();
    this.loadStats();
    this.loadActivity();

    document.getElementById('logout').addEventListener('click', e => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }

  checkAccess() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
      window.location.href = 'login.html';
    }
  }

  loadStats() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');

    document.getElementById('totalPatients').textContent = patients.length;
    document.getElementById('totalBookings').textContent = bookings.length;
    document.getElementById('completedTests').textContent = results.length;

    const revenue = bookings.reduce((sum, b) => sum + b.total, 0);
    document.getElementById('totalRevenue').textContent = `PKR ${revenue.toLocaleString()}`;
  }

  loadActivity() {
    const activity = [];
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');

    patients.slice(-5).forEach(p => {
      activity.push({
        type: 'register',
        icon: 'fa-user-plus',
        color: 'text-primary',
        text: `New patient: ${p.fullName}`,
        time: p.registeredAt
      });
    });

    bookings.slice(-5).forEach(b => {
      activity.push({
        type: 'booking',
        icon: 'fa-file-medical',
        color: 'text-success',
        text: `Booking: ${b.patientName} (${b.tests.length} tests)`,
        time: b.bookedAt
      });
    });

    results.slice(-5).forEach(r => {
      activity.push({
        type: 'result',
        icon: 'fa-check-circle',
        color: 'text-info',
        text: `Report ready: ${r.patientName}`,
        time: r.addedAt
      });
    });

    // Sort by time
    activity.sort((a, b) => new Date(b.time) - new Date(a.time));
    const list = document.getElementById('activityList');
    list.innerHTML = '';

    activity.slice(0, 10).forEach(act => {
      const div = document.createElement('div');
      div.className = 'activity-item';
      div.innerHTML = `
        <i class="fas ${act.icon} ${act.color}"></i>
        <div class="activity-text">
          <p>${act.text}</p>
          <small>${Utils.formatDate(act.time)}</small>
        </div>
      `;
      list.appendChild(div);
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new AdminDashboard();
});
