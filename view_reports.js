// view_reports.js - View & Generate PDF Reports
class ReportViewer {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.reportTable = document.querySelector('#reportList tbody');

    this.init();
  }

  init() {
    this.loadReports();

    this.searchBtn.addEventListener('click', () => this.searchReports());
    this.searchInput.addEventListener('keypress', e => e.key === 'Enter' && this.searchReports());

    document.getElementById('logout').addEventListener('click', e => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }

  loadReports() {
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');
    this.displayReports(results);
  }

  searchReports() {
    const query = this.searchInput.value.trim().toLowerCase();
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');

    const filtered = results.filter(r =>
      r.bookingId.toLowerCase().includes(query) ||
      r.patientName.toLowerCase().includes(query) ||
      r.patientId.toLowerCase().includes(query)
    );

    this.displayReports(filtered);
  }

  displayReports(reports) {
    this.reportTable.innerHTML = '';
    if (reports.length === 0) {
      this.reportTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">No reports found</td></tr>';
      return;
    }

    reports.forEach(report => {
      const booking = this.getBooking(report.bookingId);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${report.bookingId}</td>
        <td>${report.patientName}</td>
        <td>${report.results.map(r => r.testName).join(', ')}</td>
        <td>${Utils.formatDate(report.addedAt)}</td>
        <td>
          <button class="btn btn-small btn-success view-report" data-id="${report.bookingId}">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="btn btn-small btn-primary download-pdf" data-id="${report.bookingId}">
            <i class="fas fa-download"></i> PDF
          </button>
        </td>
      `;
      this.reportTable.appendChild(tr);
    });

    // Attach events
    document.querySelectorAll('.view-report').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('button').dataset.id;
        window.open(`report.html?id=${id}`, '_blank');
      });
    });

    document.querySelectorAll('.download-pdf').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('button').dataset.id;
        this.generatePDF(id);
      });
    });
  }

  getBooking(id) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.find(b => b.id === id) || {};
  }

  async generatePDF(bookingId) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const result = JSON.parse(localStorage.getItem('testResults') || '[]').find(r => r.bookingId === bookingId);
    const booking = this.getBooking(bookingId);
    const patient = this.getPatient(result.patientId);

    // Header
    doc.addImage('assets/logo.png', 'PNG', 15, 10, 30, 30);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('AlphaMed Clinical Laboratory', 50, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('State-of-the-Art Diagnostic Services', 50, 28);
    doc.text('Phone: 0300-1234567 | Email: info@alphamed.com', 50, 34);

    // Line
    doc.setLineWidth(0.5);
    doc.line(15, 45, 195, 45);

    // Patient Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Report', 15, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Patient ID: ${patient.id}`, 15, 65);
    doc.text(`Name: ${patient.fullName}`, 15, 72);
    doc.text(`Age/Gender: ${patient.age} yrs / ${patient.gender}`, 15, 79);
    doc.text(`Phone: ${patient.phone}`, 15, 86);
    doc.text(`Report Date: ${Utils.formatDate(result.addedAt)}`, 15, 93);
    doc.text(`Booking ID: ${bookingId}`, 15, 100);

    // Results Table
    const headers = [['Test Name', 'Result', 'Normal Range']];
    const data = result.results.map(r => {
      const test = window.TESTS.find(t => t.id === r.testId);
      const range = this.getNormalRange(r.testId, patient.gender, patient.age);
      return [r.testName, `${r.value} ${r.unit}`, range];
    });

    doc.autoTable({
      head: headers,
      body: data,
      startY: 110,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [44, 62, 80] },
      alternateRowStyles: { fillColor: [248, 249, 250] }
    });

    // Footer
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(9);
    doc.text('Technician: ' + result.technician, 15, finalY);
    doc.text('This is a computer-generated report.', 15, finalY + 7);

    // Download
    doc.save(`Report_${bookingId}.pdf`);
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
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ReportViewer();
});
