// reception.js - Reception Dashboard
class ReceptionDashboard {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.searchResults = document.getElementById('searchResults');
    this.bookingSection = document.getElementById('bookingSection');
    this.bookingForm = document.getElementById('bookingForm');
    this.patientName = document.getElementById('patientName');
    this.patientId = document.getElementById('patientId');
    this.testList = document.getElementById('testList');
    this.invoiceBody = document.getElementById('invoiceBody');
    this.subtotalEl = document.getElementById('subtotal');
    this.discountEl = document.getElementById('discount');
    this.discountAmount = document.getElementById('discountAmount');
    this.totalAmount = document.getElementById('totalAmount');
    this.printBtn = document.getElementById('printInvoice');
    this.cancelBtn = document.getElementById('cancelBooking');
    this.recentTable = document.querySelector('#recentBookings tbody');

    this.selectedTests = [];
    this.currentPatient = null;
    this.currentBooking = null;

    this.init();
  }

  init() {
    this.loadUser();
    this.loadRecentBookings();
    this.loadTests();

    this.searchBtn.addEventListener('click', () => this.searchPatient());
    this.searchInput.addEventListener('keypress', e => e.key === 'Enter' && this.searchPatient());
    this.bookingForm.addEventListener('submit', e => this.confirmBooking(e));
    this.discountEl.addEventListener('input', () => this.updateInvoice());
    this.printBtn.addEventListener('click', () => this.printReceipt());
    this.cancelBtn.addEventListener('click', () => this.cancelBooking());

    document.getElementById('logout').addEventListener('click', e => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }

  loadUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user && user.role === 'reception') {
      document.getElementById('userName').textContent = user.name;
    } else {
      window.location.href = 'login.html';
    }
  }

  searchPatient() {
    const query = this.searchInput.value.trim().toLowerCase();
    if (!query) return;

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const results = patients.filter(p =>
      p.id.toLowerCase().includes(query) ||
      p.fullName.toLowerCase().includes(query) ||
      p.phone.includes(query)
    );

    this.displaySearchResults(results);
  }

  displaySearchResults(results) {
    this.searchResults.innerHTML = '';
    if (results.length === 0) {
      this.searchResults.innerHTML = '<p class="no-results">No patient found</p>';
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'results-list';
    results.forEach(patient => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${patient.id}</strong>: ${patient.fullName} 
        <small>(${patient.age} yrs, ${patient.phone})</small>
        <button class="btn btn-small btn-primary select-patient" data-id="${patient.id}">
          Select
        </button>
      `;
      ul.appendChild(li);
    });
    this.searchResults.appendChild(ul);

    // Attach event listeners
    document.querySelectorAll('.select-patient').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        this.selectPatient(id);
      });
    });
  }

  selectPatient(id) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    this.currentPatient = patients.find(p => p.id === id);
    if (!this.currentPatient) return;

    this.patientId.value = this.currentPatient.id;
    this.patientName.textContent = this.currentPatient.fullName;
    this.bookingSection.style.display = 'block';
    this.searchResults.innerHTML = '';
    this.searchInput.value = '';
    this.selectedTests = [];
    this.updateTestCheckboxes();
    this.updateInvoice();
  }

  loadTests() {
    const tests = window.TESTS || [];
    this.testList.innerHTML = '';
    tests.forEach(test => {
      const div = document.createElement('div');
      div.className = 'checkbox-item';
      div.innerHTML = `
        <label>
          <input type="checkbox" value="${test.id}" data-price="${test.price}">
          <span class="checkmark"></span>
          ${test.name} - PKR ${test.price}
        </label>
      `;
      this.testList.appendChild(div);
    });

    // Attach change listeners
    this.testList.querySelectorAll('input').forEach(cb => {
      cb.addEventListener('change', () => this.updateSelectedTests());
    });
  }

  updateSelectedTests() {
    this.selectedTests = [];
    this.testList.querySelectorAll('input:checked').forEach(cb => {
      this.selectedTests.push({
        id: cb.value,
        name: cb.parentElement.textContent.trim().split(' - ')[0],
        price: parseFloat(cb.dataset.price)
      });
    });
    this.updateInvoice();
  }

  updateInvoice() {
    let subtotal = this.selectedTests.reduce((sum, t) => sum + t.price, 0);
    const discount = parseFloat(this.discountEl.value) || 0;
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    this.invoiceBody.innerHTML = '';
    this.selectedTests.forEach(test => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${test.name}</td><td>PKR ${test.price}</td>`;
      this.invoiceBody.appendChild(tr);
    });

    this.subtotalEl.textContent = `PKR ${subtotal}`;
    this.discountAmount.textContent = `PKR ${discountAmount.toFixed(0)}`;
    this.totalAmount.textContent = `PKR ${total.toFixed(0)}`;
  }

  confirmBooking(e) {
    e.preventDefault();
    if (this.selectedTests.length === 0) {
      Utils.showMessage('Please select at least one test', 'error');
      return;
    }

    const booking = {
      id: Utils.generateId('BK'),
      patientId: this.currentPatient.id,
      patientName: this.currentPatient.fullName,
      tests: this.selectedTests,
      subtotal: this.selectedTests.reduce((s, t) => s + t.price, 0),
      discount: parseFloat(this.discountEl.value) || 0,
      total: parseFloat(this.totalAmount.textContent.replace('PKR ', '')),
      notes: document.getElementById('notes').value,
      bookedAt: new Date().toISOString(),
      status: 'Booked'
    };

    // Save booking
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    this.currentBooking = booking;
    this.printBtn.style.display = 'inline-flex';
    Utils.showMessage('Booking confirmed!', 'success');
    this.loadRecentBookings();
  }

  printReceipt() {
    if (!this.currentBooking) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${this.currentBooking.id}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .invoice { max-width: 500px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .logo { width: 80px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f5f5f5; }
          .total { font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; font-size: 0.9em; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <img src="assets/logo.png" class="logo" alt="Logo">
            <h2>AlphaMed Lab</h2>
            <p>Invoice / Receipt</p>
          </div>
          <p><strong>Booking ID:</strong> ${this.currentBooking.id}</p>
          <p><strong>Patient:</strong> ${this.currentBooking.patientName} (${this.currentBooking.patientId})</p>
          <p><strong>Date:</strong> ${Utils.formatDate(this.currentBooking.bookedAt)}</p>

          <table>
            <thead>
              <tr><th>Test</th><th>Price</th></tr>
            </thead>
            <tbody>
              ${this.currentBooking.tests.map(t => `<tr><td>${t.name}</td><td>PKR ${t.price}</td></tr>`).join('')}
            </tbody>
            <tfoot>
              <tr><td>Subtotal</td><td>PKR ${this.currentBooking.subtotal}</td></tr>
              <tr><td>Discount (${this.currentBooking.discount}%)</td><td>-PKR ${(this.currentBooking.subtotal * this.currentBooking.discount / 100).toFixed(0)}</td></tr>
              <tr class="total"><td>TOTAL</td><td>PKR ${this.currentBooking.total}</td></tr>
            </tfoot>
          </table>

          ${this.currentBooking.notes ? `<p><strong>Notes:</strong> ${this.currentBooking.notes}</p>` : ''}

          <div class="footer">
            <p>Thank you for choosing AlphaMed!</p>
            <p>Contact: 0300-1234567</p>
          </div>
        </div>
        <button onclick="window.print()" class="no-print">Print</button>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  cancelBooking() {
    this.bookingSection.style.display = 'none';
    this.currentPatient = null;
    this.currentBooking = null;
    this.selectedTests = [];
    this.bookingForm.reset();
    this.printBtn.style.display = 'none';
    this.invoiceBody.innerHTML = '';
  }

  loadRecentBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]').reverse().slice(0, 5);
    this.recentTable.innerHTML = '';
    if (bookings.length === 0) {
      this.recentTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">No bookings yet</td></tr>';
      return;
    }
    bookings.forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${b.id}</td>
        <td>${b.patientName}</td>
        <td>${b.tests.map(t => t.name).join(', ')}</td>
        <td>PKR ${b.total}</td>
        <td>${Utils.formatDate(b.bookedAt)}</td>
      `;
      this.recentTable.appendChild(tr);
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ReceptionDashboard();
});
