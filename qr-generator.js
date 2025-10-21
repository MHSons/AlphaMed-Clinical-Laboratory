```javascript
// qr-generator.js
// Purpose: Generate QR Code from MRN, text, or URLs and append to given element
// Requires: qrcode.min.js library

function generateQRCode(data, elementId = "qrCode", options = {}) {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with ID "${elementId}" not found.`);
    return false;
  }

  container.innerHTML = ""; // Clear previous content

  if (!data || data.trim() === "") {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = "Invalid input for QR code";
    container.appendChild(errorDiv);
    return false;
  }

  const canvas = document.createElement("canvas");
  const defaultOptions = {
    width: 140,
    margin: 1,
    color: {
      dark: "#000000", // Black color
      light: "#FFFFFF" // White background
    },
    ...options
  };

  try {
    QRCode.toCanvas(canvas, data, defaultOptions, function (error) {
      if (error) {
        console.error("QR Code generation failed:", error);
        const errorDiv = document.createElement("div");
        errorDiv.className = "error";
        errorDiv.textContent = "Error generating QR code";
        container.appendChild(errorDiv);
        return false;
      }
      container.appendChild(canvas);
      return true;
    });
    return true;
  } catch (error) {
    console.error("QR Code library not loaded:", error);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = "QR Code library not available";
    container.appendChild(errorDiv);
    return false;
  }
}

// Generate multiple QR codes for an array of data (e.g., multiple tests)
function generateMultipleQRCodes(dataArray, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return false;
  }

  container.innerHTML = ""; // Clear previous content

  dataArray.forEach((data, index) => {
    const qrContainer = document.createElement("div");
    qrContainer.id = `qrCode-${index}`;
    qrContainer.style.margin = "10px";
    container.appendChild(qrContainer);
    generateQRCode(data, `qrCode-${index}`);
  });
  return true;
}
```

### Changes Made
1. **Library Dependency**:
   - Added comment to indicate `qrcode.min.js` is required. Tumhe yeh library include karna hoga in HTML files (e.g., `<script src="https://unpkg.com/qrcode@1.5.1/build/qrcode.min.js"></script>`).
2. **Error Styling**:
   - Errors ab `style.css` ke `.error` class ke saath show honge, jo pehle define kiya gaya hai (`style.css`, artifact ID: `f625266b-b110-4e6b-bda1-93c056debc73`).
3. **Flexibility**:
   - `generateQRCode` ab optional `options` parameter accept karta hai for custom QR code settings.
   - New function `generateMultipleQRCodes` add kiya for generating multiple QR codes (e.g., for multiple tests selected in `register_patient.html`).
4. **Error Handling**:
   - Added try-catch to handle cases where `QRCode` library is not loaded.
   - Return values (`true`/`false`) added to indicate success/failure, useful for integration.
5. **Integration**:
   - Ready to work with `register_patient.html` (MRN from `localStorage`) and `test-data.js` (for `qrCodeLink` fields).

### Integration with Project
To make `qr-generator.js` work with your project:
- **In `registration-slip.html`**: Use `generateQRCode` to display QR code for the patient’s MRN or selected tests’ `qrCodeLink` from `test-data.js`.
- **In `register_patient.html`**: After form submission, MRN and selected test IDs are saved in `localStorage`. `registration-slip.html` can use `generateMultipleQRCodes` to show QR codes for all selected tests.
- **Library Include**: Ensure `qrcode.min.js` is included in any HTML file using `qr-generator.js`. Example:
  ```html
  <script src="https://unpkg.com/qrcode@1.5.1/build/qrcode.min.js"></script>
  <script src="qr-generator.js"></script>
  ```

### Sample `registration-slip.html` (If Needed)
Since `register_patient.html` redirects to `registration-slip.html`, here’s a sample to show how `qr-generator.js` can be used to display patient details and QR codes. If you have the actual `registration-slip.html`, please share it next.

<xaiArtifact artifact_id="1eecf65d-2e36-4e87-92ca-8bb67370efaf" artifact_version_id="777ee660-0beb-4a5e-a27b-8e0fd6f2a1bc" title="registration-slip.html" contentType="text/html">
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Slip - Alpha-Med Clinical Lab</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>🏥 Registration Slip - Alpha-Med Clinical Lab</h1>
  </header>

  <div class="container">
    <h2>Patient Registration Slip</h2>
    <div id="patientDetails"></div>
    <h3>QR Codes for Tests</h3>
    <div id="qrCodes"></div>
  </div>

  <footer>&copy; 2025 Alpha-Med Clinical Lab</footer>

  <script src="https://unpkg.com/qrcode@1.5.1/build/qrcode.min.js"></script>
  <script src="test-data.js"></script>
  <script src="qr-generator.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const patient = JSON.parse(localStorage.getItem("latestPatient") || "{}");
      const patientDetails = document.getElementById("patientDetails");
      const qrCodesContainer = document.getElementById("qrCodes");

      if (!patient.mrn) {
        patientDetails.innerHTML = '<div class="error">No patient data found</div>';
        return;
      }

      // Display patient details
      patientDetails.innerHTML = `
        <p><strong>Name:</strong> ${patient.name}</p>
        <p><strong>CNIC:</strong> ${patient.cnic}</p>
        <p><strong>Phone:</strong> ${patient.phone}</p>
        <p><strong>Department:</strong> ${patient.department}</p>
        <p><strong>Tests:</strong> ${patient.tests.map(testId => {
          const test = Object.values(window.testData).flat().find(t => t.id === testId);
          return test ? test.name : testId;
        }).join(", ")}</p>
        <p><strong>Date:</strong> ${patient.date}</p>
        <p><strong>MRN:</strong> ${patient.mrn}</p>
      `;

      // Generate QR codes for MRN and test links
      const qrData = [patient.mrn, ...patient.tests.map(testId => {
        const test = Object.values(window.testData).flat().find(t => t.id === testId);
        return test ? test.qrCodeLink : "";
      }).filter(link => link)];
      generateMultipleQRCodes(qrData, "qrCodes");
    });
  </script>
</body>
</html>
```
