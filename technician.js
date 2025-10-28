// technician.js - Lab Technician Panel
class TechnicianPanel {
  constructor() {
    this.pendingTable = document.querySelector('#pendingList tbody');
    this.modal = document.getElementById('resultModal');
    this.closeBtns = document.querySelectorAll('.close-modal');
    this.resultForm = document.getElementById('resultForm');
    this.resultFields = document.getElementById('resultFields');
    this.modalPatient = document.getElementById('modalPatient');
    this.modalBookingId = document.getElementById('modalBookingId');
    this.modalBookingIdInput = document.getElementById('modalBookingIdInput');

    this.currentBooking = null;

    this.init();
  }

  init() {
    this.loadUser();
    this.loadPendingBookings();

    // Modal close
    this.closeBtns.forEach(btn => btn.addEventListener('click', () => this.closeModal()));
    window.addEventListener('click', e => {
      if (e.target === this.modal) this.closeModal();
    });

    // Form submit
    this.resultForm.addEventListener('submit', e => this.saveResults(e));

    // Logout
    document.getElementById('logout').addEventListener('click', e => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }

  loadUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user && user.role === 'technician') {
      document.getElementById('userName').textContent = user.name;
    } else {
      window.location.href = 'login.html';
    }
  }

  loadPendingBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');
    const resultIds = results.map(r => r.bookingId);

    const pending = bookings.filter(b => !resultIds.includes(b.id) && b.status === 'Booked');

    this.pendingTable.innerHTML = '';
    if (pending.length === 0) {
      this.pendingTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">No pending tests</td></tr>';
      return;
    }

    pending.forEach(booking => {
      const patient = this.getPatient(booking.patientId);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${booking.id}</td>
        <td>${booking.patientName}</td>
        <td>${booking.tests.map(t => t.name).join(', ')}</td>
        <td>${Utils.formatDate(booking.bookedAt)}</td>
        <td>
          <button class="btn btn-small btn-primary add-result" data-id="${booking.id}">
            <i class="fas fa-plus"></i> Add Result
          </button>
        </td>
      `;
      this.pendingTable.appendChild(tr);
    });

    // Attach event
    document.querySelectorAll('.add-result').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('button').dataset.id;
        this.openResultModal(id);
      });
    });
  }

  getPatient(id) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    return patients.find(p => p.id === id) || {};
  }

  openResultModal(bookingId) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.currentBooking = bookings.find(b => b.id === bookingId);
    if (!this.currentBooking) return;

    const patient = this.getPatient(this.currentBooking.patientId);

    this.modalPatient.textContent = `${patient.fullName} (${patient.age} yrs, ${patient.gender})`;
    this.modalBookingId.textContent = this.currentBooking.id;
    this.modalBookingIdInput.value = this.currentBooking.id;

    this.resultFields.innerHTML = '';
    this.currentBooking.tests.forEach(test => {
      const testInfo = window.TESTS.find(t => t.id === test.id);
      const normalRange = this.getNormalRange(test.id, patient.gender, patient.age);

      const div = document.createElement('div');
      div.className = 'form-group';
      div.innerHTML = `
        <label>${test.name}</label>
        <input type="text" name="${test.id}" placeholder="Enter result" required>
        <small>Normal Range: ${normalRange}</small>
      `;
      this.resultFields.appendChild(div);
    });

    this.modal.style.display = 'block';
  }

  getNormalRange(testId, gender, age) {
    const ranges = {
      cbc: { male: 'Hb: 13.5-17.5 g/dL', female: 'Hb: 12.0-15.5 g/dL' },
      lft: { male: 'ALT: 7-56 U/L', female: 'ALT: 7-45 U/L' },
      rft: { male: 'Creatinine: 0.7-1.3 mg/dL', female: 'Creatinine: 0.6-1.1 mg/dL' },
      lipid: { male: 'Cholesterol: <200 mg/dL', female: 'Cholesterol: <200 mg/dL' },
      thyroid: { male: 'TSH: 0.4-4.0 mIU/L', female: 'TSH: 0.4-4.0 mIU/L' },
      glucose: { male: '70-99 mg/dL', female: '70-99 mg/dL' },
      hba1c: { male: '<5.7%', female: '<5.7%' },
      urine: { male: 'No protein, No glucose', female: 'No protein, No glucose' }
    };
    const range = ranges[testId] || { male: 'N/A', female: 'N/A' };
    return gender === 'Male' ? range.male : range.female;
  }

  saveResults(e) {
    e.preventDefault();
    const formData = new FormData(this.resultForm);
    const results = [];

    this.currentBooking.tests.forEach(test => {
      const value = formData.get(test.id);
      if (value) {
        results.push({
          testId: test.id,
          testName: test.name,
          value: value.trim(),
          unit: this.getUnit(test.id)
        });
      }
    });

    if (results.length === 0) {
      Utils.showMessage('Please enter at least one result', 'error');
      return;
    }

    const resultEntry = {
      bookingId: this.currentBooking.id,
      patientId: this.currentBooking.patientId,
      patientName: this.currentBooking.patientName,
      results: results,
      technician: JSON.parse(sessionStorage.getItem('currentUser')).name,
      addedAt: new Date().toISOString(),
      status: 'Completed'
    };

    // Save result
    let allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    allResults.push(resultEntry);
    localStorage.setItem('testResults', JSON.stringify(allResults));

    // Update booking status
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.id === this.currentBooking.id);
    if (booking) booking.status = 'Completed';
    localStorage.setItem('bookings', JSON.stringify(bookings));

    Utils.showMessage('Results saved successfully!', 'success');
    this.closeModal();
    this.loadPendingBookings();
  }

  getUnit(testId) {
    const units = {
      cbc: 'g/dL', lft: 'U/L', rft: 'mg/dL', lipid: 'mg/dL',
      thyroid: 'mIU/L', glucose: 'mg/dL', hba1c: '%', urine: ''
    };
    return units[testId] || '';
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.resultForm.reset();
    this.currentBooking = null;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new TechnicianPanel();
});
