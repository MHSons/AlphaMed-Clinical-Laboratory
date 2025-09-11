// technician.js (Updated for Date Default & Mobile Responsiveness)

const normalRanges = {
  "Liver Function Test (LFT)": "Depends on subtests",
  "SGPT (ALT)": "7 - 56 U/L",
  "SGOT (AST)": "10 - 40 U/L",
  "ALP (Alkaline Phosphatase)": "44 - 147 U/L",
  "Total Bilirubin": "0.1 - 1.2 mg/dL",
  "Direct Bilirubin": "0.0 - 0.3 mg/dL",
  "Indirect Bilirubin": "0.2 - 0.9 mg/dL",
  "Gamma GT (GGT)": "9 - 48 U/L",
  "Total Protein": "6.0 - 8.3 g/dL",
  "Albumin": "3.5 - 5.0 g/dL",
  "Globulin": "2.0 - 3.5 g/dL",
  "A/G Ratio": "1.2 - 2.2",

  "Renal Function Test (RFT)": "Depends on subtests",
  "Urea": "10 - 50 mg/dL",
  "Creatinine": "0.7 - 1.3 mg/dL",
  "BUN": "7 - 20 mg/dL",
  "Uric Acid": "3.5 - 7.2 mg/dL",
  "Electrolytes (Na, K, Cl)": "Na: 135-145, K: 3.5-5.0, Cl: 96-106 mEq/L",

  "Calcium": "8.5 - 10.5 mg/dL",
  "Phosphorus": "2.5 - 4.5 mg/dL",
  "Magnesium": "1.7 - 2.2 mg/dL",
  "Sodium": "135 - 145 mEq/L",
  "Potassium": "3.5 - 5.0 mEq/L",
  "Chloride": "96 - 106 mEq/L",

  "TSH": "0.4 - 4.0 mIU/L",
  "T3": "80 - 200 ng/dL",
  "T4": "5.0 - 12.0 µg/dL",
  "FT3": "2.3 - 4.1 pg/mL",
  "FT4": "0.8 - 1.8 ng/dL",

  "CK-MB": "0 - 5 ng/mL",
  "Troponin-I": "< 0.04 ng/mL",
  "Troponin-T": "< 0.01 ng/mL",
  "LDH": "140 - 280 U/L",

  "Complete Blood Count (CBC)": "Multiple parameters",
  "Hemoglobin": "13.5 - 17.5 g/dL (M), 12.0 - 15.5 g/dL (F)",
  "RBC": "4.7–6.1 million/µL (M), 4.2–5.4 (F)",
  "WBC": "4,000 - 11,000 /µL",
  "Platelets": "150,000 - 400,000 /µL",
  "PCV": "38-50%",
  "MCV": "80 - 100 fL",
  "MCH": "27 - 33 pg",
  "MCHC": "32 - 36 g/dL",
  "ESR": "0 - 22 mm/hr (M), 0 - 29 mm/hr (F)",

  "Total Cholesterol": "< 200 mg/dL",
  "LDL": "< 130 mg/dL",
  "HDL": "> 40 mg/dL (M), > 50 mg/dL (F)",
  "Triglycerides": "< 150 mg/dL",
  "VLDL": "5 - 40 mg/dL",

  "HCV (Antibody)": "Negative",
  "HBsAg": "Negative",
  "HIV": "Negative",
  "Dengue NS1": "Negative",
  "Dengue IgM/IgG": "Negative/Positive",
  "Typhoid (Widal)": "Negative / <1:80",
  "RA Factor": "< 14 IU/mL",
  "CRP": "< 3.0 mg/L",

  "Urine R/M": "Color: Yellow, pH: 4.6–8.0",
  "Urine Sugar": "Negative",
  "Urine Ketone": "Negative",
  "Urine Protein": "Negative",
  "Stool R/M": "Normal: Brown, no blood/mucus/parasite",
  "Stool Occult Blood": "Negative",

  "Vitamin D": "20 - 50 ng/mL",
  "Vitamin B12": "200 - 900 pg/mL",
  "FSH": "4.7 - 21.5 mIU/mL",
  "LH": "5 - 20 mIU/mL",
  "Prolactin": "5 - 20 ng/mL",
  "Testosterone": "270 - 1070 ng/dL",
  "Pregnancy Test (Urine)": "Positive / Negative"
};

const patientSelect = document.getElementById("patientSelect");
const patients = ["Ali Raza", "Fatima Noor", "Ahmed Khan", "Zainab Bibi"];
patients.forEach((p) => {
  const opt = document.createElement("option");
  opt.value = opt.textContent = p;
  patientSelect.appendChild(opt);
});

function addTestResult() {
  const patient = document.getElementById("patientSelect").value;
  const test = document.getElementById("testName").value.trim();
  const result = document.getElementById("testResult").value.trim();
  const normal = normalRanges[test] || "Manual Input";
  const date = new Date().toISOString().split("T")[0];

  if (!patient || !test || !result) {
    alert("Please fill all fields.");
    return;
  }

  const tbody = document.getElementById("resultsTable").querySelector("tbody");
  const row = tbody.insertRow();
  row.insertCell().textContent = date;
  row.insertCell().textContent = patient;
  row.insertCell().textContent = test;
  row.insertCell().textContent = result;
  row.insertCell().textContent = normal;

  const actionCell = row.insertCell();
  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.onclick = () => row.remove();
  actionCell.appendChild(delBtn);

  document.getElementById("testName").value = "";
  document.getElementById("testResult").value = "";
  document.getElementById("normalRange").textContent = "";
}

document.getElementById("testName").addEventListener("input", () => {
  const input = document.getElementById("testName").value.trim();
  document.getElementById("normalRange").textContent = normalRanges[input] || "";
});

function filterResults() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#resultsTable tbody tr");
  rows.forEach((row) => {
    const match = [...row.cells].some((cell) =>
      cell.textContent.toLowerCase().includes(query)
    );
    row.style.display = match ? "" : "none";
  });
}
