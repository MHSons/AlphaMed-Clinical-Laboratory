import React, { useState } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

export default function LabReportApp() {
  const [patient, setPatient] = useState({
    name: "",
    dob: "",
    gender: "",
  });

  const [report, setReport] = useState({
    test: "CBC",
    result: "",
    normal: "",
  });

  const [reports, setReports] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");

  // Auto-generate MRN
  const generateMRN = () => {
    return "MRN-" + Date.now();
  };

  // Handle input
  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  // Generate Report
  const generateReport = async () => {
    const mrn = generateMRN();

    const fullReport = {
      mrn,
      patient,
      report,
      date: new Date().toLocaleString(),
    };

    // QR Code encode
    const qrData = JSON.stringify(fullReport, null, 2);
    const qr = await QRCode.toDataURL(qrData);
    setQrCodeUrl(qr);

    // Barcode encode
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, mrn, { format: "CODE128" });
    setBarcodeUrl(canvas.toDataURL("image/png"));

    setReports([fullReport, ...reports]);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center border-b pb-2 mb-4">
        {/* Left: Logo */}
        <img src="/logo.png" alt="Lab Logo" className="w-20 h-20" />

        {/* Center: Lab Name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">
            AlphaMed Clinical Laboratory
          </h1>
          <p className="text-sm text-gray-600">
            Quality Assurance Through Advanced Technology
          </p>
        </div>

        {/* Right: QR Code */}
        {qrCodeUrl && (
          <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
        )}
      </header>

      {/* Patient Form */}
      <div className="bg-white shadow rounded-xl p-4 mb-4">
        <h2 className="font-semibold mb-2">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={patient.name}
            onChange={handlePatientChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="dob"
            value={patient.dob}
            onChange={handlePatientChange}
            className="border p-2 rounded"
          />
          <select
            name="gender"
            value={patient.gender}
            onChange={handlePatientChange}
            className="border p-2 rounded"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>

      {/* Report Form */}
      <div className="bg-white shadow rounded-xl p-4 mb-4">
        <h2 className="font-semibold mb-2">Test Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="test"
            value={report.test}
            onChange={handleReportChange}
            className="border p-2 rounded"
          >
            <option>CBC</option>
            <option>LFT</option>
            <option>RFT</option>
            <option>Blood Sugar</option>
          </select>
          <input
            type="text"
            name="result"
            placeholder="Result"
            value={report.result}
            onChange={handleReportChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="normal"
            placeholder="Normal Range"
            value={report.normal}
            onChange={handleReportChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={generateReport}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-xl shadow"
        >
          Generate Report
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-semibold mb-2">Generated Reports</h2>
        {reports.length === 0 && <p>No reports generated yet.</p>}
        <ul className="divide-y">
          {reports.map((r, idx) => (
            <li key={idx} className="py-2">
              <div className="flex justify-between">
                <div>
                  <p>
                    <strong>{r.patient.name}</strong> ({r.patient.gender})
                  </p>
                  <p className="text-sm text-gray-600">
                    {r.report.test}: {r.report.result} (Normal: {r.report.normal})
                  </p>
                  <p className="text-xs text-gray-500">MRN: {r.mrn}</p>
                </div>
                {barcodeUrl && (
                  <img src={barcodeUrl} alt="Barcode" className="w-32 h-10" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
