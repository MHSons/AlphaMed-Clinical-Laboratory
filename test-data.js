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
// test-data part 2 (English only): Endocrinology, Coagulation, Electrolytes, Cardiac Markers, Tumor Markers

export const endocrinology = [
  { id: "ENDO_TSH", name: "Thyroid Stimulating Hormone (TSH)", department: "Endocrinology", parameters: [ { parameter: "TSH", unit: "µIU/mL", range: "0.4-4.0" } ] },
  { id: "ENDO_T3T4", name: "T3, T4", department: "Endocrinology", parameters: [ { parameter: "T3", unit: "ng/dL", range: "80-200" }, { parameter: "T4", unit: "µg/dL", range: "5.0-12.0" } ] },
  { id: "ENDO_INSULIN", name: "Fasting Insulin", department: "Endocrinology", parameters: [ { parameter: "Insulin", unit: "µIU/mL", range: "2.6-24.9" } ] },
  { id: "ENDO_CPEP", name: "C-Peptide", department: "Endocrinology", parameters: [ { parameter: "C-Peptide", unit: "ng/mL", range: "0.8-3.1" } ] },
  { id: "ENDO_CORTISOL", name: "Cortisol (Morning)", department: "Endocrinology", parameters: [ { parameter: "Cortisol", unit: "µg/dL", range: "6.0-23.0" } ] },
  { id: "ENDO_PROLACTIN", name: "Prolactin", department: "Endocrinology", parameters: [ { parameter: "Prolactin", unit: "ng/mL", range: "Male: 2-18; Female: 2-30" } ] },
  { id: "ENDO_FSHLH", name: "FSH, LH", department: "Endocrinology", parameters: [ { parameter: "FSH", unit: "mIU/mL", range: "Male: 1.5-12.4; Female: 3.5-12.5" }, { parameter: "LH", unit: "mIU/mL", range: "Male: 1.7-8.6; Female: 2.4-12.6" } ] },
  { id: "ENDO_TESTO", name: "Testosterone", department: "Endocrinology", parameters: [ { parameter: "Testosterone", unit: "ng/dL", range: "Male: 300-1000; Female: 15-70" } ] },
  { id: "ENDO_ESTRADIOL", name: "Estradiol (E2)", department: "Endocrinology", parameters: [ { parameter: "Estradiol", unit: "pg/mL", range: "Male: 10-40; Female: 30-400" } ] },
  { id: "ENDO_PARATH", name: "Parathyroid Hormone (PTH)", department: "Endocrinology", parameters: [ { parameter: "PTH", unit: "pg/mL", range: "10-65" } ] }
];

export const coagulation = [
  { id: "COAG_PT", name: "Prothrombin Time (PT/INR)", department: "Coagulation", parameters: [ { parameter: "PT", unit: "seconds", range: "11-15" }, { parameter: "INR", unit: "-", range: "0.8-1.2" } ] },
  { id: "COAG_APTT", name: "Activated Partial Thromboplastin Time (aPTT)", department: "Coagulation", parameters: [ { parameter: "aPTT", unit: "seconds", range: "25-40" } ] },
  { id: "COAG_FIBRINOGEN", name: "Fibrinogen", department: "Coagulation", parameters: [ { parameter: "Fibrinogen", unit: "mg/dL", range: "200-400" } ] },
  { id: "COAG_DDIMER", name: "D-Dimer", department: "Coagulation", parameters: [ { parameter: "D-Dimer", unit: "ng/mL", range: "<500" } ] },
  { id: "COAG_BLEED", name: "Bleeding Time", department: "Coagulation", parameters: [ { parameter: "Bleeding Time", unit: "minutes", range: "1-7" } ] },
  { id: "COAG_CLOT", name: "Clotting Time", department: "Coagulation", parameters: [ { parameter: "Clotting Time", unit: "minutes", range: "3-10" } ] },
  { id: "COAG_FACTORVIII", name: "Factor VIII Assay", department: "Coagulation", parameters: [ { parameter: "Factor VIII", unit: "%", range: "50-150" } ] },
  { id: "COAG_FIBDEP", name: "Fibrin Degradation Products (FDP)", department: "Coagulation", parameters: [ { parameter: "FDP", unit: "µg/mL", range: "<10" } ] },
  { id: "COAG_THROMBIN", name: "Thrombin Time", department: "Coagulation", parameters: [ { parameter: "Thrombin Time", unit: "seconds", range: "14-21" } ] },
  { id: "COAG_ANTITHROMBIN", name: "Antithrombin III", department: "Coagulation", parameters: [ { parameter: "Antithrombin III", unit: "%", range: "80-120" } ] }
];

export const electrolytes = [
  { id: "ELEC_NA", name: "Sodium (Na)", department: "Electrolytes", parameters: [ { parameter: "Sodium", unit: "mmol/L", range: "135-145" } ] },
  { id: "ELEC_K", name: "Potassium (K)", department: "Electrolytes", parameters: [ { parameter: "Potassium", unit: "mmol/L", range: "3.5-5.1" } ] },
  { id: "ELEC_CL", name: "Chloride (Cl)", department: "Electrolytes", parameters: [ { parameter: "Chloride", unit: "mmol/L", range: "98-107" } ] },
  { id: "ELEC_CO2", name: "Bicarbonate (CO₂)", department: "Electrolytes", parameters: [ { parameter: "Bicarbonate", unit: "mmol/L", range: "22-29" } ] },
  { id: "ELEC_CA", name: "Calcium (Serum)", department: "Electrolytes", parameters: [ { parameter: "Calcium", unit: "mg/dL", range: "8.5-10.2" } ] },
  { id: "ELEC_MG", name: "Magnesium (Mg)", department: "Electrolytes", parameters: [ { parameter: "Magnesium", unit: "mg/dL", range: "1.7-2.4" } ] },
  { id: "ELEC_PHOS", name: "Phosphate (PO₄)", department: "Electrolytes", parameters: [ { parameter: "Phosphate", unit: "mg/dL", range: "2.5-4.5" } ] },
  { id: "ELEC_ANION", name: "Anion Gap", department: "Electrolytes", parameters: [ { parameter: "Anion Gap", unit: "mmol/L", range: "8-16" } ] },
  { id: "ELEC_OSMO", name: "Serum Osmolality", department: "Electrolytes", parameters: [ { parameter: "Osmolality", unit: "mOsm/kg", range: "275-295" } ] },
  { id: "ELEC_IONCAL", name: "Ionized Calcium", department: "Electrolytes", parameters: [ { parameter: "Ionized Calcium", unit: "mmol/L", range: "1.12-1.32" } ] }
];

export const cardiac = [
  { id: "CARD_TROPONIN", name: "Troponin I", department: "Cardiac Markers", parameters: [ { parameter: "Troponin I", unit: "ng/mL", range: "<0.04" } ] },
  { id: "CARD_TROPONINT", name: "Troponin T", department: "Cardiac Markers", parameters: [ { parameter: "Troponin T", unit: "ng/mL", range: "<0.01" } ] },
  { id: "CARD_CKMB", name: "CK-MB", department: "Cardiac Markers", parameters: [ { parameter: "CK-MB", unit: "U/L", range: "<25" } ] },
  { id: "CARD_MYOGLOBIN", name: "Myoglobin", department: "Cardiac Markers", parameters: [ { parameter: "Myoglobin", unit: "ng/mL", range: "<85" } ] },
  { id: "CARD_BNP", name: "BNP (B-type Natriuretic Peptide)", department: "Cardiac Markers", parameters: [ { parameter: "BNP", unit: "pg/mL", range: "<100" } ] },
  { id: "CARD_HSCRP", name: "High-Sensitivity CRP", department: "Cardiac Markers", parameters: [ { parameter: "hsCRP", unit: "mg/L", range: "<3" } ] },
  { id: "CARD_LPPLA2", name: "Lp-PLA2", department: "Cardiac Markers", parameters: [ { parameter: "Lp-PLA2", unit: "ng/mL", range: "<200" } ] },
  { id: "CARD_DDIMER", name: "D-Dimer (Cardiac)", department: "Cardiac Markers", parameters: [ { parameter: "D-Dimer", unit: "ng/mL", range: "<500" } ] },
  { id: "CARD_HOMOCYSTEINE", name: "Homocysteine", department: "Cardiac Markers", parameters: [ { parameter: "Homocysteine", unit: "µmol/L", range: "5-15" } ] },
  { id: "CARD_APOB", name: "Apolipoprotein B", department: "Cardiac Markers", parameters: [ { parameter: "Apo B", unit: "mg/dL", range: "<120" } ] }
];

export const tumorMarkers = [
  { id: "TUMOR_AFP", name: "Alpha-Fetoprotein (AFP)", department: "Tumor Markers", parameters: [ { parameter: "AFP", unit: "ng/mL", range: "<10" } ] },
  { id: "TUMOR_CEA", name: "Carcinoembryonic Antigen (CEA)", department: "Tumor Markers", parameters: [ { parameter: "CEA", unit: "ng/mL", range: "<3.0" } ] },
  { id: "TUMOR_CA125", name: "CA-125", department: "Tumor Markers", parameters: [ { parameter: "CA-125", unit: "U/mL", range: "<35" } ] },
  { id: "TUMOR_CA199", name: "CA 19-9", department: "Tumor Markers", parameters: [ { parameter: "CA 19-9", unit: "U/mL", range: "<37" } ] },
  { id: "TUMOR_CA153", name: "CA 15-3", department: "Tumor Markers", parameters: [ { parameter: "CA 15-3", unit: "U/mL", range: "<30" } ] },
  { id: "TUMOR_PSATOTAL", name: "PSA Total", department: "Tumor Markers", parameters: [ { parameter: "PSA Total", unit: "ng/mL", range: "<4.0" } ] },
  { id: "TUMOR_FREEPSA", name: "Free PSA", department: "Tumor Markers", parameters: [ { parameter: "Free PSA", unit: "ng/mL", range: "<0.9" } ] },
  { id: "TUMOR_BHCG", name: "Beta hCG", department: "Tumor Markers", parameters: [ { parameter: "Beta hCG", unit: "mIU/mL", range: "<5" } ] },
  { id: "TUMOR_CA724", name: "CA 72-4", department: "Tumor Markers", parameters: [ { parameter: "CA 72-4", unit: "U/mL", range: "<6.9" } ] },
  { id: "TUMOR_NSE", name: "Neuron-Specific Enolase (NSE)", department: "Tumor Markers", parameters: [ { parameter: "NSE", unit: "ng/mL", range: "<16.3" } ] }
];

export const allTestsPart2 = [
  ...endocrinology,
  ...coagulation,
  ...electrolytes,
  ...cardiac,
  ...tumorMarkers
];

export function getTestByIdPart2(id) {
  return allTestsPart2.find(t => t.id === id) || null;
}

// End of Part 2 (English only).
// ===================== PART 3 ===================== //

export const immunology = [
  {
    id: "IMM_ASO",
    name: "ASO Titre",
    department: "Immunology",
    parameters: [
      { parameter: "ASO Titre", unit: "IU/mL", range: "<200" }
    ]
  },
  {
    id: "IMM_RA",
    name: "Rheumatoid Factor",
    department: "Immunology",
    parameters: [
      { parameter: "Rheumatoid Factor", unit: "IU/mL", range: "<14" }
    ]
  },
  {
    id: "IMM_CRP",
    name: "C-Reactive Protein (CRP)",
    department: "Immunology",
    parameters: [
      { parameter: "CRP", unit: "mg/L", range: "<5" }
    ]
  },
  {
    id: "IMM_ANA",
    name: "Anti-Nuclear Antibody (ANA)",
    department: "Immunology",
    parameters: [
      { parameter: "ANA", unit: "Result", range: "Negative" }
    ]
  }
];

export const virology = [
  {
    id: "VIR_HBV",
    name: "HBsAg (Hepatitis B Surface Antigen)",
    department: "Virology",
    parameters: [
      { parameter: "HBsAg", unit: "Result", range: "Non-Reactive" }
    ]
  },
  {
    id: "VIR_HCV",
    name: "Anti-HCV",
    department: "Virology",
    parameters: [
      { parameter: "Anti-HCV", unit: "Result", range: "Non-Reactive" }
    ]
  },
  {
    id: "VIR_HIV",
    name: "HIV 1/2 Antibody",
    department: "Virology",
    parameters: [
      { parameter: "HIV 1/2", unit: "Result", range: "Non-Reactive" }
    ]
  },
  {
    id: "VIR_DENGUE",
    name: "Dengue NS1 Antigen",
    department: "Virology",
    parameters: [
      { parameter: "NS1 Antigen", unit: "Result", range: "Negative" }
    ]
  }
];

export const hormones = [
  {
    id: "HOR_TSH",
    name: "Thyroid Stimulating Hormone (TSH)",
    department: "Hormones",
    parameters: [
      { parameter: "TSH", unit: "µIU/mL", range: "0.4-4.0" }
    ]
  },
  {
    id: "HOR_T3",
    name: "Triiodothyronine (T3)",
    department: "Hormones",
    parameters: [
      { parameter: "T3", unit: "ng/dL", range: "80-200" }
    ]
  },
  {
    id: "HOR_T4",
    name: "Thyroxine (T4)",
    department: "Hormones",
    parameters: [
      { parameter: "T4", unit: "µg/dL", range: "5-12" }
    ]
  },
  {
    id: "HOR_PROL",
    name: "Prolactin",
    department: "Hormones",
    parameters: [
      { parameter: "Prolactin", unit: "ng/mL", range: "2-25" }
    ]
  }
];

export const molecularBiology = [
  {
    id: "MOL_TB",
    name: "Mycobacterium Tuberculosis PCR",
    department: "Molecular Biology",
    parameters: [
      { parameter: "MTB DNA", unit: "Result", range: "Not Detected" }
    ]
  },
  {
    id: "MOL_COVID",
    name: "COVID-19 RT-PCR",
    department: "Molecular Biology",
    parameters: [
      { parameter: "SARS-CoV-2 RNA", unit: "Result", range: "Not Detected" }
    ]
  },
  {
    id: "MOL_HPV",
    name: "HPV DNA Test",
    department: "Molecular Biology",
    parameters: [
      { parameter: "HPV DNA", unit: "Result", range: "Not Detected" }
    ]
  }
];

export const pcrSection = [
  {
    id: "PCR_HBV",
    name: "HBV DNA Quantitative PCR",
    department: "PCR Section",
    parameters: [
      { parameter: "HBV DNA", unit: "IU/mL", range: "<10" }
    ]
  },
  {
    id: "PCR_HCV",
    name: "HCV RNA Quantitative PCR",
    department: "PCR Section",
    parameters: [
      { parameter: "HCV RNA", unit: "IU/mL", range: "<15" }
    ]
  },
  {
    id: "PCR_HIV",
    name: "HIV RNA Quantitative PCR",
    department: "PCR Section",
    parameters: [
      { parameter: "HIV RNA", unit: "copies/mL", range: "<20" }
    ]
  }
];

export const allTestsPart3 = [
  ...immunology,
  ...virology,
  ...hormones,
  ...molecularBiology,
  ...pcrSection
];
// ===================== PART 4 ===================== //

export const cytology = [
  {
    id: "CYT_PAP",
    name: "Pap Smear Test",
    department: "Cytology",
    parameters: [
      { parameter: "Epithelial Cells", unit: "Result", range: "Normal" },
      { parameter: "Inflammatory Cells", unit: "Result", range: "Absent" }
    ]
  },
  {
    id: "CYT_FLUID",
    name: "Body Fluid Cytology",
    department: "Cytology",
    parameters: [
      { parameter: "Cell Type", unit: "Result", range: "Normal Cells" },
      { parameter: "Malignant Cells", unit: "Result", range: "Absent" }
    ]
  }
];

export const histopathology = [
  {
    id: "HIST_BIOPSY",
    name: "Biopsy Examination",
    department: "Histopathology",
    parameters: [
      { parameter: "Tissue Type", unit: "Result", range: "Benign/Malignant" },
      { parameter: "Diagnosis", unit: "Result", range: "As Reported" }
    ]
  },
  {
    id: "HIST_FROZEN",
    name: "Frozen Section",
    department: "Histopathology",
    parameters: [
      { parameter: "Microscopy", unit: "Result", range: "As Reported" }
    ]
  }
];

export const clinicalChemistry = [
  {
    id: "CHEM_GLU",
    name: "Glucose Fasting",
    department: "Clinical Chemistry",
    parameters: [
      { parameter: "Glucose (Fasting)", unit: "mg/dL", range: "70-110" }
    ]
  },
  {
    id: "CHEM_BUN",
    name: "Blood Urea Nitrogen (BUN)",
    department: "Clinical Chemistry",
    parameters: [
      { parameter: "BUN", unit: "mg/dL", range: "7-20" }
    ]
  },
  {
    id: "CHEM_URIC",
    name: "Uric Acid",
    department: "Clinical Chemistry",
    parameters: [
      { parameter: "Uric Acid", unit: "mg/dL", range: "3.4-7.0" }
    ]
  }
];

export const parasitology = [
  {
    id: "PARA_MALARIA",
    name: "Malaria Parasite (MP Test)",
    department: "Parasitology",
    parameters: [
      { parameter: "MP Smear", unit: "Result", range: "Negative" }
    ]
  },
  {
    id: "PARA_FILARIA",
    name: "Filaria Parasite Test",
    department: "Parasitology",
    parameters: [
      { parameter: "Filaria", unit: "Result", range: "Negative" }
    ]
  }
];

export const toxicology = [
  {
    id: "TOX_ALCOHOL",
    name: "Blood Alcohol Level",
    department: "Toxicology",
    parameters: [
      { parameter: "Ethanol", unit: "mg/dL", range: "<10" }
    ]
  },
  {
    id: "TOX_LEAD",
    name: "Blood Lead Level",
    department: "Toxicology",
    parameters: [
      { parameter: "Lead", unit: "µg/dL", range: "<10" }
    ]
  },
  {
    id: "TOX_MERCURY",
    name: "Mercury Level",
    department: "Toxicology",
    parameters: [
      { parameter: "Mercury", unit: "µg/L", range: "<5" }
    ]
  }
];

export const allTestsPart4 = [
  ...cytology,
  ...histopathology,
  ...clinicalChemistry,
  ...parasitology,
  ...toxicology
];
// ===================== PART 5 ===================== //

export const bloodBank = [
  {
    id: "BB_BLOODGROUP",
    name: "Blood Grouping & Rh Typing",
    department: "Blood Bank",
    parameters: [
      { parameter: "ABO Group", unit: "Result", range: "A/B/AB/O" },
      { parameter: "Rh Factor", unit: "Result", range: "+ve/-ve" }
    ]
  },
  {
    id: "BB_CROSS",
    name: "Cross Match",
    department: "Blood Bank",
    parameters: [
      { parameter: "Cross Match", unit: "Result", range: "Compatible" }
    ]
  },
  {
    id: "BB_SCREEN",
    name: "Antibody Screening",
    department: "Blood Bank",
    parameters: [
      { parameter: "Antibodies", unit: "Result", range: "Negative" }
    ]
  }
];

export const sampling = [
  {
    id: "SMP_VENIPUNCTURE",
    name: "Venipuncture Sample Collection",
    department: "Sampling",
    parameters: [
      { parameter: "Sample Type", unit: "", range: "Blood" },
      { parameter: "Tube Type", unit: "", range: "EDTA/Serum" }
    ]
  },
  {
    id: "SMP_URINE",
    name: "Urine Sample Collection",
    department: "Sampling",
    parameters: [
      { parameter: "Sample Type", unit: "", range: "Urine (Midstream)" }
    ]
  }
];

export const infectiousDiseases = [
  {
    id: "INF_TB",
    name: "Tuberculosis (AFB Smear)",
    department: "Infectious Diseases",
    parameters: [
      { parameter: "AFB Smear", unit: "Result", range: "Negative" }
    ]
  },
  {
    id: "INF_MALARIA",
    name: "Malaria Antigen Test",
    department: "Infectious Diseases",
    parameters: [
      { parameter: "Malaria Antigen", unit: "Result", range: "Negative" }
    ]
  },
  {
    id: "INF_TYPHOID",
    name: "Typhidot IgM/IgG",
    department: "Infectious Diseases",
    parameters: [
      { parameter: "Typhidot IgM", unit: "Result", range: "Negative" },
      { parameter: "Typhidot IgG", unit: "Result", range: "Negative" }
    ]
  }
];

export const nutrition = [
  {
    id: "NUT_VITD",
    name: "Vitamin D (25-OH)",
    department: "Nutrition",
    parameters: [
      { parameter: "Vitamin D", unit: "ng/mL", range: "30-100" }
    ]
  },
  {
    id: "NUT_VITB12",
    name: "Vitamin B12",
    department: "Nutrition",
    parameters: [
      { parameter: "Vitamin B12", unit: "pg/mL", range: "200-900" }
    ]
  },
  {
    id: "NUT_FOLATE",
    name: "Serum Folate",
    department: "Nutrition",
    parameters: [
      { parameter: "Folate", unit: "ng/mL", range: "3-17" }
    ]
  }
];

export const miscellaneous = [
  {
    id: "MISC_CRPHS",
    name: "High Sensitivity CRP",
    department: "Miscellaneous",
    parameters: [
      { parameter: "hs-CRP", unit: "mg/L", range: "<3" }
    ]
  },
  {
    id: "MISC_DDIMER",
    name: "D-Dimer",
    department: "Miscellaneous",
    parameters: [
      { parameter: "D-Dimer", unit: "ng/mL", range: "<500" }
    ]
  },
  {
    id: "MISC_PROCAL",
    name: "Procalcitonin",
    department: "Miscellaneous",
    parameters: [
      { parameter: "Procalcitonin", unit: "ng/mL", range: "<0.1" }
    ]
  }
];

export const allTestsPart5 = [
  ...bloodBank,
  ...sampling,
  ...infectiousDiseases,
  ...nutrition,
  ...miscellaneous
];
// ===================== PART 6 ===================== //

export const radiologyInterface = [
  {
    id: "RAD_XRAYCHEST",
    name: "X-Ray Chest PA View",
    department: "Radiology Interface",
    parameters: [
      { parameter: "Film Quality", unit: "Result", range: "Acceptable" },
      { parameter: "Findings", unit: "Result", range: "As Reported" }
    ]
  },
  {
    id: "RAD_ULTRASOUND",
    name: "Abdominal Ultrasound",
    department: "Radiology Interface",
    parameters: [
      { parameter: "Liver", unit: "Result", range: "Normal Size" },
      { parameter: "Kidneys", unit: "Result", range: "Normal" }
    ]
  }
];

export const qualityControl = [
  {
    id: "QC_INTERNAL",
    name: "Internal Quality Control",
    department: "Quality Control",
    parameters: [
      { parameter: "Accuracy", unit: "%", range: ">95" },
      { parameter: "Precision", unit: "%", range: ">90" }
    ]
  },
  {
    id: "QC_EXTERNAL",
    name: "External Quality Assessment (EQA)",
    department: "Quality Control",
    parameters: [
      { parameter: "Performance", unit: "%", range: ">90" }
    ]
  }
];

export const wasteManagement = [
  {
    id: "WM_BIO",
    name: "Biomedical Waste Disposal",
    department: "Waste Management",
    parameters: [
      { parameter: "Sharps Disposal", unit: "Status", range: "Properly Sealed" },
      { parameter: "Biohazard Bags", unit: "Status", range: "Labeled & Segregated" }
    ]
  },
  {
    id: "WM_CHEM",
    name: "Chemical Waste Handling",
    department: "Waste Management",
    parameters: [
      { parameter: "Neutralization", unit: "Status", range: "Completed" }
    ]
  }
];

export const environmental = [
  {
    id: "ENV_AIR",
    name: "Air Quality Test",
    department: "Environmental Monitoring",
    parameters: [
      { parameter: "Particulate Matter (PM2.5)", unit: "µg/m³", range: "<25" },
      { parameter: "CO₂ Level", unit: "ppm", range: "<1000" }
    ]
  },
  {
    id: "ENV_WATER",
    name: "Water Quality Test",
    department: "Environmental Monitoring",
    parameters: [
      { parameter: "pH", unit: "", range: "6.5-8.5" },
      { parameter: "TDS", unit: "ppm", range: "<500" }
    ]
  }
];

export const researchDevelopment = [
  {
    id: "RES_PROTOCOL",
    name: "New Test Protocol Validation",
    department: "Research & Development",
    parameters: [
      { parameter: "Validation Status", unit: "Result", range: "Approved" }
    ]
  },
  {
    id: "RES_PILOT",
    name: "Pilot Study Sample Analysis",
    department: "Research & Development",
    parameters: [
      { parameter: "Samples Tested", unit: "Count", range: ">10" }
    ]
  }
];

export const allTestsPart6 = [
  ...radiologyInterface,
  ...qualityControl,
  ...wasteManagement,
  ...environmental,
  ...researchDevelopment
];
