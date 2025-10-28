// settings.js - System Settings
class SettingsManager {
  constructor() {
    this.form = document.getElementById('labInfoForm');
    this.darkModeToggle = document.getElementById('darkMode');
    this.backupBtn = document.getElementById('backupBtn');
    this.clearBtn = document.getElementById('clearBtn');

    this.init();
  }

  init() {
    this.checkAccess();
    this.loadSettings();
    this.loadTheme();

    this.form.addEventListener('submit', e => this.saveLabInfo(e));
    this.darkModeToggle.addEventListener('change', () => this.toggleTheme());
    this.backupBtn.addEventListener('click', () => this.backupData());
    this.clearBtn.addEventListener('click', () => this.clearData());

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

  loadSettings() {
    const settings = JSON.parse(localStorage.getItem('labSettings') || '{}');
    document.getElementById('labName').value = settings.labName || 'AlphaMed Clinical Laboratory';
    document.getElementById('labAddress').value = settings.labAddress || '123 Medical Road, Lahore, Pakistan';
    document.getElementById('labPhone').value = settings.labPhone || '0300-1234567';
    document.getElementById('labEmail').value = settings.labEmail || 'info@alphamed.com';
  }

  saveLabInfo(e) {
    e.preventDefault();
    const settings = {
      labName: document.getElementById('labName').value.trim(),
      labAddress: document.getElementById('labAddress').value.trim(),
      labPhone: document.getElementById('labPhone').value.trim(),
      labEmail: document.getElementById('labEmail').value.trim()
    };
    localStorage.setItem('labSettings', JSON.stringify(settings));
    Utils.showMessage('Settings saved!', 'success');
  }

  loadTheme() {
    const dark = localStorage.getItem('darkMode') === 'true';
    this.darkModeToggle.checked = dark;
    if (dark) document.body.classList.add('dark-mode');
  }

  toggleTheme() {
    const enabled = this.darkModeToggle.checked;
    localStorage.setItem('darkMode', enabled);
    document.body.classList.toggle('dark-mode', enabled);
    Utils.showMessage(enabled ? 'Dark mode enabled' : 'Light mode enabled', 'info');
  }

  backupData() {
    const data = {
      patients: localStorage.getItem('patients'),
      bookings: localStorage.getItem('bookings'),
      testResults: localStorage.getItem('testResults'),
      labUsers: localStorage.getItem('labUsers'),
      labSettings: localStorage.getItem('labSettings')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alphamed-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    Utils.showMessage('Backup downloaded!', 'success');
  }

  clearData() {
    if (!confirm('This will delete ALL data. Are you sure?')) return;
    localStorage.clear();
    Utils.showMessage('All data cleared!', 'success');
    setTimeout(() => location.reload(), 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SettingsManager();
});
