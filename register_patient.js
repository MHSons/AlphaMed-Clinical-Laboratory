// register_patient.js - Patient Registration System
class PatientRegistration {
  constructor() {
    this.form = document.getElementById('patientForm');
    this.message = document.getElementById('message');
    this.successBox = document.getElementById('successBox');
    this.patientIdSpan = document.getElementById('patientId');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.form.addEventListener('reset', () => {
      this.successBox.style.display = 'none';
      this.hideMessage();
    });
  }

  validate() {
    let valid = true;
    const fields = ['fullName', 'age', 'gender', 'phone'];

    fields.forEach(field => {
      const input = document.getElementById(field);
      const error = document.getElementById(`${field}-error`);

      if (!input.value.trim()) {
        this.showError(field, 'This field is required');
        valid = false;
      } else if (field === 'phone' && !/^\d{11}$/.test(input.value)) {
        this.showError(field, 'Enter valid 11-digit phone');
        valid = false;
      } else if (field === 'age' && (input.value < 1 || input.value > 120)) {
        this.showError(field, 'Age must be 1-120');
        valid = false;
      } else {
        this.clearError(field);
      }
    });

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

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;

    const patient = {
      id: Utils.generateId('PT'),
      fullName: document.getElementById('fullName').value.trim(),
      fatherName: document.getElementById('fatherName').value.trim(),
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      phone: document.getElementById('phone').value,
      cnic: document.getElementById('cnic').value,
      address: document.getElementById('address').value,
      referredBy: document.getElementById('referredBy').value,
      emergencyContact: document.getElementById('emergencyContact').value,
      registeredAt: new Date().toISOString(),
      status: 'Registered'
    };

    // Save to localStorage
    let patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));

    // Show success
    this.patientIdSpan.textContent = patient.id;
    this.successBox.style.display = 'flex';
    this.hideMessage();
    this.form.reset();

    // Store last patient for printing
    sessionStorage.setItem('lastPatient', JSON.stringify(patient));
  }

  hideMessage() {
    this.message.style.display = 'none';
  }
}

// Print Slip Function
window.printSlip = () => {
  const patient = JSON.parse(sessionStorage.getItem('lastPatient'));
  if (!patient) return Utils.showMessage('No patient to print', 'error');

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Registration Slip - ${patient.id}</title>
      <style>
        body { font-family: Arial; padding: 20px; text-align: center; }
        .slip { max-width: 400px; margin: 0 auto; border: 2px dashed #333; padding: 20px; }
        .logo { width: 80px; margin-bottom: 10px; }
        h1 { margin: 10px 0; color: #2c3e50; }
        .info { text-align: left; margin: 15px 0; }
        .info strong { display: inline-block; width: 120px; }
        .footer { margin-top: 30px; font-size: 0.9em; color: #666; }
        @media print { body { margin: 0; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="slip">
        <img src="assets/logo.png" class="logo" alt="Logo">
        <h1>AlphaMed Lab</h1>
        <p>Registration Slip</p>
        <div class="info">
          <p><strong>ID:</strong> ${patient.id}</p>
          <p><strong>Name:</strong> ${patient.fullName}</p>
          <p><strong>Father:</strong> ${patient.fatherName || '—'}</p>
          <p><strong>Age/Gender:</strong> ${patient.age} yrs / ${patient.gender}</p>
          <p><strong>Phone:</strong> ${patient.phone}</p>
          <p><strong>Address:</strong> ${patient.address || '—'}</p>
          <p><strong>Referred By:</strong> ${patient.referredBy || '—'}</p>
          <p><strong>Date:</strong> ${Utils.formatDate(patient.registeredAt)}</p>
        </div>
        <div class="footer">
          <p>Bring this slip for test booking</p>
          <p>Contact: 0300-1234567</p>
        </div>
      </div>
      <button onclick="window.print()" class="no-print">Print</button>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new PatientRegistration();
});
