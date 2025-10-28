// report.js - Single Report Viewer
class ReportPage {
  constructor() {
    this.reportContent = document.getElementById('reportContent');
    this.downloadBtn = document.getElementById('downloadPdf');
    this.bookingId = new URLSearchParams(window.location.search).get('id');

    if (!this.bookingId) {
      this.reportContent.innerHTML = '<p class="error">Invalid report ID</p>';
      return;
    }

    this.init();
  }

  init() {
    this.loadReport();
    this.downloadBtn.addEventListener('click', () => this.generatePDF());
  }

  loadReport() {
    const result = JSON.parse(localStorage.getItem('testResults') || '[]').find(r => r.bookingId === this.bookingId);
    if (!result) {
      this.reportContent.innerHTML = '<p class="error">Report not found</p>';
      return;
    }

    const booking = this.getBooking(result.bookingId);
    const patient = this.getPatient(result.patientId);

    let html = `
      <div class="report-header">
        <img src="assets/logo.png" alt="Logo" class="report-logo">
        <div>
          <h1>AlphaMed Clinical Laboratory</h1>
          <p>Diagnostic Report</p>
        </div>
      </div>
      <div class="patient-info">
        <p><strong>Patient ID:</strong> ${patient.id}</p>
        <p><strong>Name:</strong> ${patient.fullName}</p>
        <p><strong>Age/Gender:</strong> ${patient.age} yrs / ${patient.gender}</p>
        <p><strong>Phone:</strong> ${patient.phone}</p>
        <p><strong>Report Date:</strong> ${Utils.formatDate(result.addedAt)}</p>
        <p><strong>Booking ID:</strong> ${result.bookingId}</p>
      </div>
      <table class="report-table">
        <thead>
          <tr><th>Test</th><th>Result</th><th>Normal Range</th></tr>
        </thead>
        <tbody>
    `;

    result.results.forEach(r => {
      const range = this.getNormalRange(r.testId, patient.gender, patient.age);
      html += `<tr><td>${r.testName}</td><td>${r.value} ${r.unit}</td><td>${range}</td></tr>`;
    });

    html += `
        </tbody>
      </table>
      <div class="report-footer">
        <p><strong>Technician:</strong> ${result.technician}</p>
        <p>This is a computer-generated report. No signature required.</p>
      </div>
    `;

    this.reportContent.innerHTML = html;
  }

  getBooking(id) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.find(b => b.id === id) || {};
  }

  getPatient(id) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    return patients.find(p => p.id === id) || {};
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

  generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Same PDF logic as in view_reports.js
    // (Copy from generatePDF method above)
    alert('PDF generation from report.html - use view_reports.js for full PDF');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ReportPage();
});
