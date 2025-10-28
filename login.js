// login.js - Secure Login with Role-Based Access
class LoginManager {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.message = document.getElementById('message');
    this.btn = this.form.querySelector('.btn');
    this.btnText = this.btn.querySelector('.btn-text');
    this.loader = this.btn.querySelector('.loader');
    this.toggleBtn = document.querySelector('.toggle-pass');
    this.passwordInput = document.getElementById('password');

    // Demo Users (In real app: use backend + hash)
    this.users = [
      { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' },
      { username: 'reception', password: 'rec123', role: 'reception', name: 'Receptionist' },
      { username: 'tech', password: 'tech123', role: 'technician', name: 'Lab Technician' }
    ];

    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.toggleBtn.addEventListener('click', this.togglePassword.bind(this));

    // Auto-fill if remembered
    const saved = localStorage.getItem('rememberedUser');
    if (saved) {
      document.getElementById('username').value = saved;
      document.getElementById('remember').checked = true;
    }
  }

  togglePassword() {
    const type = this.passwordInput.type === 'password' ? 'text' : 'password';
    this.passwordInput.type = type;
    this.toggleBtn.querySelector('i').classList.toggle('fa-eye-slash');
  }

  validate() {
    let valid = true;
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    // Username
    if (!username.value.trim()) {
      this.showError('username', 'Username is required');
      valid = false;
    } else if (username.value.length < 3) {
      this.showError('username', 'Minimum 3 characters');
      valid = false;
    } else {
      this.clearError('username');
    }

    // Password
    if (!password.value) {
      this.showError('password', 'Password is required');
      valid = false;
    } else if (password.value.length < 5) {
      this.showError('password', 'Minimum 5 characters');
      valid = false;
    } else {
      this.clearError('password');
    }

    return valid;
  }

  showError(field, msg) {
    const error = document.getElementById(`${field}-error`);
    error.textContent = msg;
    document.getElementById(field).classList.add('error');
  }

  clearError(field) {
    const error = document.getElementById(`${field}-error`);
    error.textContent = '';
    document.getElementById(field).classList.remove('error');
  }

  setLoading(loading) {
    this.btn.disabled = loading;
    this.btnText.style.display = loading ? 'none' : 'inline';
    this.loader.style.display = loading ? 'inline' : 'none';
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;

    this.setLoading(true);
    this.hideMessage();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Simulate API delay
    await new Promise(r => setTimeout(r, 1200));

    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      // Save session
      sessionStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString()
      }));

      // Remember me
      if (remember) {
        localStorage.setItem('rememberedUser', username);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      this.showMessage('Login successful! Redirecting...', 'success');

      // Role-based redirect
      setTimeout(() => {
        const redirect = {
          admin: 'admin.html',
          reception: 'reception.html',
          technician: 'technician.html'
        };
        window.location.href = redirect[user.role] || 'reception.html';
      }, 1000);
    } else {
      this.showMessage('Invalid username or password', 'error');
      this.setLoading(false);
    }
  }

  showMessage(text, type) {
    this.message.textContent = text;
    this.message.className = `message ${type}`;
    this.message.style.display = 'block';
  }

  hideMessage() {
    this.message.style.display = 'none';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new LoginManager();
});
