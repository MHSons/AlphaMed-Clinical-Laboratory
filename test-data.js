// test-data part 1 (English only): Hematology, Biochemistry, Serology, Microbiology, Urinalysis
// Each module exports an array of test objects. Use these in your /data folder and import/merge in a top-level test-data.js

// hematology.js
export const hematology = [
  {
    id: "HEM_CBC",
    name: "Complete Blood Count (CBC)",
    department: "Hematology",
    parameters: [
      { parameter: "Hemoglobin", unit: "g/dL", range: "Male: 13.5-17.5; Female: 12.0-15.5" },
      { parameter: "WBC", unit: "x10^9/L", range: "4.0-11.0" },
      { parameter: "Platelets", unit: "x10^9/L", range: "150-400" },
      { parameter: "RBC", unit: "x10^12/L", range: "4.2-5.9" },
      { parameter: "Hematocrit", unit: "%", range: "40-50" }
    ]
  },
  {
    id: "HEM_ESR",
    name: "Erythrocyte Sedimentation Rate (ESR)",
    department: "Hematology",
    parameters: [ { parameter: "ESR (Westergren)", unit: "mm/hr", range: "Male: 0-15; Female: 0-20" } ]
  },
  {
    id: "HEM_PERF",
    name: "Peripheral Blood Film",
    department: "Hematology",
    parameters: [ { parameter: "Morphology Report", unit: "text", range: "-" } ]
  },
  {
    id: "HEM_RETIC",
    name: "Reticulocyte Count",
    department: "Hematology",
    parameters: [ { parameter: "Reticulocyte %", unit: "%", range: "0.5-2.5" } ]
  },
  {
    id: "HEM_BLOOD_GROUP",
    name: "Blood Grouping & Rh Typing",
    department: "Hematology",
    parameters: [ { parameter: "ABO Group", unit: "-", range: "A/B/AB/O" }, { parameter: "Rh Factor", unit: "-", range: "Positive/Negative" } ]
  },
  {
    id: "HEM_PT",
    name: "Prothrombin Time (PT)",
    department: "Hematology",
    parameters: [ { parameter: "PT", unit: "seconds", range: "11-15" }, { parameter: "INR", unit: "-", range: "0.8-1.2" } ]
  },
  {
    id: "HEM_APTT",
    name: "Activated Partial Thromboplastin Time (aPTT)",
    department: "Hematology",
    parameters: [ { parameter: "aPTT", unit: "seconds", range: "25-40" } ]
  },
  {
    id: "HEM_COOMBS",
    name: "Direct and Indirect Coombs Test",
    department: "Hematology",
    parameters: [ { parameter: "Direct Coombs", unit: "-", range: "Negative" }, { parameter: "Indirect Coombs", unit: "-", range: "Negative" } ]
  },
  {
    id: "HEM_FERRITIN",
    name: "Serum Ferritin",
    department: "Hematology",
    parameters: [ { parameter: "Ferritin", unit: "ng/mL", range: "Male: 24-336; Female: 11-307" } ]
  },
  {
    id: "HEM_B12",
    name: "Vitamin B12",
    department: "Hematology",
    parameters: [ { parameter: "Vitamin B12", unit: "pg/mL", range: "200-900" } ]
  }
];

// biochemistry.js
export const biochemistry = [
  {
    id: "BIO_LFT",
    name: "Liver Function Test (LFT)",
    department: "Biochemistry",
    parameters: [
      { parameter: "Bilirubin - Total", unit: "mg/dL", range: "0.2-1.2" },
      { parameter: "Bilirubin - Direct", unit: "mg/dL", range: "0.0-0.3" },
      { parameter: "ALT (SGPT)", unit: "U/L", range: "7-56" },
      { parameter: "AST (SGOT)", unit: "U/L", range: "5-40" },
      { parameter: "Alkaline Phosphatase", unit: "U/L", range: "44-147" }
    ]
  },
  {
    id: "BIO_RFT",
    name: "Renal Function Test (RFT)",
    department: "Biochemistry",
    parameters: [ { parameter: "Urea", unit: "mg/dL", range: "17-43" }, { parameter: "Creatinine", unit: "mg/dL", range: "0.6-1.3" } ]
  },
  {
    id: "BIO_LIPID",
    name: "Lipid Profile",
    department: "Biochemistry",
    parameters: [ { parameter: "Total Cholesterol", unit: "mg/dL", range: "<200" }, { parameter: "HDL", unit: "mg/dL", range: ">40" }, { parameter: "LDL", unit: "mg/dL", range: "<130" }, { parameter: "Triglycerides", unit: "mg/dL", range: "<150" } ]
  },
  {
    id: "BIO_GLUC",
    name: "Blood Glucose",
    department: "Biochemistry",
    parameters: [ { parameter: "Fasting Glucose", unit: "mg/dL", range: "70-100" }, { parameter: "Random Glucose", unit: "mg/dL", range: "<140" } ]
  },
  {
    id: "BIO_UREA",
    name: "Uric Acid",
    department: "Biochemistry",
    parameters: [ { parameter: "Uric Acid", unit: "mg/dL", range: "3.5-7.2" } ]
  },
  {
    id: "BIO_CPK",
    name: "CPK (Creatine Phosphokinase)",
    department: "Biochemistry",
    parameters: [ { parameter: "CPK", unit: "U/L", range: "26-192" } ]
  },
  {
    id: "BIO_ALB",
    name: "Serum Albumin",
    department: "Biochemistry",
    parameters: [ { parameter: "Albumin", unit: "g/dL", range: "3.5-5.0" } ]
  },
  {
    id: "BIO_TOTAL_PROT",
    name: "Total Protein",
    department: "Biochemistry",
    parameters: [ { parameter: "Total Protein", unit: "g/dL", range: "6.0-8.3" } ]
  },
  {
    id: "BIO_CAL",
    name: "Calcium (Serum)",
    department: "Biochemistry",
    parameters: [ { parameter: "Calcium", unit: "mg/dL", range: "8.5-10.2" } ]
  },
  {
    id: "BIO_PHOS",
    name: "Phosphate",
    department: "Biochemistry",
    parameters: [ { parameter: "Phosphate", unit: "mg/dL", range: "2.5-4.5" } ]
  }
];

// serology.js
export const serology = [
  { id: "SER_HBSAG", name: "HBsAg (Rapid/ELISA)", department: "Serology", parameters: [ { parameter: "HBsAg", unit: "-", range: "Reactive/Non-Reactive" } ] },
  { id: "SER_HCV", name: "Anti-HCV (ELISA)", department: "Serology", parameters: [ { parameter: "Anti-HCV", unit: "-", range: "Reactive/Non-Reactive" } ] },
  { id: "SER_HIV", name: "HIV 1/2 (Rapid/ELISA)", department: "Serology", parameters: [ { parameter: "HIV Ab", unit: "-", range: "Reactive/Non-Reactive" } ] },
  { id: "SER_DENGUE_NS1", name: "Dengue NS1/IgM/IgG", department: "Serology", parameters: [ { parameter: "NS1", unit: "-", range: "Positive/Negative" }, { parameter: "IgM", unit: "-", range: "Positive/Negative" } ] },
  { id: "SER_WIDAL", name: "Widal Test", department: "Serology", parameters: [ { parameter: "O", unit: "Titre", range: "<1:80" }, { parameter: "H", unit: "Titre", range: "<1:80" } ] },
  { id: "SER_RPR", name: "VDRL / RPR", department: "Serology", parameters: [ { parameter: "RPR/VDRL", unit: "-", range: "Non-Reactive" } ] },
  { id: "SER_CRP", name: "CRP (C-Reactive Protein)", department: "Serology", parameters: [ { parameter: "CRP", unit: "mg/L", range: "<5" } ] },
  { id: "SER_RA", name: "Rheumatoid Factor (RF)", department: "Serology", parameters: [ { parameter: "RF", unit: "IU/mL", range: "<14" } ] },
  { id: "SER_ASO", name: "ASO Titre", department: "Serology", parameters: [ { parameter: "ASO", unit: "IU/mL", range: "<200" } ] },
  { id: "SER_TOXO", name: "Toxoplasma IgG/IgM", department: "Serology", parameters: [ { parameter: "IgG", unit: "-", range: "Positive/Negative" }, { parameter: "IgM", unit: "-", range: "Positive/Negative" } ] }
];

// microbiology.js
export const microbiology = [
  { id: "MIC_URINE_CS", name: "Urine Culture & Sensitivity", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" }, { parameter: "CFU/mL", unit: "CFU/mL", range: "<10^5" }, { parameter: "Antibiogram", unit: "-", range: "Sensitive/Resistant" } ] },
  { id: "MIC_BLOOD_CS", name: "Blood Culture", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" }, { parameter: "Sensitivity", unit: "-", range: "Sensitive/Resistant" } ] },
  { id: "MIC_SPUTUM_CS", name: "Sputum Culture", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" } ] },
  { id: "MIC_STOOL_CS", name: "Stool Culture", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" } ] },
  { id: "MIC_SWAB_CS", name: "Throat/Nasal Swab Culture", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" } ] },
  { id: "MIC_AFB", name: "AFB Smear / TB Testing", department: "Microbiology", parameters: [ { parameter: "AFB Smear", unit: "-", range: "Positive/Negative" } ] },
  { id: "MIC_FUNGAL", name: "Fungal Culture", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" } ] },
  { id: "MIC_ANTIBIOGRAM", name: "Antibiotic Sensitivity Test", department: "Microbiology", parameters: [ { parameter: "Antibiotic Panel", unit: "-", range: "Sensitive/Resistant" } ] },
  { id: "MIC_VAGINAL", name: "Vaginal Swab Culture", department: "Microbiology", parameters: [ { parameter: "Organism", unit: "-", range: "-" } ] },
  { id: "MIC_MALARIA", name: "Malaria Parasite Smear", department: "Microbiology", parameters: [ { parameter: "MP Smear", unit: "-", range: "Positive/Negative" } ] }
];

// urinalysis.js
export const urinalysis = [
  { id: "URR_ROUTINE", name: "Routine Urine Examination", department: "Urinalysis", parameters: [ { parameter: "Appearance", unit: "-", range: "Clear" }, { parameter: "Color", unit: "-", range: "Yellow" }, { parameter: "pH", unit: "", range: "4.5-8.0" }, { parameter: "Specific Gravity", unit: "", range: "1.005-1.030" } ] },
  { id: "URR_PROTEIN", name: "Urine Protein (Dipstick)", department: "Urinalysis", parameters: [ { parameter: "Protein", unit: "mg/dL", range: "Negative" } ] },
  { id: "URR_GLUCOSE", name: "Urine Glucose", department: "Urinalysis", parameters: [ { parameter: "Glucose", unit: "mg/dL", range: "Negative" } ] },
  { id: "URR_MICRO", name: "Urine Microscopy", department: "Urinalysis", parameters: [ { parameter: "RBC", unit: "/HPF", range: "0-3" }, { parameter: "WBC", unit: "/HPF", range: "0-5" }, { parameter: "Epithelial Cells", unit: "/HPF", range: "0-5" } ] },
  { id: "URR_KETONES", name: "Urine Ketones", department: "Urinalysis", parameters: [ { parameter: "Ketones", unit: "mg/dL", range: "Negative" } ] },
  { id: "URR_NITRITE", name: "Urine Nitrite", department: "Urinalysis", parameters: [ { parameter: "Nitrite", unit: "-", range: "Negative" } ] },
  { id: "URR_LEUK", name: "Leukocyte Esterase", department: "Urinalysis", parameters: [ { parameter: "Leukocyte Esterase", unit: "-", range: "Negative" } ] },
  { id: "URR_BILIRUBIN", name: "Urine Bilirubin", department: "Urinalysis", parameters: [ { parameter: "Bilirubin", unit: "mg/dL", range: "Negative" } ] },
  { id: "URR_UROBILINOGEN", name: "Urobilinogen", department: "Urinalysis", parameters: [ { parameter: "Urobilinogen", unit: "mg/dL", range: "0.1-1.0" } ] },
  { id: "URR_OCCULT", name: "Occult Blood (FOBT)", department: "Urinalysis", parameters: [ { parameter: "Occult Blood", unit: "-", range: "Negative" } ] }
];

// Aggregator (allTestsPart1)
export const allTestsPart1 = [
  ...hematology,
  ...biochemistry,
  ...serology,
  ...microbiology,
  ...urinalysis
];

export function getTestByIdPart1(id) {
  return allTestsPart1.find(t => t.id === id) || null;
}

// End of Part 1 (English only).
