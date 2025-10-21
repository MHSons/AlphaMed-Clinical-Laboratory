// qr-generator.js
// QR Code generator for Prime Medical Diagnostic Lab

// Load the lightweight QR code library (no internet needed)
(function loadQRLib() {
  if (typeof QRCode === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js";
    script.defer = true;
    document.head.appendChild(script);
  }
})();

/**
 * Generates a QR code for a given text (usually patient ID)
 * @param {string} text - The text or ID to encode
 * @param {string} elementId - The HTML element ID where QR will appear
 */
function generateQRCode(text, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;

  // Clear old QR
  container.innerHTML = "";

  // Wait until library loads
  const waitForQR = setInterval(() => {
    if (typeof QRCode !== "undefined") {
      clearInterval(waitForQR);

      new QRCode(container, {
        text: `Patient ID: ${text}\nVerified by Prime Medical Lab`,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  }, 200);
}
