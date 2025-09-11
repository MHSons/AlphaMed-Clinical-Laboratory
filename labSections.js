const labTests = {
  "Hematology": [
    { name: "CBC" }, { name: "Hemoglobin" }, { name: "RBC Count" }, { name: "WBC Count" }, { name: "Platelet Count" },
    { name: "ESR" }, { name: "PCV" }, { name: "MCV" }, { name: "MCH" }, { name: "MCHC" },
    { name: "Peripheral Smear" }, { name: "Reticulocyte Count" }, { name: "Bleeding Time" }, { name: "Clotting Time" }, { name: "Prothrombin Time" },
    { name: "APTT" }, { name: "D-Dimer" }, { name: "Fibrinogen" }, { name: "Leukocyte Alkaline Phosphatase" }, { name: "Bone Marrow Aspiration" },
    { name: "Hemoglobin Electrophoresis" }, { name: "Coombs Test (Direct)" }, { name: "Coombs Test (Indirect)" }, { name: "Iron Studies" }, { name: "Serum Ferritin" },
    { name: "Vitamin B12" }, { name: "Folate" }, { name: "Blood Grouping" }, { name: "Cross Matching" }, { name: "G6PD Screening" }
  ],

  "Serology": [
    { name: "Widal Test" }, { name: "CRP" }, { name: "Rheumatoid Factor (RA)" }, { name: "ASO Titer" }, { name: "Anti-HCV" },
    { name: "HBsAg" }, { name: "HIV I/II" }, { name: "VDRL" }, { name: "TPHA" }, { name: "Toxoplasma IgG" },
    { name: "Toxoplasma IgM" }, { name: "Rubella IgG" }, { name: "Rubella IgM" }, { name: "CMV IgG" }, { name: "CMV IgM" },
    { name: "Typhidot" }, { name: "Anti Streptolysin O" }, { name: "Anti CCP" }, { name: "Brucella Test" }, { name: "Dengue NS1" },
    { name: "Dengue IgM" }, { name: "Dengue IgG" }, { name: "Leptospira" }, { name: "ANA" }, { name: "Anti-dsDNA" },
    { name: "H. Pylori IgG" }, { name: "H. Pylori IgM" }, { name: "HCV RNA" }, { name: "HBV DNA" }, { name: "TORCH Panel" }
  ],

  "Microbiology": [
    { name: "Urine Culture" }, { name: "Blood Culture" }, { name: "Throat Swab Culture" }, { name: "Sputum Culture" }, { name: "Wound Swab Culture" },
    { name: "Stool Culture" }, { name: "CSF Culture" }, { name: "Pus Culture" }, { name: "AFB Culture" }, { name: "Fungal Culture" },
    { name: "Nasal Swab Culture" }, { name: "Pleural Fluid Culture" }, { name: "Ascitic Fluid Culture" }, { name: "Genital Swab Culture" }, { name: "Mycobacterium Culture" },
    { name: "Blood for Fungal Culture" }, { name: "H. influenzae Culture" }, { name: "E. coli Identification" }, { name: "S. aureus Identification" }, { name: "Pseudomonas Identification" },
    { name: "Klebsiella Identification" }, { name: "Salmonella Identification" }, { name: "Antibiotic Sensitivity" }, { name: "ESBL Detection" }, { name: "MRSA Screening" },
    { name: "Carbapenem Resistance" }, { name: "Enterococcus Identification" }, { name: "Candida Identification" }, { name: "Yeast Culture" }, { name: "Biofilm Formation Test" }
  ],

  "Histopathology": [
    { name: "Biopsy" }, { name: "Skin Biopsy" }, { name: "Liver Biopsy" }, { name: "Renal Biopsy" }, { name: "Lymph Node Biopsy" },
    { name: "Endometrial Biopsy" }, { name: "Breast Lump Biopsy" }, { name: "Bone Marrow Biopsy" }, { name: "Tumor Biopsy" }, { name: "Thyroid Biopsy" },
    { name: "Prostate Biopsy" }, { name: "Muscle Biopsy" }, { name: "GI Tract Biopsy" }, { name: "Urinary Bladder Biopsy" }, { name: "Bone Biopsy" },
    { name: "Appendix Histology" }, { name: "Colon Biopsy" }, { name: "Cervix Biopsy" }, { name: "Ovary Biopsy" }, { name: "Pancreatic Tissue Biopsy" },
    { name: "Nerve Biopsy" }, { name: "Soft Tissue Tumor" }, { name: "Spleen Biopsy" }, { name: "Pituitary Gland Biopsy" }, { name: "Adrenal Gland Biopsy" },
    { name: "Stomach Biopsy" }, { name: "Eye Tissue Biopsy" }, { name: "Tongue Biopsy" }, { name: "Testicular Biopsy" }, { name: "Vaginal Wall Biopsy" }
  ],

  "Biochemistry": [
    { name: "Blood Glucose (Fasting)" }, { name: "Blood Glucose (Random)" }, { name: "HbA1c" }, { name: "Serum Urea" }, { name: "Serum Creatinine" },
    { name: "Uric Acid" }, { name: "Lipid Profile" }, { name: "Cholesterol" }, { name: "Triglycerides" }, { name: "HDL" },
    { name: "LDL" }, { name: "VLDL" }, { name: "Liver Function Test (LFT)" }, { name: "ALT (SGPT)" }, { name: "AST (SGOT)" },
    { name: "ALP" }, { name: "Bilirubin" }, { name: "Total Protein" }, { name: "Albumin" }, { name: "Globulin" },
    { name: "Electrolytes (Na, K, Cl)" }, { name: "Calcium" }, { name: "Phosphorus" }, { name: "Magnesium" }, { name: "Amylase" },
    { name: "Lipase" }, { name: "Iron" }, { name: "TIBC" }, { name: "LDH" }, { name: "CK-MB" }
  ],

  "Blood Banking": [
    { name: "Blood Grouping" }, { name: "Rh Typing" }, { name: "Cross Match (Major)" }, { name: "Cross Match (Minor)" }, { name: "Coombs Test (Direct)" },
    { name: "Coombs Test (Indirect)" }, { name: "Antibody Screening" }, { name: "Antibody Identification" }, { name: "Packed RBC Compatibility" }, { name: "Platelet Compatibility" },
    { name: "Plasma Compatibility" }, { name: "Cryoprecipitate Compatibility" }, { name: "Blood Component Separation" }, { name: "Fresh Frozen Plasma (FFP)" }, { name: "Single Donor Platelets (SDP)" },
    { name: "Random Donor Platelets (RDP)" }, { name: "Whole Blood Collection" }, { name: "Donor Screening" }, { name: "Infectious Marker Screening" }, { name: "Hemolysin Test" },
    { name: "LISS Crossmatch" }, { name: "Saline Crossmatch" }, { name: "Enzyme Treated Cells" }, { name: "Cold Agglutinin" }, { name: "Blood Transfusion Reaction Workup" },
    { name: "DAT" }, { name: "IAT" }, { name: "Du Test" }, { name: "Rosette Test" }, { name: "Kleihauer-Betke Test" }
  ],

  "Culture Tests": [
    { name: "Urine Culture" }, { name: "Blood Culture" }, { name: "Stool Culture" }, { name: "Sputum Culture" }, { name: "Wound Swab Culture" },
    { name: "CSF Culture" }, { name: "Throat Swab Culture" }, { name: "Genital Swab Culture" }, { name: "Eye Swab Culture" }, { name: "Ear Swab Culture" },
    { name: "Pus Culture" }, { name: "Catheter Tip Culture" }, { name: "Pleural Fluid Culture" }, { name: "Ascitic Fluid Culture" }, { name: "Bile Culture" },
    { name: "Synovial Fluid Culture" }, { name: "Skin Swab Culture" }, { name: "Nasal Swab Culture" }, { name: "Vaginal Swab Culture" }, { name: "Rectal Swab Culture" },
    { name: "AFB Culture" }, { name: "Fungal Culture" }, { name: "Anaerobic Culture" }, { name: "Aerobic Culture" }, { name: "Environmental Culture" },
    { name: "Tissue Culture" }, { name: "Surface Swab Culture" }, { name: "Intraoperative Culture" }, { name: "Dental Swab Culture" }, { name: "Sterility Culture" }
  ],

  "Special Chemistry": [
    { name: "T3" }, { name: "T4" }, { name: "TSH" }, { name: "Free T3" }, { name: "Free T4" },
    { name: "Insulin" }, { name: "C-Peptide" }, { name: "Growth Hormone" }, { name: "Cortisol" }, { name: "ACTH" },
    { name: "Prolactin" }, { name: "LH" }, { name: "FSH" }, { name: "Testosterone" }, { name: "Estrogen" },
    { name: "Progesterone" }, { name: "PTH" }, { name: "Vitamin D" }, { name: "Beta HCG" }, { name: "CEA" },
    { name: "AFP" }, { name: "CA-125" }, { name: "CA 19-9" }, { name: "CA 15-3" }, { name: "PSA" },
    { name: "Free PSA" }, { name: "Ammonia" }, { name: "Homocysteine" }, { name: "Ceruloplasmin" }, { name: "Alpha-1 Antitrypsin" }
  ],

  "Molecular Biology": [
    { name: "PCR for HCV" }, { name: "PCR for HBV" }, { name: "COVID-19 PCR" }, { name: "HIV RNA PCR" }, { name: "CMV DNA PCR" },
    { name: "EBV DNA PCR" }, { name: "Mycobacterium TB PCR" }, { name: "HPV DNA Test" }, { name: "Chlamydia PCR" }, { name: "Gonorrhea PCR" },
    { name: "BRCA1/BRCA2" }, { name: "Factor V Leiden" }, { name: "JAK2 Mutation" }, { name: "BCR-ABL" }, { name: "KRAS Mutation" },
    { name: "EGFR Mutation" }, { name: "NRAS Mutation" }, { name: "Thalassemia Mutation" }, { name: "DMD Gene Test" }, { name: "CFTR Gene Test" },
    { name: "HLA Typing" }, { name: "Gene Rearrangement" }, { name: "Multiplex PCR" }, { name: "Real-Time PCR" }, { name: "RT-PCR" },
    { name: "cDNA Synthesis" }, { name: "Sanger Sequencing" }, { name: "Next Generation Sequencing (NGS)" }, { name: "MLPA" }, { name: "Gene Fusion Detection" }
  ]
};
