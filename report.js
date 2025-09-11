// ✅ Report Generator using jsPDF
// Make sure you have added in index.html:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

async function generateReport(patient, resultValue) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // ✅ Header
  const logo = new Image();
  logo.src = "logo.png"; // Put your logo file in same folder
  await new Promise(r => (logo.onload = r));
  doc.addImage(logo, "PNG", 10, 8, 20, 20);

  doc.setFontSize(16);
  doc.text("AlphaMed Clinical Laboratory", 105, 15, { align: "center" });

  // ✅ QR Code
  const qrCanvas = document.createElement("canvas");
  const qrData = `${patient.name} | ${patient.age} | ${patient.gender} | ${patient.department} | ${patient.test}`;
  await QRCode.toCanvas(qrCanvas, qrData, { width: 60 });
  const qrDataURL = qrCanvas.toDataURL("image/png");
  doc.addImage(qrDataURL, "PNG", 170, 8, 30, 30);

  // ✅ Patient Info
  doc.setFontSize(12);
  doc.text(`MRN: ${patient.id}`, 14, 45);
  doc.text(`Name: ${patient.name}`, 14, 52);
  doc.text(`Age: ${patient.age}`, 14, 59);
  doc.text(`Gender: ${patient.gender}`, 14, 66);

  // ✅ Test Info
  doc.text(`Department: ${patient.department}`, 14, 80);
  doc.text(`Test: ${patient.test}`, 14, 87);

  // ✅ Result Section
  doc.setFontSize(14);
  doc.text("Test Result", 14, 105);
  doc.setFontSize(12);
  doc.text(`Result: ${resultValue}`, 20, 115);
  doc.text(`Normal Range: Auto (as per DB)`, 20, 122);

  // ✅ Watermark (Lab Monogram)
  doc.setFontSize(50);
  doc.setTextColor(200, 200, 200);
  doc.text("AlphaMed", 105, 160, { align: "center", angle: 45 });

  // ✅ Footer
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text("This is a system-generated report. Signature not required.", 105, 280, { align: "center" });

  // ✅ Show PDF in new tab
  window.open(doc.output("bloburl"), "_blank");
}

// ✅ Print Report Directly
function printReport(patient, resultValue) {
  generateReport(patient, resultValue); // PDF opens → user can print
}

// ✅ Download Report
async function downloadReport(patient, resultValue) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("AlphaMed Clinical Laboratory", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Patient: ${patient.name} (${patient.age}, ${patient.gender})`, 14, 40);
  doc.text(`Test: ${patient.test}`, 14, 50);
  doc.text(`Result: ${resultValue}`, 14, 60);

  // ✅ Watermark
  doc.setFontSize(40);
  doc.setTextColor(220, 220, 220);
  doc.text("AlphaMed", 105, 150, { align: "center", angle: 45 });

  doc.save(`${patient.name}_Report.pdf`);
}
