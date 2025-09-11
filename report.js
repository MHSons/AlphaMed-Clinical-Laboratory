// ✅ Report Generator using jsPDF
// index.html میں یہ add ہونا لازمی ہے:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

async function generateReport(patient, resultValue) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // ✅ Header
  const logo = new Image();
  logo.src = "logo.png"; // Put your logo in same folder
  await new Promise(r => (logo.onload = r));
  doc.addImage(logo, "PNG", 10, 8, 20, 20);

  doc.setFontSize(16);
  doc.text("AlphaMed Clinical Laboratory", 105, 15, { align: "center" });

  // ✅ QR Code
  const qrCanvas = document.createElement("canvas");
  const qrData = `MRN: ${patient.id} | ${patient.name} | ${patient.test} | ${resultValue}`;
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
  doc.text(`Parameter: ${patient.parameter}`, 20, 115);
  doc.text(`Result: ${resultValue}`, 20, 122);
  doc.text(`Normal Range: ${patient.range}`, 20, 129);

  // ✅ Watermark
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

// ✅ Print Report
function printReport(patient, resultValue) {
  generateReport(patient, resultValue);
}

// ✅ Download Report
async function downloadReport(patient, resultValue) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("AlphaMed Clinical Laboratory", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Patient: ${patient.name} (${patient.age}, ${patient.gender})`, 14, 40);
  doc.text(`Department: ${patient.department}`, 14, 47);
  doc.text(`Test: ${patient.test}`, 14, 54);
  doc.text(`Parameter: ${patient.parameter}`, 14, 61);
  doc.text(`Result: ${resultValue}`, 14, 68);
  doc.text(`Normal Range: ${patient.range}`, 14, 75);

  // ✅ Watermark
  doc.setFontSize(40);
  doc.setTextColor(220, 220, 220);
  doc.text("AlphaMed", 105, 150, { align: "center", angle: 45 });

  doc.save(`${patient.name}_Report.pdf`);
}
