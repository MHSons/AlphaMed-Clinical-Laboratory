// qr-generator.js
// Purpose: Generate QR Code from MRN or any text and append to given element

function generateQRCode(mrn, elementId = "qrCode") {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  container.innerHTML = ""; // Clear any previous QR code

  if (!mrn || mrn.trim() === "") {
    container.textContent = "Invalid MRN";
    return;
  }

  const canvas = document.createElement("canvas");

  QRCode.toCanvas(canvas, mrn, {
    width: 140,
    margin: 1,
    color: {
      dark: "#000000",  // Black color
      light: "#FFFFFF"  // White background
    }
  }, function (error) {
    if (error) {
      console.error("QR Code generation failed:", error);
      container.textContent = "Error generating QR";
    } else {
      container.appendChild(canvas);
    }
  });
}
