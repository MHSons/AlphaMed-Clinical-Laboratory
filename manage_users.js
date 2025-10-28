// manage_users.js - User Management
class UserManager {
  constructor() {
    this.modal = document.getElementById('userModal');
    this.form = document.getElementById('userForm');
    this.tableBody = document.querySelector('#usersTable tbody');
    this.addBtn = document.getElementById('addUserBtn');
    this.closeBtns = document.querySelectorAll('.close-modal');
    this.modalTitle = document.getElementById('modalTitle');

    this.editingId = null;

    this.init();
  }

  init() {
    this.checkAccess();
    this.loadUsers();

    this.addBtn.addEventListener('click', () => this.openModal());
    this.closeBtns.forEach(btn => btn.addEventListener('click', () => this.closeModal()));
    this.form.addEventListener('submit', e => this.saveUser(e));

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

  loadUsers() {
    let users = JSON.parse(localStorage.getItem('labUsers') || '[]');
    // Initialize default users if empty
    if (users.length === 0) {
      users = [
        { id: 1, username: 'admin', password: 'admin123', name: 'Administrator', role: 'admin', status: 'Active' },
        { id: 2, username: 'reception', password: 'rec123', name: 'Receptionist', role: 'reception', status: 'Active' },
        { id: 3, username: 'tech', password: 'tech123', name: 'Lab Technician', role: 'technician', status: 'Active' }
      ];
      localStorage.setItem('labUsers', JSON.stringify(users));
    }

    this.displayUsers(users);
  }

  displayUsers(users) {
    this.tableBody.innerHTML = '';
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${user.name}</td>
        <td><span class="badge badge-${user.role}">${user.role}</span></td>
        <td><span class="badge badge-${user.status === 'Active' ? 'success' : 'danger'}">${user.status}</span></td>
        <td>
          <button class="btn btn-small btn-primary edit-user" data-id="${user.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-small btn-danger delete-user" data-id="${user.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      this.tableBody.appendChild(tr);
    });

    document.querySelectorAll('.edit-user').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('button').dataset.id;
        this.editUser(id);
      });
    });

    document.querySelectorAll('.delete-user').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('button').dataset.id;
        this.deleteUser(id);
      });
    });
  }

  openModal() {
    this.modalTitle.textContent = 'Add New User';
    this.form.reset();
    this.editingId = null;
    document.getElementById('editId').value = '';
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  saveUser(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!username || !name || !password || !role) {
      Utils.showMessage('All fields are required', 'error');
      return;
    }

    let users = JSON.parse(localStorage.getItem('labUsers') || '[]');

    if (this.editingId) {
      // Update
      const user = users.find(u => u.id == this.editingId);
      if (user) {
        user.username = username;
        user.name = name;
        if (password) user.password = password;
        user.role = role;
      }
    } else {
      // Add new
      const id = Date.now();
      users.push({
        id,
        username,
        password,
        name,
        role,
        status: 'Active'
      });
    }

    localStorage.setItem('labUsers', JSON.stringify(users));
    Utils.showMessage('User saved successfully!', 'success');
    this.closeModal();
    this.loadUsers();
  }

  editUser(id) {
    const users = JSON.parse(localStorage.getItem('labUsers') || '[]');
    const user = users.find(u => u.id == id);
    if (!user) return;

    this.modalTitle.textContent = 'Edit User';
    document.getElementById('editId').value = user.id;
    document.getElementById('username').value = user.username;
    document.getElementById('fullName').value = user.name;
    document.getElementById('password').value = '';
    document.getElementById('password').placeholder = 'Leave blank to keep current';
    document.getElementById('role').value = user.role;

    this.editingId = id;
    this.modal.style.display = 'block';
  }

  deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    let users = JSON.parse(localStorage.getItem('labUsers') || '[]');
    users = users.filter(u => u.id != id);
    localStorage.setItem('labUsers', JSON.stringify(users));

    Utils.showMessage('User deleted', 'success');
    this.loadUsers();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new UserManager();
});
