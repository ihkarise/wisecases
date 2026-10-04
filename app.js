/**
 * ============================================================================
 * WiseCases — Progressive Clinical Diagnosis Engine
 * WiseAiTechs — For All Medicos
 * ============================================================================
 * 
 * Standalone Client-Side Application
 * - Zero external server/backend dependencies
 * - High-yield progressive clinical reasoning game loop
 * - LocalStorage persistence for curriculum & user result history
 * - Full JSON import/export and Admin Studio
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONFIGURATION SYSTEM
  // ==========================================================================
  // Prefer config.js (and any saved Settings override it already applied).
  const WISECASES_CONFIG = (typeof window !== 'undefined' && window.WISECASES_CONFIG)
    ? window.WISECASES_CONFIG
    : {
        mode: "local", // "local" | "google"
        googleAppsScript: {
          enabled: false,
          baseUrl: ""
        }
      };

  // ==========================================================================
  // 1. DEFAULT SEED CLINICAL CASES (Embedded fallback for 100% offline & file://)
  // ==========================================================================
  const DEFAULT_SEED_CASES = [
  {
    "id": "CASE-001",
    "title": "Decompensated Alcoholic Liver Disease",
    "category": "Medicine",
    "subcategory": "Gastroenterology / Hepatology",
    "difficulty": "Progressive",
    "settings": {
      "startingLives": 5,
      "lifeLossPerWrongAnswer": 1,
      "showNextClueAfterWrong": true,
      "showAnswerAfterLivesZero": true,
      "startingScore": 1000,
      "wrongAnswerScorePenalty": 100
    },
    "patient": {
      "age": "48",
      "sex": "Male",
      "summary": "Presents with acute lower limb pain and severe difficulty ambulating; history of frequent medical non-compliance."
    },
    "stages": [
      {
        "stage": 1,
        "title": "The Chief Complaint",
        "clue": "A patient presents with recurrent, severe lower limb distress. The pain is so acute that the patient is entirely unable to place his foot on the ground or walk. A review of his history reveals a massive challenge with compliance; the patient is known to abandon all medical protocols strictly after a maximum of two months."
      },
      {
        "stage": 2,
        "title": "The Acute Presentation",
        "clue": "Physical examination of the affected limb reveals active lymphangitis and cellulitis. The patient is admitted as an In-Patient (IP) to manage the spreading infection and accompanying fever."
      },
      {
        "stage": 3,
        "title": "The Ward Crisis",
        "clue": "By the next day, the patient's condition rapidly deteriorates on the ward. The clinical picture shifts from a localized infection to a systemic crisis. The patient becomes highly disoriented and violently agitated. Stat labs reveal a severe sodium-potassium imbalance driving this sudden neurological and behavioral shift."
      },
      {
        "stage": 4,
        "title": "The Systemic Clues",
        "clue": "The severe electrolyte derangement and sudden disorientation in the presence of an infection suggest a compromised primary organ system unable to maintain metabolic homeostasis. Further abdominal examination and imaging reveal the presence of ascites and splenomegaly."
      },
      {
        "stage": 5,
        "title": "The Underlying Etiology",
        "clue": "The two-month limit on his medical compliance is directly tied to an addiction. After this brief period of sobriety and treatment adherence, he inevitably relapses into heavy alcohol consumption."
      }
    ],
    "diagnosis": {
      "correctAnswer": "Decompensated Alcoholic Liver Disease (Chronic Liver Disease)",
      "acceptedAnswers": [
        "Decompensated Alcoholic Liver Disease",
        "Decompensated alcoholic liver disease",
        "Alcoholic liver disease",
        "Decompensated chronic liver disease due to alcohol",
        "Decompensated Chronic Liver Disease",
        "Decompensated liver disease",
        "Alcoholic liver cirrhosis",
        "Alcoholic cirrhosis",
        "Hepatic encephalopathy secondary to decompensated liver disease",
        "Decompensated ALD",
        "ALD",
        "DCLD"
      ]
    },
    "explanation": {
      "clinicalSummary": "The patient's baseline compromised liver function (evidenced by ascites and splenomegaly) was pushed into acute decompensation by the systemic stress of the lymphangitis. This infection triggered a cascade leading to electrolyte imbalance and acute hepatic encephalopathy, manifesting as violent disorientation on the ward.",
      "reasoning": "In chronic compensated liver disease, patients frequently maintain a fragile equilibrium. Here, soft tissue infection (cellulitis/lymphangitis) acted as an acute 'second hit' stressor, producing cytokine storm, dehydration, and electrolyte disturbances (hyponatremia, hypokalemia). In a patient with underlying portal hypertension (splenomegaly, ascites), impaired hepatic detoxification and altered blood-brain barrier permeability led to rapid precipitous hepatic encephalopathy and acute-on-chronic decompensation. The recurring two-month relapse cycle aligns with substance use disorder (alcohol dependence), which explains both the chronic underlying cirrhosis and periodic treatment abandonment.",
      "learningPoints": [
        "Always search for an acute precipitating trigger (such as sepsis, GI bleed, or electrolyte disturbance) when a stable cirrhotic patient abruptly decompensates.",
        "Cellulitis and soft tissue infections are common bacterial triggers for acute hepatic encephalopathy and acute-on-chronic liver failure (ACLF).",
        "Ascites and splenomegaly are hallmark clinical and imaging signs of clinically significant portal hypertension.",
        "Frequent cyclical medical abandonment every few months is a classic behavioral hallmark of cyclical addiction and sobriety relapse.",
        "Management requires simultaneous treatment of the precipitant (IV antibiotics for cellulitis) and targeted reversal of encephalopathy (lactulose, rifaximin, electrolyte correction)."
      ]
    },
    "references": [
      {
        "title": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis",
        "url": "https://www.easl.eu/guidelines"
      },
      {
        "title": "AASLD Practice Guidance: Diagnosis and Management of Acute Decompensation and Frailty in Cirrhosis",
        "url": "https://www.aasld.org"
      }
    ],
    "status": "Published"
  },
  {
    "id": "CASE-002",
    "title": "Acute Inferior Wall ST-Elevation Myocardial Infarction",
    "category": "Medicine",
    "subcategory": "Cardiology / Critical Care",
    "difficulty": "Progressive",
    "settings": {
      "startingLives": 5,
      "lifeLossPerWrongAnswer": 1,
      "showNextClueAfterWrong": true,
      "showAnswerAfterLivesZero": true,
      "startingScore": 1000,
      "wrongAnswerScorePenalty": 100
    },
    "patient": {
      "age": "56",
      "sex": "Male",
      "summary": "Presents to the triage bay with severe diaphoresis, sudden epigastric distress, and persistent nausea."
    },
    "stages": [
      {
        "stage": 1,
        "title": "Atypical Gastrointestinal Symptoms",
        "clue": "A 56-year-old male arrives at the Emergency Department complaining of sudden-onset, crushing substernal and epigastric discomfort accompanied by drenching diaphoresis and profuse vomiting. He initially assumed he had acute food poisoning after dinner."
      },
      {
        "stage": 2,
        "title": "Autonomic Instability & Hemodynamics",
        "clue": "Physical exam reveals pale, clammy skin. Vital signs show Blood Pressure 92/58 mmHg, Heart Rate 46 bpm (marked bradycardia), and Respiratory Rate 22/min. Auscultation reveals clear lung fields bilaterally without crackles or wheezes."
      },
      {
        "stage": 3,
        "title": "The Diagnostic Electrocardiogram",
        "clue": "A 12-lead ECG is immediately recorded. It demonstrates marked ST-segment elevations (≥ 2 mm) in leads II, III, and aVF, with reciprocal ST depressions in leads I and aVL. The rhythm strip confirms high-degree atrioventricular (AV) conduction delay."
      },
      {
        "stage": 4,
        "title": "Coronary Territory & Right Ventricular Involvement",
        "clue": "Administration of sublingual nitroglycerin leads to an immediate precipitous drop in blood pressure down to 74/46 mmHg. Right-sided chest leads (V4R) confirm concurrent right ventricular involvement, explaining the profound preload sensitivity."
      },
      {
        "stage": 5,
        "title": "Vascular Culprit & Urgent Catheterization",
        "clue": "Emergency coronary angiography identifies a 100% thrombotic occlusion of the dominant Right Coronary Artery (RCA) supplying both the inferior myocardial wall and the AV node."
      }
    ],
    "diagnosis": {
      "correctAnswer": "Acute Inferior Wall ST-Elevation Myocardial Infarction",
      "acceptedAnswers": [
        "Acute Inferior Wall ST-Elevation Myocardial Infarction",
        "Inferior STEMI",
        "Inferior wall myocardial infarction",
        "Acute Inferior Myocardial Infarction",
        "Inferior STEMI with Right Ventricular Infarction",
        "Acute ST-Elevation Myocardial Infarction",
        "STEMI",
        "Inferior Myocardial Infarction"
      ]
    },
    "explanation": {
      "clinicalSummary": "The patient experienced an acute inferior wall ST-elevation myocardial infarction (STEMI) secondary to acute occlusion of the dominant Right Coronary Artery (RCA). Concomitant right ventricular infarction produced severe preload dependence, causing profound hypotension upon nitroglycerin administration, while AV nodal ischemia generated severe sinus bradycardia and heart block.",
      "reasoning": "Inferior myocardial infarctions frequently present with vagal signs (epigastric distress, nausea, diaphoresis) mimicking gastrointestinal pathology. ECG leads II, III, and aVF directly face the inferior diaphragmatic surface of the left ventricle. Because the RCA supplies both the inferior wall and the AV node in ~90% of individuals (right dominant), ischemia induces high-grade AV block. Furthermore, right ventricular involvement impairs pulmonary transit and left-ventricular preload; thus, venodilators like nitrates cause catastrophic hypotension and are strictly contraindicated.",
      "learningPoints": [
        "Any patient presenting with epigastric distress and autonomic symptoms (diaphoresis, vomiting) must receive an immediate 12-lead ECG within 10 minutes.",
        "ST-segment elevation in leads II, III, and aVF with reciprocal depressions in leads I and aVL defines an acute inferior STEMI.",
        "Always record right-sided leads (V4R) in inferior STEMIs to identify right ventricular infarction.",
        "Nitrates and diuretics reduce preload and are dangerous in right ventricular infarction; management mandates aggressive volume resuscitation (IV normal saline) and immediate reperfusion."
      ]
    },
    "references": [
      {
        "title": "AHA/ACC Clinical Guidelines for the Management of ST-Elevation Myocardial Infarction",
        "url": "https://www.ahajournals.org"
      },
      {
        "title": "ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation",
        "url": "https://www.escardio.org"
      }
    ],
    "status": "Published"
  },
  {
    "id": "CASE-003",
    "title": "Tension Pneumothorax",
    "category": "Surgery",
    "subcategory": "Emergency Medicine / Trauma",
    "difficulty": "Progressive",
    "settings": {
      "startingLives": 5,
      "lifeLossPerWrongAnswer": 1,
      "showNextClueAfterWrong": true,
      "showAnswerAfterLivesZero": true,
      "startingScore": 1000,
      "wrongAnswerScorePenalty": 100
    },
    "patient": {
      "age": "24",
      "sex": "Male",
      "summary": "Brought by emergency medical services following high-speed blunt thoracic trauma with rapidly escalating respiratory distress."
    },
    "stages": [
      {
        "stage": 1,
        "title": "The Trauma Resuscitation Bay",
        "clue": "A 24-year-old tall, athletic male is rushed into the resuscitation room following a motor vehicle collision. He is gasping for air, tachypneic at 36 breaths per minute, cyanotic around the lips, and visibly panicked."
      },
      {
        "stage": 2,
        "title": "Thoracic Auscultation & Asymmetry",
        "clue": "Inspection demonstrates hyper-expansion of the right hemithorax with absent chest wall excursion during breathing. On auscultation, breath sounds are completely absent on the entire right side, while marked hyperresonance is elicited upon percussion over the right hemithorax."
      },
      {
        "stage": 3,
        "title": "Hemodynamic Collapse & Physical Signs",
        "clue": "The patient suddenly develops severe hypotension (70/40 mmHg) and extreme tachycardia (144 bpm). Bedside inspection reveals significantly engorged external jugular veins (distended neck veins) and visible anatomical deviation of the trachea toward the left contralateral side."
      },
      {
        "stage": 4,
        "title": "The One-Way Valve Mechanism",
        "clue": "High intrathoracic pressure is acting as a one-way ball-valve, trapping inspired air inside the pleural space, kinking the superior and inferior vena cava, and arresting venous return to the heart. Immediate emergency needle decompression is required prior to any imaging."
      }
    ],
    "diagnosis": {
      "correctAnswer": "Tension Pneumothorax",
      "acceptedAnswers": [
        "Tension Pneumothorax",
        "Tension pneumothorax",
        "Right tension pneumothorax",
        "Right-sided tension pneumothorax",
        "Pneumothorax"
      ]
    },
    "explanation": {
      "clinicalSummary": "The patient suffered a life-threatening right-sided tension pneumothorax following blunt chest trauma. Progressive one-way accumulation of air in the pleural space shifted the mediastinum and trachea to the contralateral side, compressed the vena cava, eradicated venous return, and produced immediate obstructive shock.",
      "reasoning": "A tension pneumothorax is a true clinical diagnosis that must NEVER wait for chest X-ray confirmation. The classic triad of absent unilateral breath sounds with hyperresonance, tracheal deviation away from the affected side, and distended neck veins with severe hypotension signifies obstructive shock from massive intrathoracic positive pressure compressing the great veins. Immediate needle thoracostomy followed by tube thoracostomy (chest tube) instantly decompresses the pleural cavity and restores cardiac preload.",
      "learningPoints": [
        "Tension pneumothorax is a purely clinical diagnosis; waiting for a chest X-ray in an unstable patient is a catastrophic medical error.",
        "Distended neck veins (elevated JVP) combined with hypotension and absent breath sounds indicate obstructive shock.",
        "Immediate intervention is needle decompression (at the 2nd intercostal space midclavicular line or 4th/5th intercostal space anterior axillary line) followed immediately by tube thoracostomy."
      ]
    },
    "references": [
      {
        "title": "Advanced Trauma Life Support (ATLS) - American College of Surgeons",
        "url": "https://www.facs.org/quality-programs/trauma/education/atls/"
      }
    ],
    "status": "Published"
  },
  {
    "id": "CASE-004",
    "title": "Acute Appendicitis with Localized Peritonitis",
    "category": "Surgery",
    "subcategory": "Pediatric & General Surgery",
    "difficulty": "Progressive",
    "settings": {
      "startingLives": 5,
      "lifeLossPerWrongAnswer": 1,
      "showNextClueAfterWrong": true,
      "showAnswerAfterLivesZero": true,
      "startingScore": 1000,
      "wrongAnswerScorePenalty": 100
    },
    "patient": {
      "age": "19",
      "sex": "Female",
      "summary": "University student presenting with progressive abdominal pain that migrated over 24 hours, associated with anorexia and low-grade pyrexia."
    },
    "stages": [
      {
        "stage": 1,
        "title": "Vague Mid-Abdominal Distress",
        "clue": "A 19-year-old female presents with dull, poorly localized aching periumbilical abdominal pain that began 18 hours ago. She reports complete loss of appetite (anorexia) and felt mildly nauseated throughout the night."
      },
      {
        "stage": 2,
        "title": "Pain Migration & Focal Localization",
        "clue": "Over the past 6 hours, the nature of the pain changed dramatically: it shifted from dull periumbilical ache to sharp, intense, highly localized pain in the Right Lower Quadrant (RLQ). Every bump in the road during her transit to the clinic produced unbearable agony."
      },
      {
        "stage": 3,
        "title": "Peritoneal Irritation Signs",
        "clue": "Physical examination reveals maximum tenderness at McBurney's point. Palpation of the left lower quadrant causes referred sharp pain in the right lower quadrant (positive Rovsing sign). Marked involuntary guarding and rebound tenderness are elicited."
      },
      {
        "stage": 4,
        "title": "Inflammatory Biomarkers & Retrocecal Signs",
        "clue": "Blood testing demonstrates leukocytosis of 15,200/uL with 86% neutrophilia and elevated C-Reactive Protein (CRP). Passive extension of the right hip elicits severe lower abdominal pain (positive Psoas sign)."
      },
      {
        "stage": 5,
        "title": "Ultrasound Demonstration of Luminal Obstruction",
        "clue": "Point-of-care abdominal ultrasound identifies a non-compressible, blind-ending tubular structure in the right iliac fossa measuring 8.5 mm in outer diameter with a calcified appendicolith at its base and surrounding free fluid."
      }
    ],
    "diagnosis": {
      "correctAnswer": "Acute Appendicitis with Localized Peritonitis",
      "acceptedAnswers": [
        "Acute Appendicitis",
        "Appendicitis",
        "Acute appendicitis with peritonitis",
        "Acute appendicitis",
        "Ruptured appendicitis",
        "Perforated appendicitis"
      ]
    },
    "explanation": {
      "clinicalSummary": "The patient presented with classic acute appendicitis that evolved from early visceral visceral pain (periumbilical via T10 sympathetic innervation) to sharp parietal somatic peritoneal irritation (localized to McBurney's point in the right lower quadrant) following luminal obstruction by an appendicolith.",
      "reasoning": "Obstruction of the appendiceal lumen (commonly by a fecalith/appendicolith or lymphoid hyperplasia) leads to closed-loop mucosal fluid accumulation, luminal distension, and visceral pain referred to the T10 dermatome. As bacterial proliferation, transmural ischemia, and inflammation progress to involve the parietal peritoneum, the pain becomes somatic, sharp, and localized precisely over McBurney's point. Signs of peritoneal irritation (rebound tenderness, guarding, Rovsing, Psoas) herald impending or early perforation.",
      "learningPoints": [
        "The migration of abdominal pain from periumbilical to the right iliac fossa is the single most specific clinical feature of acute appendicitis.",
        "Anorexia ('hamburger sign') is a highly sensitive clinical sign.",
        "Ultrasonography criteria for appendicitis: non-compressible tubular structure > 6 mm outer diameter, appendicolith, or periappendiceal fluid.",
        "Definitive treatment is laparoscopic or open appendectomy with supportive IV fluid resuscitation and prophylactic antibiotics."
      ]
    },
    "references": [
      {
        "title": "WSES Jerusalem guidelines for diagnosis and treatment of acute appendicitis",
        "url": "https://wses.biomedcentral.com"
      }
    ],
    "status": "Published"
  },
  {
    "id": "CASE-005",
    "title": "The Hidden Liver Disease",
    "category": "Medicine",
    "subcategory": "Hepatology / Autoimmune Liver Disease",
    "difficulty": "Progressive",
    "settings": {
      "startingLives": 5,
      "lifeLossPerWrongAnswer": 1,
      "startingScore": 1000,
      "wrongAnswerScorePenalty": 100,
      "showNextClueAfterWrong": true,
      "showAnswerAfterLivesZero": true
    },
    "patient": {
      "age": "60",
      "sex": "Female",
      "summary": "Presents with chronic, vague right upper quadrant abdominal pain radiating from the right hypochondrium to her right shoulder and scapular region."
    },
    "stages": [
      {
        "stage": 1,
        "title": "The Chief Complaint",
        "clue": "A 60-year-old female presents with chronic, vague right upper quadrant abdominal pain radiating from the right hypochondrium to her right shoulder and scapular region.",
        "decisionPoint": {
          "question": "What broad categories should you consider for chronic RUQ pain with scapular radiation?",
          "recommendedDecision": "Consider biliary, hepatic parenchymal, and musculoskeletal etiologies without premature diagnostic closure.",
          "importantClues": [
            "Chronic right hypochondrium pain radiating to the right shoulder/scapular region",
            "Female age 60 presentation"
          ],
          "possibleInvestigations": [
            "Liver function tests (LFTs)",
            "Transabdominal ultrasound",
            "Complete blood count (CBC)"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "The patient presents with chronic vague right upper quadrant pain radiating to the scapula, mimicking biliary colic.",
          "whatToThink": "Symptom distribution suggests gallbladder pathology, but primary hepatic parenchymal distension must remain on the differential.",
          "reasoning": "Scapular radiation is a classic referred pain pattern from diaphragmatic or capsular irritation. Objective imaging and biochemistry are required.",
          "keyTakeaway": "Symptom localization alone cannot differentiate biliary colic from capsular distension in subclinical hepatitis."
        },
        "crossReferences": [
          {
            "title": "Evaluation of Right Upper Quadrant Abdominal Pain",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK459270/"
          }
        ]
      },
      {
        "stage": 2,
        "title": "The Laboratory Paradox",
        "clue": "Initial laboratory testing demonstrates a markedly elevated Gamma-Glutamyl Transferase (GGT 170 U/L) alongside mild AST elevation (41 U/L), prediabetes (HbA1c 6.2%), and hypercholesterolemia, with completely normal Alkaline Phosphatase (ALP) and total bilirubin.",
        "decisionPoint": {
          "question": "Why is GGT markedly elevated (170 U/L) while Alkaline Phosphatase (ALP) is completely normal?",
          "recommendedDecision": "Recognize that normal ALP argues against extrahepatic mechanical biliary obstruction, pointing toward parenchymal or metabolic stress.",
          "importantClues": [
            "Isolated marked GGT elevation (170 U/L) with normal ALP and normal bilirubin",
            "HbA1c 6.2% and hypercholesterolemia as potential metabolic co-factors"
          ],
          "possibleInvestigations": [
            "Serum immunoglobulins (IgG)",
            "Autoantibody serologies (ANA, ASMA, AMA)",
            "Viral hepatitis serology"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "GGT is markedly elevated at 170 U/L, but ALP and bilirubin are completely normal, creating a diagnostic paradox.",
          "whatToThink": "If this were mechanical gallstone obstruction, ALP and bilirubin would typically be elevated. This discordance points toward parenchymal microsomal induction.",
          "reasoning": "GGT is sensitive but non-specific. Its isolated elevation rules out classic obstructive cholestasis and demands investigation of occult hepatocellular inflammation.",
          "keyTakeaway": "Isolated GGT elevation with normal ALP strongly refutes mechanical biliary obstruction; investigate occult parenchymal injury."
        },
        "investigations": [
          {
            "name": "Gamma-Glutamyl Transferase (GGT)",
            "value": "170",
            "unit": "U/L",
            "referenceRange": "9 - 48 U/L",
            "interpretation": "Markedly elevated microsomal enzyme"
          },
          {
            "name": "Alkaline Phosphatase (ALP)",
            "value": "68",
            "unit": "U/L",
            "referenceRange": "44 - 147 U/L",
            "interpretation": "Completely normal; refutes biliary obstruction"
          },
          {
            "name": "Total Bilirubin",
            "value": "0.8",
            "unit": "mg/dL",
            "referenceRange": "0.2 - 1.2 mg/dL",
            "interpretation": "Normal; no cholestatic jaundice"
          },
          {
            "name": "AST",
            "value": "41",
            "unit": "U/L",
            "referenceRange": "10 - 40 U/L",
            "interpretation": "Mildly elevated hepatocellular enzyme"
          }
        ]
      },
      {
        "stage": 3,
        "title": "The Unremarkable Ultrasound",
        "clue": "Past medical history is notable for long-standing suspected biliary symptoms/cholecystitis and serial transabdominal ultrasounds over several years showing Grade I fatty liver without gallstones, ductal dilation, or gross structural cirrhosis.",
        "decisionPoint": {
          "question": "Does a normal liver ultrasound rule out advanced liver disease or fibrosis?",
          "recommendedDecision": "No. Conventional ultrasound has low sensitivity for microscopic inflammation and non-cirrhotic bridging fibrosis.",
          "importantClues": [
            "Normal gallbladder without stones or ductal dilatation",
            "Grade I fatty liver with smooth margins and no gross structural cirrhosis"
          ],
          "possibleInvestigations": [
            "Quantitative serum IgG",
            "Autoimmune serology panel (ANA, ASMA, LKM-1)",
            "Platelet and leukocyte count"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "Past ultrasounds show no gallstones or gross cirrhosis, yet symptoms and enzyme abnormalities persist.",
          "whatToThink": "Ultrasound excludes macroscopic gallstones and frank nodular cirrhosis, but microscopic necroinflammation and bridging fibrosis can easily be missed.",
          "reasoning": "Conventional transabdominal ultrasound frequently appears smooth and unremarkable even in the presence of bridging fibrosis (Ishak Stage 4).",
          "keyTakeaway": "A normal liver ultrasound does not exclude active microscopic interface hepatitis or advanced bridging fibrosis."
        }
      },
      {
        "stage": 4,
        "title": "The Hematologic Paradox",
        "clue": "Further hematologic evaluation reveals persistent, unexplained bicytopenia—moderate thrombocytopenia (platelets 77,000/µL) and leukopenia (WBC 3,540/µL)—presenting a clinical paradox given the structurally unremarkable liver on conventional ultrasound.",
        "decisionPoint": {
          "question": "What is the clinical significance of unexplained bicytopenia (platelets 77,000/µL, WBC 3,540/µL) with a normal liver ultrasound?",
          "recommendedDecision": "Recognize bicytopenia as a hallmark of occult hypersplenism and portal hypertension from bridging fibrosis.",
          "importantClues": [
            "Thrombocytopenia (platelets 77,000/µL) and leukopenia (WBC 3,540/µL)",
            "Discordance between peripheral cytopenias and structurally normal ultrasound"
          ],
          "possibleInvestigations": [
            "Transjugular or percutaneous liver biopsy",
            "Serum protein electrophoresis / IgG"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "Patient has persistent bicytopenia (thrombocytopenia and leukopenia) despite a structurally unremarkable liver on ultrasound.",
          "whatToThink": "Why are platelets and WBCs low? Congestive splenic sequestration (hypersplenism) from occult portal hypertension is the classic unifying mechanism.",
          "reasoning": "Occult portal hypertension occurs when bridging fibrosis increases vascular resistance. The spleen sequesters platelets and leukocytes, creating peripheral bicytopenia.",
          "keyTakeaway": "Unexplained thrombocytopenia and leukopenia in liver disease are cardinal signs of occult portal hypertension and hypersplenism."
        },
        "investigations": [
          {
            "name": "Platelet Count",
            "value": "77000",
            "unit": "/µL",
            "referenceRange": "150000 - 450000 /µL",
            "interpretation": "Moderate thrombocytopenia from hypersplenism"
          },
          {
            "name": "White Blood Cell Count (WBC)",
            "value": "3540",
            "unit": "/µL",
            "referenceRange": "4000 - 11000 /µL",
            "interpretation": "Leukopenia indicating peripheral sequestration"
          }
        ]
      },
      {
        "stage": 5,
        "title": "The Definitive Tissue Diagnosis",
        "clue": "A transjugular liver biopsy resolves the mystery: histopathology demonstrates active interface hepatitis, lymphoplasmacytic portal infiltrates, hepatocyte rosettes, positive ANA (1:100), IgG >2x upper limit of normal, and Ishak Stage 4 bridging fibrosis, yielding a score of 19 on the International AIH Modified Survey System.",
        "decisionPoint": {
          "question": "What does the histopathology confirm, and what is the definitive management?",
          "recommendedDecision": "Confirm Definite Autoimmune Hepatitis with Ishak Stage 4 Bridging Fibrosis and initiate immunosuppressive therapy.",
          "importantClues": [
            "Active interface hepatitis with dense lymphoplasmacytic portal infiltrates",
            "Hepatocyte rosettes, positive ANA (1:100), IgG >2x ULN",
            "Ishak Stage 4 bridging fibrosis; score 19 on International AIH Modified Survey"
          ],
          "possibleInvestigations": [
            "Therapeutic induction with oral prednisone followed by azathioprine maintenance"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "Liver biopsy shows interface hepatitis, plasma cell infiltrate, rosettes, high IgG, positive ANA, and Ishak Stage 4 bridging fibrosis.",
          "whatToThink": "The combination satisfies all criteria for definite Autoimmune Hepatitis Type 1 with advanced bridging fibrosis.",
          "reasoning": "Interface hepatitis with plasma cell predominance and rosetting is the pathognomonic histological hallmark of AIH. A score of 19 exceeds the definite AIH threshold (>15).",
          "keyTakeaway": "Liver histology remains the definitive gold standard to grade necroinflammatory activity, stage fibrosis, and confirm AIH."
        },
        "investigations": [
          {
            "name": "Liver Biopsy Histology",
            "value": "Interface hepatitis, plasma cell-rich infiltrate, rosettes, Ishak Stage 4 fibrosis",
            "unit": "",
            "referenceRange": "Normal parenchyma",
            "interpretation": "Definite Autoimmune Hepatitis"
          },
          {
            "name": "Immunoglobulin G (IgG)",
            "value": ">2x ULN",
            "unit": "mg/dL",
            "referenceRange": "700 - 1600 mg/dL",
            "interpretation": "Marked polyclonal hypergammaglobulinemia"
          },
          {
            "name": "Antinuclear Antibodies (ANA)",
            "value": "1:100",
            "unit": "Titer",
            "referenceRange": "<1:40",
            "interpretation": "Positive autoantibody serology"
          },
          {
            "name": "International AIH Score",
            "value": "19",
            "unit": "Points",
            "referenceRange": ">15 Definite AIH",
            "interpretation": "Definite Autoimmune Hepatitis"
          }
        ]
      }
    ],
    "diagnosis": {
      "correctAnswer": "Definite Autoimmune Hepatitis (AIH) with Ishak Stage 4 Bridging Fibrosis and Secondary Portal Hypertension",
      "acceptedAnswers": [
        "Definite Autoimmune Hepatitis",
        "Autoimmune Hepatitis",
        "AIH",
        "Autoimmune hepatitis with bridging fibrosis",
        "Autoimmune hepatitis with secondary portal hypertension",
        "Definite Autoimmune Hepatitis (AIH)",
        "Autoimmune hepatitis"
      ],
      "primary": "Autoimmune Hepatitis",
      "displayName": "Definite Autoimmune Hepatitis (AIH) with Ishak Stage 4 Bridging Fibrosis and Secondary Portal Hypertension",
      "aliases": [
        "AIH",
        "Type 1 AIH"
      ],
      "explanation": "Definite Autoimmune Hepatitis Type 1 presenting insidiously with disproportionate GGT elevation, hypergammaglobulinemia, positive ANA/ASMA, and classic interface hepatitis.",
      "detailedExplanation": "Autoimmune hepatitis (AIH) in older females frequently presents with vague, non-specific symptoms such as right upper quadrant discomfort and fatigue that mimic biliary colic or metabolic liver disease. In this patient, isolated GGT elevation with completely normal Alkaline Phosphatase was a vital discriminator ruling out mechanical biliary obstruction. The progression revealed polyclonal hypergammaglobulinemia (IgG >2x ULN), positive ANA (1:100), and peripheral bicytopenia reflecting hypersplenism. Transjugular liver biopsy confirmed prominent interface hepatitis (piecemeal necrosis) with lymphoplasmacytic portal infiltration, hepatocyte rosettes, and Ishak stage 4 bridging fibrosis, fulfilling criteria for definite AIH (score 19).",
      "decisiveFindings": [
        "Prominent active interface hepatitis (piecemeal necrosis) on liver biopsy",
        "Dense lymphoplasmacytic portal infiltrates with hepatocyte rosettes",
        "Marked hypergammaglobulinemia (serum IgG >2x upper limit of normal)",
        "Positive Antinuclear Antibodies (ANA 1:100)",
        "Ishak Stage 4 bridging fibrosis explaining secondary portal hypertension and bicytopenia"
      ],
      "finalReasoning": "Subclinical autoimmune necroinflammation can progress to bridging fibrosis (Ishak Stage 4) without generating the classic nodular appearance on conventional transabdominal ultrasound. The resulting elevated sinusoidal and portal pressures trigger occult portal hypertension and secondary hypersplenism, manifesting as peripheral platelet and leukocyte sequestration (bicytopenia). Histopathologic demonstration of interface hepatitis, plasma cell-rich infiltrates, and rosetting, in conjunction with positive ANA and elevated IgG, provides definitive diagnostic scoring (score 19) based on the International Autoimmune Hepatitis Group criteria.",
      "crossReferences": [
        {
          "title": "AASLD Practice Guidance on Autoimmune Hepatitis",
          "url": "https://www.aasld.org/practice-guidelines/autoimmune-hepatitis"
        },
        {
          "title": "EASL Clinical Practice Guidelines: Autoimmune Hepatitis",
          "url": "https://www.easl.eu/guidelines"
        }
      ]
    },
    "explanation": {
      "clinicalSummary": "Autoimmune Hepatitis (AIH) is a chronic, immune-mediated inflammatory liver disease characterized by circulating autoantibodies, elevated serum IgG levels, and characteristic interface hepatitis on histology.\n\nIn this patient, progressive subclinical necroinflammation led to advanced Ishak Stage 4 bridging fibrosis, which induced occult portal hypertension and congestive splenic sequestration (hypersplenism)—explaining the peripheral bicytopenia despite a visually unremarkable liver on transabdominal ultrasound.\n\nWhile co-existing Non-Alcoholic Fatty Liver Disease (NAFLD) contributed to the GGT elevation, the hallmark histologic triad of interface hepatitis, lymphoplasmacytic infiltrates, and rosettes alongside elevated IgG and positive ANA confirmed the definitive diagnosis of AIH.",
      "reasoning": "Subclinical autoimmune necroinflammation can progress to bridging fibrosis (Ishak Stage 4) without generating the classic nodular or coarse appearance on conventional transabdominal ultrasound. The resulting elevated sinusoidal and portal pressures trigger occult portal hypertension and secondary hypersplenism, manifesting as peripheral platelet and leukocyte sequestration (bicytopenia). Histopathologic demonstration of interface hepatitis, plasma cell-rich infiltrates, and rosetting, in conjunction with positive ANA and elevated IgG, provides definitive diagnostic scoring (score 19) based on the International Autoimmune Hepatitis Group criteria.",
      "learningPoints": [
        "Autoimmune hepatitis may remain clinically subtle despite progressive hepatic fibrosis.",
        "Normal conventional ultrasound does not exclude significant hepatic fibrosis.",
        "Unexplained thrombocytopenia and leukopenia can provide an important clue to occult portal hypertension and hypersplenism.",
        "Interface hepatitis is a characteristic histological feature of autoimmune hepatitis.",
        "Lymphoplasmacytic portal infiltrates and hepatocyte rosettes support the diagnosis.",
        "Elevated IgG and positive ANA are important diagnostic clues.",
        "Ishak Stage 4 represents advanced bridging fibrosis.",
        "Histology may resolve an otherwise unexplained clinical and laboratory paradox."
      ]
    },
    "references": [
      {
        "title": "AASLD Practice Guidance on Autoimmune Hepatitis",
        "url": "https://www.aasld.org/practice-guidelines/autoimmune-hepatitis"
      },
      {
        "title": "EASL Clinical Practice Guidelines: Autoimmune Hepatitis",
        "url": "https://www.easl.eu/guidelines"
      }
    ],
    "status": "Published",
    "differentialDiagnoses": [
      {
        "name": "Cholelithiasis / Biliary Colic",
        "aliases": [
          "Gallstones",
          "Biliary Colic",
          "Cholecystitis"
        ],
        "whyConsidered": "Right upper quadrant pain radiating to the right shoulder/scapula in an older female.",
        "whyRejected": "Serial transabdominal ultrasounds confirmed absence of gallstones, ductal dilatation, or acoustic shadowing, and ALP was normal.",
        "clinicalExplanation": "Referred pain from Glisson capsule inflammation mimics biliary colic, but imaging definitively excludes gallstones."
      },
      {
        "name": "Primary Biliary Cholangitis (PBC)",
        "aliases": [
          "PBC"
        ],
        "whyConsidered": "Older female presenting with fatigue, chronic RUQ discomfort, and elevated GGT.",
        "whyRejected": "Alkaline Phosphatase was normal, AMA was negative, and histology showed interface hepatitis rather than florid interlobular bile duct destruction.",
        "clinicalExplanation": "PBC targets cholangiocytes with high ALP, while AIH targets hepatocytes with interface hepatitis."
      },
      {
        "name": "Metabolic Dysfunction-Associated Steatohepatitis (MASH / NAFLD)",
        "aliases": [
          "MASH",
          "NASH",
          "NAFLD"
        ],
        "whyConsidered": "Presence of prediabetes (HbA1c 6.2%), hypercholesterolemia, and Grade I fatty liver on ultrasound.",
        "whyRejected": "NAFLD cannot explain polyclonal hypergammaglobulinemia (IgG >2x ULN), ANA seropositivity, or prominent plasma cell-rich interface hepatitis.",
        "clinicalExplanation": "Metabolic co-factors frequently co-exist in older patients, but do not account for marked autoantibody titers or bridging fibrosis."
      },
      {
        "name": "Viral Hepatitis (A, B, or C)",
        "aliases": [
          "Hepatitis A",
          "Hepatitis B",
          "Hepatitis C"
        ],
        "whyConsidered": "Enzyme derangement and progressive parenchymal hepatitis.",
        "whyRejected": "Viral serologies were non-reactive, and histology confirmed classic autoimmune features.",
        "clinicalExplanation": "Viral serologies must be systematically documented as negative to confirm autoimmune hepatitis scoring."
      }
    ],
    "wrongAnswerExplanations": [
      {
        "condition": "Hepatitis A",
        "aliases": [
          "HAV"
        ],
        "explanation": "Hepatitis A causes an acute, self-limiting viral illness with jaundice and transaminases typically >1,000 U/L. It does not produce chronic insidious pain, Ishak Stage 4 bridging fibrosis, or hypergammaglobulinemia.",
        "missedClues": [
          "Non-reactive viral serologies",
          "Marked IgG elevation (>2x ULN)",
          "Ishak Stage 4 bridging fibrosis indicating chronicity"
        ],
        "betterDirection": "Consider chronic autoimmune liver disease rather than acute viral hepatitis."
      },
      {
        "condition": "Cholelithiasis",
        "aliases": [
          "Gallstones",
          "Biliary Colic",
          "Cholecystitis",
          "Acute Cholecystitis"
        ],
        "explanation": "While pain radiating to the scapula mimics acute biliary colic or cholecystitis, serial ultrasounds confirmed a normal gallbladder without stones or ductal dilation, and transaminases/IgG point toward parenchymal liver inflammation.",
        "missedClues": [
          "Completely normal gallbladder and biliary tree on ultrasound",
          "Normal Alkaline Phosphatase",
          "Marked IgG elevation and positive ANA"
        ],
        "betterDirection": "Look closely at the hepatocellular transaminases, elevated IgG, and autoantibodies rather than acute biliary tract obstruction."
      },
      {
        "condition": "Primary Biliary Cholangitis",
        "aliases": [
          "PBC"
        ],
        "explanation": "Primary Biliary Cholangitis features prominent Alkaline Phosphatase elevation and positive AMA. In this case, ALP was normal, AMA was negative, and biopsy showed interface hepatitis rather than bile duct destruction.",
        "missedClues": [
          "Normal Alkaline Phosphatase",
          "Negative AMA",
          "Prominent interface hepatitis with plasma cells"
        ],
        "betterDirection": "Consider Autoimmune Hepatitis (AIH) rather than biliary cholangiopathy."
      },
      {
        "condition": "NAFLD",
        "aliases": [
          "NASH",
          "MASH",
          "Fatty Liver"
        ],
        "explanation": "Although metabolic risk factors were present, NAFLD cannot explain marked polyclonal hypergammaglobulinemia (IgG >2x ULN), positive ANA (1:100), or prominent lymphoplasmacytic interface hepatitis.",
        "missedClues": [
          "Serum IgG >2x upper limit of normal",
          "Positive ANA autoantibodies",
          "Interface hepatitis and hepatocyte rosettes on biopsy"
        ],
        "betterDirection": "Look for autoimmune etiology behind the severe histologic inflammation."
      }
    ],
    "clinicalSummary": "A 60-year-old female presented with chronic vague right upper quadrant pain mimicking biliary colic, accompanied by isolated GGT elevation. Serial ultrasounds ruled out cholelithiasis. Subsequent hematologic testing revealed unexplained bicytopenia (thrombocytopenia 77k, leukopenia 3.5k) from occult hypersplenism. Transjugular liver biopsy resolved the paradox, demonstrating interface hepatitis, lymphoplasmacytic infiltrates, hepatocyte rosettes, positive ANA, IgG >2x ULN, and Ishak Stage 4 bridging fibrosis—establishing Definite Autoimmune Hepatitis (score 19).",
    "clinicalInsight": {
      "title": "The Biliary Mimic and Occult Hypersplenism",
      "content": "Referred right upper quadrant pain radiating to the scapula is easily misattributed to cholelithiasis. When Alkaline Phosphatase is normal despite high GGT, mechanical obstruction is refuted. Furthermore, peripheral bicytopenia was the critical clinical surrogate for occult portal hypertension and bridging fibrosis that conventional ultrasound failed to detect."
    },
    "diagnosticReasoning": [
      {
        "step": 1,
        "finding": "Chronic vague RUQ pain radiating to the right scapula",
        "meaning": "Referred pain overlapping with biliary colic",
        "decision": "Order liver function tests and abdominal ultrasound"
      },
      {
        "step": 2,
        "finding": "Markedly elevated GGT (170 U/L) with normal ALP and normal ultrasound",
        "meaning": "Excludes gallstones; reveals discordant microsomal/parenchymal inflammation",
        "decision": "Investigate occult metabolic, viral, and autoimmune etiologies"
      },
      {
        "step": 3,
        "finding": "Unexplained bicytopenia (platelets 77,000/µL, WBC 3,540/µL)",
        "meaning": "Occult hypersplenism and portal hypertension from advanced fibrosis",
        "decision": "Perform transjugular liver biopsy for histological staging"
      },
      {
        "step": 4,
        "finding": "Interface hepatitis, plasma cell infiltrates, rosettes, high IgG, Ishak Stage 4 fibrosis",
        "meaning": "Definite Autoimmune Hepatitis Type 1 (score 19)",
        "decision": "Initiate systemic immunosuppressive therapy with corticosteroids and azathioprine"
      }
    ],
    "investigationSummary": "Discordant GGT elevation with normal ALP ruled out biliary obstruction. Subsequent bicytopenia signaled occult hypersplenism and portal hypertension, leading to biopsy confirmation of definite AIH with Ishak Stage 4 bridging fibrosis.",
    "whereReasoningCanGoWrong": [
      "Attributing RUQ pain radiating to the scapula to biliary colic and pursuing surgery despite normal ultrasound.",
      "Dismissing isolated GGT elevation as non-specific metabolic syndrome without ordering serum IgG.",
      "Relying on a normal liver ultrasound to rule out advanced hepatic fibrosis.",
      "Overlooking peripheral bicytopenia, which was the cardinal sign of occult portal hypertension and hypersplenism."
    ]
  },
  {
    "id": "CASE-006",
    "title": "The Infection That Unmasked the Liver",
    "category": "Medicine",
    "subcategory": "Hepatology / Emergency Medicine",
    "difficulty": "Progressive",
    "settings": {
      "startingLives": 5,
      "lifeLossPerWrongAnswer": 1,
      "startingScore": 1000,
      "wrongAnswerScorePenalty": 100,
      "showNextClueAfterWrong": true,
      "showAnswerAfterLivesZero": true
    },
    "patient": {
      "age": "48",
      "sex": "Male",
      "summary": "Presents with severe acute lower limb distress and fever unmasking decompensated chronic liver disease."
    },
    "stages": [
      {
        "stage": 1,
        "title": "The Acute Limb Crisis",
        "clue": "A patient presents with recurrent, severe lower limb distress, reporting pain so acute that he is entirely unable to place his foot on the ground or walk.",
        "decisionPoint": {
          "question": "What initial possibilities should be evaluated for severe acute lower limb pain and non-weight bearing?",
          "recommendedDecision": "Evaluate for acute soft-tissue infection, deep vein thrombosis, and acute joint inflammation, while noting compliance barriers.",
          "importantClues": [
            "Recurrent severe lower limb pain preventing foot placement",
            "Strict pattern of abandoning medical protocols after two months"
          ],
          "possibleInvestigations": [
            "Physical inspection of the extremity",
            "Vital signs and inflammatory markers",
            "Detailed behavioral and social history"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "The patient presents with severe acute lower limb distress and a strict two-month limit on medical compliance.",
          "whatToThink": "Pain preventing ambulation may be vascular, infectious, or articular, but the behavioral compliance pattern warrants investigation.",
          "reasoning": "Severe acute extremity pain requires urgent physical examination to rule out necrotizing soft tissue infection, cellulitis, or compartment syndrome.",
          "keyTakeaway": "Always explore the behavioral etiology behind strict cyclical medical non-compliance."
        }
      },
      {
        "stage": 2,
        "title": "The Spreading Infection",
        "clue": "Physical examination of the affected leg reveals active lymphangitis and cellulitis, necessitating inpatient admission for the management of the spreading infection and fever.",
        "decisionPoint": {
          "question": "How does spreading cellulitis/lymphangitis alter the clinical trajectory?",
          "recommendedDecision": "Recognize this as a severe bacterial infection requiring inpatient IV antibiotics and close systemic monitoring.",
          "importantClues": [
            "Active lymphangitis and cellulitis on physical exam",
            "Fever requiring inpatient hospital admission"
          ],
          "possibleInvestigations": [
            "Complete Blood Count (CBC)",
            "Serum electrolytes and renal function (BMP)",
            "Blood cultures"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "Physical exam confirms active spreading lymphangitis and cellulitis with fever.",
          "whatToThink": "Infection is the immediate acute problem, but inpatient admission allows systemic evaluation for underlying predisposing conditions.",
          "reasoning": "Bacterial soft tissue infections are major catabolic stressors that can trigger decompensation in patients with occult chronic disease.",
          "keyTakeaway": "Severe soft tissue infections can serve as the acute trigger unmasking occult organ failure."
        }
      },
      {
        "stage": 3,
        "title": "The Hidden Chronic Disease",
        "clue": "His medical history reveals a massive challenge with compliance, driven by an addiction that causes him to abandon all medical protocols and relapse after a maximum of two months.",
        "decisionPoint": {
          "question": "What underlying condition explains cyclical compliance abandonment strictly after two months?",
          "recommendedDecision": "Recognize the 2-month sobriety/relapse cycle as a hallmark of severe chronic substance use disorder (alcoholism).",
          "importantClues": [
            "Compliance strictly limited to two months before abandonment",
            "Addiction driving cyclical treatment abandonment and relapse"
          ],
          "possibleInvestigations": [
            "Detailed substance use history",
            "Hepatic enzymes and synthetic function panel (INR, Albumin)"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "Addiction causes cyclical relapse and abandonment of medical protocols after two months.",
          "whatToThink": "Addiction to alcohol is a primary driver of chronic occult liver disease and cirrhosis.",
          "reasoning": "Repeated cycles of medical adherence followed by relapse are typical of alcohol dependence syndrome, predisposing to chronic liver injury.",
          "keyTakeaway": "Cyclical treatment abandonment after brief sobriety is a classic behavioral marker of chronic alcohol dependence."
        }
      },
      {
        "stage": 4,
        "title": "The Systemic Clues",
        "clue": "Further abdominal examination and imaging reveal the presence of underlying ascites and splenomegaly.",
        "decisionPoint": {
          "question": "What do ascites and splenomegaly signify in a patient with chronic alcohol abuse?",
          "recommendedDecision": "Diagnose clinically significant portal hypertension secondary to chronic liver cirrhosis.",
          "importantClues": [
            "Presence of ascites on abdominal examination and imaging",
            "Splenomegaly indicating congestive venous pooling from portal hypertension"
          ],
          "possibleInvestigations": [
            "Diagnostic paracentesis to rule out spontaneous bacterial peritonitis (SBP)",
            "Liver ultrasound with Doppler"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "Abdominal examination reveals ascites and splenomegaly.",
          "whatToThink": "The combination of ascites and splenomegaly is definitive evidence of clinically significant portal hypertension from underlying cirrhosis.",
          "reasoning": "Cirrhosis leads to sinusoidal remodeling and portal hypertension, causing transudation of fluid (ascites) and splenic congestion (splenomegaly).",
          "keyTakeaway": "Ascites and splenomegaly are pathognomonic physical and imaging stigmata of decompensated chronic liver disease."
        }
      },
      {
        "stage": 5,
        "title": "The Ward Crisis",
        "clue": "By the next day on the ward, he becomes violently agitated and disoriented, driven by a severe sodium-potassium imbalance triggered by the systemic stress of the infection.",
        "decisionPoint": {
          "question": "What is driving sudden violent agitation, disorientation, and electrolyte collapse on the ward?",
          "recommendedDecision": "Diagnose acute hepatic encephalopathy precipitated by bacterial cellulitis and electrolyte imbalance in decompensated cirrhosis.",
          "importantClues": [
            "Violent agitation and disorientation on hospital day 2",
            "Severe sodium-potassium imbalance triggered by systemic infection stress"
          ],
          "possibleInvestigations": [
            "Stat serum electrolytes",
            "Arterial or venous ammonia level",
            "Immediate initiation of lactulose and IV antibiotics"
          ]
        },
        "answerExplanation": {
          "whatWasKnown": "The patient developed acute violent disorientation and severe electrolyte imbalance on the ward.",
          "whatToThink": "This is overt hepatic encephalopathy precipitated by the cellulitis and electrolyte derangement in a patient with decompensated liver disease.",
          "reasoning": "Sepsis and electrolyte shifts impair ammonia clearance and cross the blood-brain barrier, triggering acute encephalopathy in cirrhosis.",
          "keyTakeaway": "Acute disorientation in cirrhotic patients is a medical emergency requiring rapid reversal of precipitants and lactulose administration."
        }
      }
    ],
    "diagnosis": {
      "correctAnswer": "Decompensated Alcoholic Liver Disease (Chronic Liver Disease)",
      "acceptedAnswers": [
        "Decompensated Alcoholic Liver Disease",
        "Alcoholic Liver Disease",
        "Decompensated alcoholic liver disease",
        "Alcoholic chronic liver disease",
        "Decompensated chronic liver disease due to alcohol",
        "Chronic liver disease due to alcohol",
        "Alcoholic liver cirrhosis",
        "Alcoholic cirrhosis",
        "Decompensated ALD",
        "ALD",
        "DCLD"
      ],
      "primary": "Decompensated Alcoholic Liver Disease",
      "displayName": "Decompensated Alcoholic Liver Cirrhosis with Acute Hepatic Encephalopathy Precipitated by Lower Limb Cellulitis",
      "aliases": [
        "ALD",
        "DCLD"
      ],
      "explanation": "Decompensated Alcoholic Liver Disease acutely triggered into hepatic encephalopathy and electrolyte collapse by severe soft tissue cellulitis.",
      "detailedExplanation": "In chronic compensated or subclinical alcoholic liver disease, patients maintain a fragile metabolic equilibrium. Bacterial soft-tissue infections (cellulitis and lymphangitis) act as a severe systemic second hit, triggering inflammatory cytokines, dehydration, and marked electrolyte derangements (hyponatremia, hypokalemia). In a patient with baseline portal hypertension (manifested by ascites and splenomegaly), impaired hepatic detoxification and altered blood-brain barrier permeability led to rapid, violent hepatic encephalopathy on the ward.",
      "decisiveFindings": [
        "Stigmata of clinically significant portal hypertension: ascites and splenomegaly",
        "Acute bacterial cellulitis/lymphangitis serving as the precipitating inflammatory stressor",
        "Severe electrolyte derangement (hyponatremia and hypokalemia) triggering neurocognitive crisis",
        "Cyclical treatment abandonment after two months directly linked to alcohol relapse"
      ],
      "finalReasoning": "Baseline cirrhotic physiology possesses limited functional reserve. An acute bacterial infection induces systemic inflammatory response syndrome (SIRS), catabolism, and cytokine release, precipitating marked electrolyte shifts (hyponatremia, hypokalemia) and neurotoxicity. Impaired hepatic clearance of nitrogenous wastes combined with blood-brain barrier disruption causes rapid evolution of overt hepatic encephalopathy.",
      "crossReferences": [
        {
          "title": "EASL Clinical Practice Guidelines for Decompensated Cirrhosis",
          "url": "https://www.easl.eu/guidelines"
        },
        {
          "title": "AASLD Practice Guidance: Diagnosis and Management of Acute Decompensation",
          "url": "https://www.aasld.org"
        }
      ]
    },
    "explanation": {
      "clinicalSummary": "Decompensated Alcoholic Liver Disease occurs when chronic hepatic injury progresses to a loss of basic liver function, presenting with structural and metabolic signs like ascites and splenomegaly.\n\nIn such a compromised state, an acute peripheral infection—such as lymphangitis or cellulitis—acts as a severe systemic stressor.\n\nThis acute stress rapidly triggers a cascade of complications, leading to severe electrolyte derangements and acute hepatic encephalopathy, which manifests as sudden, violent disorientation on the ward.",
      "reasoning": "Baseline cirrhotic physiology possesses limited functional reserve. An acute bacterial infection induces systemic inflammatory response syndrome (SIRS), catabolism, and cytokine release, precipitating marked electrolyte shifts (hyponatremia, hypokalemia) and neurotoxicity. Impaired hepatic clearance of nitrogenous wastes combined with blood-brain barrier disruption causes rapid evolution of overt hepatic encephalopathy.",
      "learningPoints": [
        "Ascites and splenomegaly can indicate advanced chronic liver disease.",
        "Acute infection can precipitate decompensation in a patient with chronic liver disease.",
        "Cellulitis and lymphangitis can act as significant systemic stressors.",
        "Acute changes in mental status in a patient with chronic liver disease require evaluation for hepatic encephalopathy and other metabolic causes.",
        "Electrolyte abnormalities can contribute to acute neurological and behavioral changes.",
        "Alcohol relapse can significantly interfere with long-term treatment adherence.",
        "The acute presentation may be caused by an intercurrent infection while the underlying disease is chronic liver disease."
      ]
    },
    "references": [
      {
        "title": "EASL Clinical Practice Guidelines for Decompensated Cirrhosis",
        "url": "https://www.easl.eu/guidelines"
      },
      {
        "title": "AASLD Practice Guidance: Diagnosis and Management of Acute Decompensation",
        "url": "https://www.aasld.org"
      }
    ],
    "status": "Published",
    "differentialDiagnoses": [
      {
        "name": "Delirium Tremens (Alcohol Withdrawal)",
        "aliases": [
          "DT",
          "Alcohol Withdrawal Delirium"
        ],
        "whyConsidered": "Agitation and disorientation occurring on day 2 of hospital admission in an alcohol-dependent patient.",
        "whyRejected": "While withdrawal can co-occur, the cardinal drivers of collapse were bacterial cellulitis, ascites, splenomegaly, and severe electrolyte derangement producing acute hepatic encephalopathy.",
        "clinicalExplanation": "Treating agitation solely as withdrawal with sedatives without addressing hepatic encephalopathy can be catastrophic in cirrhosis."
      },
      {
        "name": "Sepsis-Associated Encephalopathy",
        "aliases": [
          "Septic Encephalopathy"
        ],
        "whyConsidered": "Spreading cellulitis and lymphangitis accompanied by acute mental status changes.",
        "whyRejected": "Underlying ascites and splenomegaly indicate severe baseline hepatic reserve exhaustion; impaired ammonia clearance and portal shunting were the central drivers.",
        "clinicalExplanation": "Infection served as the precipitating second hit rather than an isolated cause in a healthy host."
      },
      {
        "name": "Acute Gouty Arthritis",
        "aliases": [
          "Gout"
        ],
        "whyConsidered": "Severe acute lower limb pain and inability to bear weight.",
        "whyRejected": "Physical examination demonstrated active spreading cellulitis and lymphangitis rather than an isolated podagric joint, and systemic hepatic failure ensued.",
        "clinicalExplanation": "Soft tissue bacterial infection was the primary peripheral diagnosis."
      }
    ],
    "wrongAnswerExplanations": [
      {
        "condition": "Delirium Tremens",
        "aliases": [
          "Alcohol Withdrawal"
        ],
        "explanation": "Although alcohol addiction was present, the violent agitation on day 2 was driven by acute hepatic encephalopathy with ascites, splenomegaly, and severe electrolyte imbalance triggered by cellulitis.",
        "missedClues": [
          "Ascites and splenomegaly indicating portal hypertension",
          "Severe electrolyte imbalance",
          "Spreading bacterial cellulitis trigger"
        ],
        "betterDirection": "Identify the underlying decompensated organ system unmasked by the infection."
      },
      {
        "condition": "Septic Shock",
        "aliases": [
          "Sepsis"
        ],
        "explanation": "Cellulitis is the acute bacterial trigger, but the failure of metabolic and cognitive homeostasis was caused by end-stage decompensated liver cirrhosis.",
        "missedClues": [
          "Presence of ascites",
          "Splenomegaly",
          "Underlying chronic liver disease history"
        ],
        "betterDirection": "Focus on the compromised organ system unable to maintain homeostasis."
      },
      {
        "condition": "Cellulitis",
        "aliases": [
          "Skin Infection"
        ],
        "explanation": "Cellulitis was the acute precipitant on the leg, but the final definitive clinical diagnosis explaining the ascites, splenomegaly, and ward crisis is Decompensated Alcoholic Liver Disease.",
        "missedClues": [
          "Ascites on abdominal imaging",
          "Splenomegaly",
          "Two-month cyclical alcohol addiction relapse"
        ],
        "betterDirection": "Look past the acute infection to the underlying chronic liver disease."
      }
    ],
    "clinicalSummary": "A 48-year-old male with chronic alcohol dependence presented with severe lower limb pain from spreading cellulitis and lymphangitis. Inpatient admission unmasked severe underlying stigmata of portal hypertension, including ascites and splenomegaly. The acute systemic stress and electrolyte imbalance precipitated overt, violent hepatic encephalopathy on the ward, confirming Decompensated Alcoholic Liver Disease.",
    "clinicalInsight": {
      "title": "The \"Second Hit\" Precipitant in Compensated Cirrhosis",
      "content": "Cirrhotic patients frequently exist in precarious, delicate compensation. A common bacterial infection—such as cellulitis—acts as an inflammatory and metabolic \"second hit\" that precipitates acute decompensation (hepatic encephalopathy, ascites, or acute-on-chronic liver failure). Never treat a soft tissue infection in isolation without examining the abdomen for stigmata of portal hypertension."
    },
    "diagnosticReasoning": [
      {
        "step": 1,
        "finding": "Severe acute lower limb pain with cyclical treatment non-compliance",
        "meaning": "Inability to bear weight with underlying behavioral barrier",
        "decision": "Examine extremity and obtain social history"
      },
      {
        "step": 2,
        "finding": "Active lymphangitis and cellulitis with fever",
        "meaning": "Spreading soft tissue bacterial infection requiring systemic therapy",
        "decision": "Admit for IV antibiotics and inpatient monitoring"
      },
      {
        "step": 3,
        "finding": "Addiction with relapse strictly after two months",
        "meaning": "Chronic alcohol dependence identified as primary behavioral driver",
        "decision": "Assess for chronic substance-related organ damage"
      },
      {
        "step": 4,
        "finding": "Ascites and splenomegaly",
        "meaning": "Definitive stigmata of portal hypertension and underlying cirrhosis",
        "decision": "Evaluate hepatic reserve and initiate cirrhosis management"
      },
      {
        "step": 5,
        "finding": "Violent agitation, disorientation, and severe sodium-potassium imbalance",
        "meaning": "Acute overt hepatic encephalopathy precipitated by bacterial infection and electrolyte derangement",
        "decision": "Administer lactulose, correct electrolytes, and continue targeted antibiotics"
      }
    ],
    "investigationSummary": "Ascites and splenomegaly established the diagnosis of chronic portal hypertension, while electrolyte derangements and severe cellulitis acted as the acute precipitating triggers for overt hepatic encephalopathy.",
    "whereReasoningCanGoWrong": [
      "Focusing exclusively on the skin infection and neglecting abdominal examination for cirrhotic stigmata.",
      "Attributing hospital day 2 agitation purely to alcohol withdrawal without recognizing hepatic encephalopathy.",
      "Administering benzodiazepines or sedatives for agitation, which can precipitate coma in hepatic encephalopathy.",
      "Failing to connect cyclical two-month non-compliance with chronic alcohol addiction relapse."
    ]
  }
];

  // ==========================================================================
  // 2. STORAGE SERVICE (Safe LocalStorage abstraction)
  // ==========================================================================
  const StorageService = {
    KEYS: {
      CASES: 'wisecases_custom_cases_v2',
      RESULTS: 'wisecases_results_v2',
      SETTINGS: 'wisecases_settings_v2',
      PLAYER_ID: 'wisecases_player_id'
    },

    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
      } catch (err) {
        console.warn(`[StorageService] Failed to parse key "${key}":`, err);
        return fallback;
      }
    },

    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
        return true;
      } catch (err) {
        console.error(`[StorageService] Failed to set key "${key}":`, err);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.error(`[StorageService] Failed to remove key "${key}":`, err);
      }
    }
  };

  // ==========================================================================
  // PLAYER SERVICE (Anonymous Player ID for future sync & multi-device tracking)
  // ==========================================================================
  const PlayerService = {
    KEY: 'wisecases_player_id',

    getPlayerId() {
      try {
        let id = localStorage.getItem(this.KEY);
        if (!id || !/^WC-[A-Z0-9]{8}$/.test(id)) {
          const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
          let code = '';
          for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          id = `WC-${code}`;
          localStorage.setItem(this.KEY, id);
        }
        return id;
      } catch (e) {
        return 'WC-ANONYMOUS';
      }
    }
  };


  // ==========================================================================
  // 2B. DEFAULT SEED CONDITIONS (Embedded Fallback for Autocomplete & Offline)
  // ==========================================================================
  const DEFAULT_SEED_CONDITIONS = [
  {
    "id": "COND-0001",
    "name": "Autoimmune Hepatitis",
    "aliases": [
      "AIH",
      "Autoimmune hepatitis",
      "Autoimmune liver disease",
      "Lupoid hepatitis"
    ],
    "keywords": [
      "autoimmune",
      "hepatitis",
      "liver",
      "ana",
      "igg",
      "interface hepatitis",
      "jaundice"
    ],
    "specialty": "Hepatology / Gastroenterology",
    "category": "Medicine"
  },
  {
    "id": "COND-0002",
    "name": "Decompensated Alcoholic Liver Disease",
    "aliases": [
      "ALD",
      "DCLD",
      "Alcoholic liver disease",
      "Alcoholic cirrhosis",
      "Decompensated cirrhosis",
      "Decompensated chronic liver disease"
    ],
    "keywords": [
      "alcohol",
      "cirrhosis",
      "liver",
      "ascites",
      "splenomegaly",
      "encephalopathy",
      "portal hypertension"
    ],
    "specialty": "Hepatology / Gastroenterology",
    "category": "Medicine"
  },
  {
    "id": "COND-0003",
    "name": "Acute Inferior Wall ST-Elevation Myocardial Infarction",
    "aliases": [
      "Inferior STEMI",
      "Inferior MI",
      "STEMI",
      "Acute myocardial infarction",
      "Inferior wall MI"
    ],
    "keywords": [
      "stemi",
      "myocardial infarction",
      "heart attack",
      "rca",
      "inferior",
      "troponin",
      "ekg"
    ],
    "specialty": "Cardiology / Critical Care",
    "category": "Medicine"
  },
  {
    "id": "COND-0004",
    "name": "Tension Pneumothorax",
    "aliases": [
      "Pneumothorax",
      "Tension pneumo",
      "Closed pneumothorax"
    ],
    "keywords": [
      "pneumothorax",
      "dyspnea",
      "tracheal deviation",
      "needle decompression",
      "chest trauma",
      "hypotension"
    ],
    "specialty": "Emergency Medicine / Trauma",
    "category": "Surgery"
  },
  {
    "id": "COND-0005",
    "name": "Acute Appendicitis with Localized Peritonitis",
    "aliases": [
      "Acute Appendicitis",
      "Appendicitis",
      "Perforated appendicitis"
    ],
    "keywords": [
      "appendix",
      "mcburney",
      "rlq pain",
      "leukocytosis",
      "peritonitis",
      "ultrasound"
    ],
    "specialty": "General & Pediatric Surgery",
    "category": "Surgery"
  },
  {
    "id": "COND-0006",
    "name": "Acute Mesenteric Ischemia",
    "aliases": [
      "Mesenteric Ischemia",
      "Bowel ischemia",
      "Intestinal ischemia"
    ],
    "keywords": [
      "mesenteric",
      "bowel",
      "ischemia",
      "pain out of proportion",
      "lactate",
      "sma"
    ],
    "specialty": "Vascular Surgery / Gastroenterology",
    "category": "Surgery"
  },
  {
    "id": "COND-0007",
    "name": "Carbon Monoxide Poisoning",
    "aliases": [
      "CO Poisoning",
      "Carbon monoxide toxicity"
    ],
    "keywords": [
      "carbon monoxide",
      "carboxyhemoglobin",
      "headache",
      "cherry red",
      "hyperbaric"
    ],
    "specialty": "Toxicology / Emergency Medicine",
    "category": "Medicine"
  },
  {
    "id": "COND-0008",
    "name": "Primary Biliary Cholangitis",
    "aliases": [
      "PBC",
      "Primary biliary cirrhosis",
      "Autoimmune cholangitis"
    ],
    "keywords": [
      "pbc",
      "ama",
      "antimitochondrial",
      "cholestasis",
      "alp",
      "pruritus",
      "liver"
    ],
    "specialty": "Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0009",
    "name": "Primary Sclerosing Cholangitis",
    "aliases": [
      "PSC",
      "Sclerosing cholangitis"
    ],
    "keywords": [
      "psc",
      "mrcp",
      "beading",
      "ulcerative colitis",
      "bile duct",
      "cholestasis"
    ],
    "specialty": "Hepatology / Gastroenterology",
    "category": "Medicine"
  },
  {
    "id": "COND-0010",
    "name": "Hepatitis A",
    "aliases": [
      "HAV",
      "Acute hepatitis A",
      "Viral hepatitis A"
    ],
    "keywords": [
      "hepatitis",
      "hav",
      "fecal oral",
      "igm",
      "jaundice",
      "liver"
    ],
    "specialty": "Infectious Diseases / Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0011",
    "name": "Hepatitis B",
    "aliases": [
      "HBV",
      "Acute hepatitis B",
      "Chronic hepatitis B",
      "Viral hepatitis B"
    ],
    "keywords": [
      "hepatitis",
      "hbv",
      "hbsag",
      "dna",
      "jaundice",
      "liver",
      "cirrhosis"
    ],
    "specialty": "Infectious Diseases / Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0012",
    "name": "Hepatitis C",
    "aliases": [
      "HCV",
      "Acute hepatitis C",
      "Chronic hepatitis C",
      "Viral hepatitis C"
    ],
    "keywords": [
      "hepatitis",
      "hcv",
      "bloodborne",
      "rna",
      "cirrhosis",
      "liver"
    ],
    "specialty": "Infectious Diseases / Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0013",
    "name": "Hepatitis D",
    "aliases": [
      "HDV",
      "Delta hepatitis"
    ],
    "keywords": [
      "hepatitis",
      "hdv",
      "delta",
      "coinfection",
      "superinfection",
      "hbv"
    ],
    "specialty": "Infectious Diseases / Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0014",
    "name": "Hepatitis E",
    "aliases": [
      "HEV",
      "Acute hepatitis E"
    ],
    "keywords": [
      "hepatitis",
      "hev",
      "pregnancy",
      "waterborne",
      "fulminant",
      "liver"
    ],
    "specialty": "Infectious Diseases / Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0015",
    "name": "Autoimmune Cholangiopathy",
    "aliases": [
      "Autoimmune cholangitis",
      "AIC"
    ],
    "keywords": [
      "autoimmune",
      "cholangiopathy",
      "cholestasis",
      "ana",
      "liver"
    ],
    "specialty": "Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0016",
    "name": "Autoimmune Pancreatitis",
    "aliases": [
      "AIP",
      "IgG4-related pancreatitis"
    ],
    "keywords": [
      "autoimmune",
      "pancreatitis",
      "igg4",
      "sausage pancreas",
      "steroid response"
    ],
    "specialty": "Gastroenterology",
    "category": "Medicine"
  },
  {
    "id": "COND-0017",
    "name": "Autoimmune Thyroiditis",
    "aliases": [
      "Hashimoto Thyroiditis",
      "Hashimoto disease",
      "Chronic lymphocytic thyroiditis"
    ],
    "keywords": [
      "autoimmune",
      "thyroiditis",
      "hashimoto",
      "tpo",
      "hypothyroidism"
    ],
    "specialty": "Endocrinology",
    "category": "Medicine"
  },
  {
    "id": "COND-0018",
    "name": "Acute Cholecystitis",
    "aliases": [
      "Cholecystitis",
      "Calculous cholecystitis"
    ],
    "keywords": [
      "gallbladder",
      "murphy sign",
      "ruq pain",
      "gallstones",
      "ultrasound"
    ],
    "specialty": "General Surgery",
    "category": "Surgery"
  },
  {
    "id": "COND-0019",
    "name": "Choledocholithiasis",
    "aliases": [
      "Bile duct stone",
      "Common bile duct stone"
    ],
    "keywords": [
      "cbd",
      "gallstone",
      "jaundice",
      "biliary colic",
      "ercp"
    ],
    "specialty": "Gastroenterology / Surgery",
    "category": "Medicine"
  },
  {
    "id": "COND-0020",
    "name": "Ascending Cholangitis",
    "aliases": [
      "Acute cholangitis",
      "Bacterial cholangitis"
    ],
    "keywords": [
      "charcot triad",
      "reynolds pentad",
      "biliary sepsis",
      "ercp",
      "jaundice"
    ],
    "specialty": "Gastroenterology / Critical Care",
    "category": "Medicine"
  },
  {
    "id": "COND-0021",
    "name": "Nonalcoholic Fatty Liver Disease",
    "aliases": [
      "NAFLD",
      "MASLD",
      "Metabolic dysfunction-associated steatotic liver disease",
      "Hepatic steatosis"
    ],
    "keywords": [
      "nafld",
      "masld",
      "fatty liver",
      "metabolic",
      "steatosis",
      "ultrasound"
    ],
    "specialty": "Hepatology / Endocrinology",
    "category": "Medicine"
  },
  {
    "id": "COND-0022",
    "name": "Nonalcoholic Steatohepatitis",
    "aliases": [
      "NASH",
      "MASH",
      "Metabolic steatohepatitis"
    ],
    "keywords": [
      "nash",
      "mash",
      "steatohepatitis",
      "fibrosis",
      "ballooning",
      "liver biopsy"
    ],
    "specialty": "Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0023",
    "name": "Cellulitis",
    "aliases": [
      "Lower limb cellulitis",
      "Erysipelas"
    ],
    "keywords": [
      "cellulitis",
      "erythema",
      "lymphangitis",
      "staphylococcus",
      "streptococcus",
      "fever"
    ],
    "specialty": "Dermatology / Infectious Diseases",
    "category": "Medicine"
  },
  {
    "id": "COND-0024",
    "name": "Necrotizing Fasciitis",
    "aliases": [
      "Necrotizing soft tissue infection",
      "NSTI",
      "Gas gangrene"
    ],
    "keywords": [
      "necrotizing",
      "fasciitis",
      "crepitus",
      "pain out of proportion",
      "surgical emergency"
    ],
    "specialty": "General Surgery / Critical Care",
    "category": "Surgery"
  },
  {
    "id": "COND-0025",
    "name": "Deep Vein Thrombosis",
    "aliases": [
      "DVT",
      "Lower extremity DVT",
      "Venous thrombosis"
    ],
    "keywords": [
      "dvt",
      "thrombosis",
      "swelling",
      "d dimer",
      "duplex ultrasound",
      "calf pain"
    ],
    "specialty": "Vascular Medicine / Hematology",
    "category": "Medicine"
  },
  {
    "id": "COND-0026",
    "name": "Pulmonary Embolism",
    "aliases": [
      "PE",
      "Acute pulmonary embolism",
      "Thromboembolism"
    ],
    "keywords": [
      "pe",
      "dyspnea",
      "chest pain",
      "ctpa",
      "tachycardia",
      "dvt"
    ],
    "specialty": "Pulmonology / Critical Care",
    "category": "Medicine"
  },
  {
    "id": "COND-0027",
    "name": "Wilson Disease",
    "aliases": [
      "Hepatolenticular degeneration"
    ],
    "keywords": [
      "wilson",
      "copper",
      "ceruloplasmin",
      "kayser fleischer",
      "liver",
      "neurologic"
    ],
    "specialty": "Hepatology / Neurology",
    "category": "Medicine"
  },
  {
    "id": "COND-0028",
    "name": "Hereditary Hemochromatosis",
    "aliases": [
      "Hemochromatosis",
      "Iron overload disorder"
    ],
    "keywords": [
      "hemochromatosis",
      "ferritin",
      "transferrin saturation",
      "hfe",
      "bronze diabetes"
    ],
    "specialty": "Hematology / Hepatology",
    "category": "Medicine"
  },
  {
    "id": "COND-0029",
    "name": "Spontaneous Bacterial Peritonitis",
    "aliases": [
      "SBP",
      "Infected ascites"
    ],
    "keywords": [
      "sbp",
      "ascites",
      "paracentesis",
      "pmn",
      "cirrhosis",
      "peritonitis"
    ],
    "specialty": "Hepatology / Infectious Diseases",
    "category": "Medicine"
  },
  {
    "id": "COND-0030",
    "name": "Acute Pancreatitis",
    "aliases": [
      "Pancreatitis",
      "Acute necrotizing pancreatitis"
    ],
    "keywords": [
      "pancreatitis",
      "lipase",
      "epigastric pain",
      "gallstones",
      "alcohol",
      "ct"
    ],
    "specialty": "Gastroenterology",
    "category": "Medicine"
  }
];

  // ==========================================================================
  // DUPLICATE CASE DETECTION ENGINE
  // ==========================================================================
  function detectDuplicateCase(candidateCase, existingCases = []) {
    if (!candidateCase) return { isDuplicate: false, similarity: 0 };
    const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const candId = String(candidateCase.id || '').toLowerCase().trim();
    const candTitle = candidateCase.title || '';

    const wordSim = (s1, s2) => {
      const w1 = new Set(norm(s1).split(' ').filter(w => w.length > 2));
      const w2 = new Set(norm(s2).split(' ').filter(w => w.length > 2));
      if (w1.size === 0 || w2.size === 0) return 0;
      let inter = 0;
      w1.forEach(w => { if (w2.has(w)) inter++; });
      const union = new Set([...w1, ...w2]).size;
      return Math.round((inter / union) * 100);
    };

    for (const existing of existingCases) {
      if (String(existing.id).toLowerCase().trim() === candId) {
        return {
          isDuplicate: true,
          type: 'EXACT_ID',
          similarity: 100,
          existingCase: existing,
          message: `Case ID "${candidateCase.id}" already exists. Case IDs must be unique.`
        };
      }

      const titleSim = wordSim(candTitle, existing.title);
      if (titleSim >= 80) {
        return {
          isDuplicate: true,
          type: 'TITLE_SIMILARITY',
          similarity: titleSim,
          existingCase: existing,
          message: `Case title is very similar (${titleSim}% match) to existing case ${existing.id}: "${existing.title}".`
        };
      }

      if (Array.isArray(candidateCase.stages) && Array.isArray(existing.stages)) {
        let maxStageSim = 0;
        let matchedStageTitle = '';
        candidateCase.stages.forEach(cStg => {
          existing.stages.forEach(eStg => {
            const sim = wordSim(cStg.clue, eStg.clue);
            if (sim > maxStageSim) {
              maxStageSim = sim;
              matchedStageTitle = eStg.title || `Stage ${eStg.stage}`;
            }
          });
        });

        if (maxStageSim >= 75) {
          return {
            isDuplicate: true,
            type: 'STAGE_SIMILARITY',
            similarity: maxStageSim,
            existingCase: existing,
            message: `Stage clue content is very similar (${maxStageSim}% match) to stage "${matchedStageTitle}" in existing case ${existing.id}.`
          };
        }
      }
    }

    return { isDuplicate: false, similarity: 0 };
  }

  // ==========================================================================
  // CASE INVENTORY CSV GENERATION ENGINE
  // ==========================================================================
  function generateCaseInventoryCSV(caseList = []) {
    const headers = [
      'case_id',
      'title',
      'category',
      'subcategory',
      'difficulty',
      'status',
      'starting_lives',
      'primary_diagnosis',
      'clinical_summary'
    ];

    const escapeCSV = (val) => {
      const str = String(val || '').replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = [headers.map(escapeCSV).join(',')];
    caseList.forEach(c => {
      rows.push([
        escapeCSV(c.id),
        escapeCSV(c.title),
        escapeCSV(c.category),
        escapeCSV(c.subcategory),
        escapeCSV(c.difficulty || 'Progressive'),
        escapeCSV(c.status || 'Published'),
        escapeCSV(c.settings?.startingLives || 5),
        escapeCSV(c.diagnosis?.correctAnswer || ''),
        escapeCSV(c.explanation?.clinicalSummary || '')
      ].join(','));
    });

    return rows.join('\r\n');
  }

  // ==========================================================================
  // 2C. CONDITION REPOSITORY (Clinical Autocomplete & Inventory Engine)
  // ==========================================================================
  const ConditionRepository = {
    _conditions: [],

    async init() {
      this._conditions = JSON.parse(JSON.stringify(DEFAULT_SEED_CONDITIONS));
      if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
        try {
          const resp = await fetch('data/conditions.json');
          if (resp.ok) {
            const data = await resp.json();
            const list = Array.isArray(data) ? data : (data.conditions || []);
            if (list.length > 0) this._conditions = list;
          }
        } catch (e) {
          console.info('[ConditionRepository] Using embedded seed conditions.');
        }
      }
      return this._conditions;
    },

    getAll() {
      return [...this._conditions];
    },

    getById(id) {
      if (!id) return null;
      return this._conditions.find(c => String(c.id).toLowerCase() === String(id).toLowerCase()) || null;
    },

    resolveCondition(query) {
      if (!query) return null;
      const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const normQ = norm(query);
      if (!normQ) return null;

      // Exact name match
      let found = this._conditions.find(c => norm(c.name) === normQ);
      if (found) return found.name;

      // Exact alias match
      found = this._conditions.find(c => (c.aliases || []).some(a => norm(a) === normQ));
      if (found) return found.name;

      // Top search match if high relevance
      const searchRes = this.search(query, 1);
      if (searchRes.length > 0) {
        const top = searchRes[0];
        if (norm(top.name) === normQ || (top.aliases || []).some(a => norm(a) === normQ)) {
          return top.name;
        }
      }
      return null;
    },

    search(query, maxResults = 8) {
      const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const normQ = norm(query);
      if (!normQ) return [];

      const queryTokens = normQ.split(' ').filter(Boolean);
      const scored = [];

      const levenshtein = (s1, s2) => {
        const m = s1.length, n = s2.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
          }
        }
        return dp[m][n];
      };

      this._conditions.forEach(item => {
        const normName = norm(item.name);
        const normAliases = (item.aliases || []).map(norm);
        const normKeywords = (item.keywords || []).map(norm);
        const nameTokens = normName.split(' ');

        let score = 0;
        let matchedBy = 'name';

        if (normName === normQ) {
          score += 100;
        } else if (normAliases.includes(normQ)) {
          score += 90;
          matchedBy = 'alias';
        } else if (normName.startsWith(normQ)) {
          score += 75;
        } else if (normAliases.some(a => a.startsWith(normQ))) {
          score += 70;
          matchedBy = 'alias';
        } else if (queryTokens.every(qt => normName.includes(qt))) {
          score += 60;
        } else if (queryTokens.every(qt => normAliases.some(a => a.includes(qt)))) {
          score += 55;
          matchedBy = 'alias';
        } else if (normKeywords.some(kw => kw.includes(normQ) || queryTokens.includes(kw))) {
          score += 40;
          matchedBy = 'keyword';
        } else if (queryTokens.some(qt => nameTokens.some(nt => nt.startsWith(qt)))) {
          score += 30;
        }

        if (score === 0 && normQ.length >= 4) {
          for (const token of nameTokens) {
            if (token.length >= 4) {
              const dist = levenshtein(normQ, token);
              if (dist <= 2) {
                score = 35 - dist * 5;
                matchedBy = 'typo';
                break;
              }
            }
          }
          if (score === 0) {
            for (const alias of normAliases) {
              for (const at of alias.split(' ')) {
                if (at.length >= 4) {
                  const dist = levenshtein(normQ, at);
                  if (dist <= 2) {
                    score = 30 - dist * 5;
                    matchedBy = 'typo';
                    break;
                  }
                }
              }
            }
          }
        }

        if (score > 0) {
          scored.push({ condition: item, score, matchedBy });
        }
      });

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, maxResults).map(s => s.condition);
    }
  };

  // ==========================================================================
  // 3A. LOCAL CASE REPOSITORY (Layer B: LocalStorage + JSON Seed Cases)
  // ==========================================================================
  const LocalCaseRepository = {
    _cases: [],

    async init() {
      // 1. Load from localStorage if present
      let loaded = StorageService.get(StorageService.KEYS.CASES);
      if (!Array.isArray(loaded) || loaded.length === 0) {
        loaded = JSON.parse(JSON.stringify(DEFAULT_SEED_CASES));
      } else {
        // Automatically merge any default seed cases that are not yet in localStorage
        DEFAULT_SEED_CASES.forEach(seed => {
          const exists = loaded.some(c => String(c.id).toLowerCase() === String(seed.id).toLowerCase());
          if (!exists) {
            loaded.push(JSON.parse(JSON.stringify(seed)));
          }
        });
      }

      // Ensure status is normalized on all cases
      loaded.forEach(c => {
        if (!c.status) c.status = 'Published';
      });

      this._cases = loaded;
      StorageService.set(StorageService.KEYS.CASES, this._cases);

      // 2. If running on HTTP/HTTPS, attempt to fetch from data/cases.json to sync any external additions
      if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
        try {
          const resp = await fetch('data/cases.json');
          if (resp.ok) {
            const data = await resp.json();
            const casesArray = Array.isArray(data) ? data : (data.cases || []);
            if (casesArray.length > 0) {
              casesArray.forEach(remoteCase => {
                if (!remoteCase.status) remoteCase.status = 'Published';
                const exists = this._cases.some(c => String(c.id).toLowerCase() === String(remoteCase.id).toLowerCase());
                if (!exists) {
                  this._cases.push(remoteCase);
                }
              });
              StorageService.set(StorageService.KEYS.CASES, this._cases);
            }
          }
        } catch (e) {
          console.info('[LocalCaseRepository] Local data/cases.json fetch skipped/failed, keeping local cases.');
        }
      }

      return this._cases;
    },

    getAllCases() {
      return [...this._cases];
    },

    getAll() {
      return [...this._cases];
    },

    getCase(caseId) {
      if (!caseId) return null;
      return this._cases.find(c => String(c.id).toLowerCase() === String(caseId).toLowerCase()) || null;
    },

    getById(id) {
      return this.getCase(id);
    },

    getStage(caseId, stageNumber) {
      const c = this.getCase(caseId);
      if (!c || !Array.isArray(c.stages)) return null;
      const num = Number(stageNumber);
      return c.stages.find(s => s.stage === num) || c.stages[num - 1] || null;
    },

    searchCases(query = '', category = '') {
      const q = String(query).toLowerCase().trim();
      const cat = String(category).toLowerCase().trim();
      return this._cases.filter(c => {
        const matchQ = !q ||
          (c.title && c.title.toLowerCase().includes(q)) ||
          (c.id && c.id.toLowerCase().includes(q)) ||
          (c.subcategory && c.subcategory.toLowerCase().includes(q)) ||
          (c.patient?.summary && c.patient.summary.toLowerCase().includes(q));
        const matchCat = !cat || cat === 'all' || (c.category && c.category.toLowerCase() === cat);
        return matchQ && matchCat;
      });
    },

    saveCase(caseObj) {
      const val = this.validateCase(caseObj);
      if (!val.valid) {
        throw new Error(val.errors.join('; '));
      }

      if (!caseObj.status) caseObj.status = 'Published';

      const existingIndex = this._cases.findIndex(c => String(c.id).toLowerCase() === String(caseObj.id).toLowerCase());
      if (existingIndex >= 0) {
        this._cases[existingIndex] = caseObj;
      } else {
        this._cases.push(caseObj);
      }

      StorageService.set(StorageService.KEYS.CASES, this._cases);
      return caseObj;
    },

    save(caseObj) {
      return this.saveCase(caseObj);
    },

    updateCase(caseObj) {
      return this.saveCase(caseObj);
    },

    deleteCase(caseId) {
      this._cases = this._cases.filter(c => String(c.id).toLowerCase() !== String(caseId).toLowerCase());
      StorageService.set(StorageService.KEYS.CASES, this._cases);
      return true;
    },

    delete(id) {
      return this.deleteCase(id);
    },

    duplicateCase(caseId) {
      const original = this.getCase(caseId);
      if (!original) throw new Error(`Case ${caseId} not found.`);

      let counter = 1;
      let newId = `${original.id}-COPY`;
      while (this.getCase(newId)) {
        counter++;
        newId = `${original.id}-COPY-${counter}`;
      }

      const clone = JSON.parse(JSON.stringify(original));
      clone.id = newId;
      clone.title = `${original.title} (Duplicate)`;
      clone.status = original.status || 'Published';

      this._cases.push(clone);
      StorageService.set(StorageService.KEYS.CASES, this._cases);
      return clone;
    },

    duplicate(id) {
      return this.duplicateCase(id);
    },

    resetToDemoData() {
      this._cases = JSON.parse(JSON.stringify(DEFAULT_SEED_CASES));
      this._cases.forEach(c => {
        if (!c.status) c.status = 'Published';
      });
      StorageService.set(StorageService.KEYS.CASES, this._cases);
      return this._cases;
    },

    validateCase(c) {
      const errors = [];
      const warnings = [];

      if (!c || typeof c !== 'object') {
        errors.push('Case item is not a valid JSON object.');
        return { valid: false, errors, warnings };
      }

      if (!c.id || typeof c.id !== 'string' || !c.id.trim()) {
        errors.push('Missing or invalid case "id" field.');
      }
      if (!c.title || typeof c.title !== 'string' || !c.title.trim()) {
        errors.push('Missing or invalid case "title" field.');
      }
      if (!c.stages || !Array.isArray(c.stages) || c.stages.length === 0) {
        errors.push('Case must contain a "stages" array with at least 1 stage.');
      } else {
        c.stages.forEach((stg, i) => {
          if (!stg.clue || typeof stg.clue !== 'string' || !stg.clue.trim()) {
            errors.push(`Stage ${i + 1} is missing the "clue" text.`);
          }
        });
      }

      if (!c.diagnosis || typeof c.diagnosis !== 'object' || !c.diagnosis.correctAnswer) {
        errors.push('Missing "diagnosis.correctAnswer" string.');
      }

      if (!c.category) {
        warnings.push('Category is empty; will default to "Medicine".');
      }

      return {
        valid: errors.length === 0,
        errors,
        warnings
      };
    },

    importCases(parsedData) {
      let candidateList = [];

      if (Array.isArray(parsedData)) {
        candidateList = parsedData;
      } else if (parsedData && Array.isArray(parsedData.cases)) {
        candidateList = parsedData.cases;
      } else if (parsedData && typeof parsedData === 'object' && parsedData.id) {
        candidateList = [parsedData];
      } else {
        return {
          totalDetected: 0,
          validCases: [],
          errors: ['JSON format unrecognised. Expected single case object or {"cases": [...]}.'],
          warnings: []
        };
      }

      const validCases = [];
      const validationReport = [];

      candidateList.forEach((item, idx) => {
        const val = this.validateCase(item);
        if (val.valid) {
          const normalized = {
            id: String(item.id).trim(),
            title: String(item.title).trim(),
            category: item.category || 'Medicine',
            subcategory: item.subcategory || '',
            difficulty: item.difficulty || 'Progressive',
            status: item.status || 'Published',
            settings: {
              startingLives: item.settings?.startingLives || 5,
              lifeLossPerWrongAnswer: item.settings?.lifeLossPerWrongAnswer || 1,
              showNextClueAfterWrong: true,
              showAnswerAfterLivesZero: true,
              startingScore: item.settings?.startingScore || 1000,
              wrongAnswerScorePenalty: item.settings?.wrongAnswerScorePenalty || 100
            },
            patient: {
              age: item.patient?.age || 'Adult',
              sex: item.patient?.sex || 'Unknown',
              summary: item.patient?.summary || ''
            },
            stages: item.stages.map((stg, sIdx) => ({
              stage: sIdx + 1,
              title: stg.title || `Stage ${sIdx + 1}`,
              clue: stg.clue
            })),
            diagnosis: {
              correctAnswer: item.diagnosis.correctAnswer,
              acceptedAnswers: Array.isArray(item.diagnosis.acceptedAnswers) ? item.diagnosis.acceptedAnswers : [item.diagnosis.correctAnswer]
            },
            explanation: {
              clinicalSummary: item.explanation?.clinicalSummary || '',
              reasoning: item.explanation?.reasoning || '',
              learningPoints: Array.isArray(item.explanation?.learningPoints) ? item.explanation.learningPoints : []
            },
            references: Array.isArray(item.references) ? item.references : []
          };

          validCases.push(normalized);
          validationReport.push({ item: normalized.id, valid: true });
        } else {
          validationReport.push({
            item: item.id || `Item #${idx + 1}`,
            valid: false,
            errors: val.errors
          });
        }
      });

      return {
        totalDetected: candidateList.length,
        validCases,
        report: validationReport
      };
    },

    commitImport(validCases) {
      validCases.forEach(newCase => {
        const idx = this._cases.findIndex(c => c.id.toLowerCase() === newCase.id.toLowerCase());
        if (idx >= 0) {
          this._cases[idx] = newCase;
        } else {
          this._cases.push(newCase);
        }
      });
      StorageService.set(StorageService.KEYS.CASES, this._cases);
      return validCases.length;
    },

    exportCase(caseId) {
      const c = this.getCase(caseId);
      if (!c) throw new Error(`Case ${caseId} not found.`);
      return JSON.stringify(c, null, 2);
    },

    exportAllCases() {
      return JSON.stringify({
        schemaVersion: "2.0",
        generatedAt: new Date().toISOString(),
        source: "WiseCases Clinical Curriculum Studio",
        totalCases: this._cases.length,
        cases: this._cases
      }, null, 2);
    },

    submitAnswer(caseId, stageNumber, answer) {
      const c = this.getCase(caseId);
      if (!c) return { correct: false, error: 'Case not found' };

      const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const userNorm = norm(answer);
      if (!userNorm) return { correct: false, error: 'Empty input' };

      const diag = c.diagnosis || {};
      const primary = norm(diag.primary || diag.correctAnswer);
      let match = (userNorm === primary);
      if (!match && Array.isArray(diag.acceptedAnswers)) {
        match = diag.acceptedAnswers.some(a => norm(a) === userNorm);
      }
      if (!match && Array.isArray(diag.aliases)) {
        match = diag.aliases.some(a => norm(a) === userNorm);
      }

      return {
        correct: match,
        caseId: c.id,
        stage: stageNumber,
        answer: answer,
        timestamp: new Date().toISOString()
      };
    }
  };

  // ==========================================================================
  // 3B. GOOGLE SHEETS CASE REPOSITORY (Layer B: Prepared for Google Apps Script)
  // ==========================================================================
  const GoogleSheetsCaseRepository = {
    async _request(action, payload = {}) {
      const config = WISECASES_CONFIG.googleAppsScript;
      if (!config || !config.baseUrl) {
        throw new Error('[GoogleSheetsCaseRepository] Google Apps Script baseUrl is not configured.');
      }
      const url = new URL(config.baseUrl);
      url.searchParams.set('action', action);
      const isPost = payload && Object.keys(payload).length > 0;
      const resp = await fetch(url.toString(), {
        method: isPost ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: isPost ? JSON.stringify(payload) : undefined
      });
      if (!resp.ok) {
        throw new Error(`[GoogleSheetsCaseRepository] HTTP error ${resp.status}`);
      }
      return await resp.json();
    },

    async getAllCases() {
      return await this._request('GET_CASES');
    },

    async getCase(caseId) {
      return await this._request('GET_CASE', { caseId });
    },

    async getStage(caseId, stageNumber) {
      return await this._request('GET_STAGE', { caseId, stageNumber });
    },

    async submitAnswer(caseId, stageNumber, answer) {
      // Answer Security: Evaluated remotely in Google Apps Script against private sheet
      return await this._request('SUBMIT_ANSWER', { caseId, stage: stageNumber, answer });
    },

    async saveResult(resultRecord) {
      return await this._request('SAVE_RESULT', resultRecord);
    }
  };

  // ==========================================================================
  // 3C. CASE REPOSITORY FACADE (Layer B Public Contract)
  // ==========================================================================
  const CaseRepository = {
    get activeRepo() {
      const mode = WISECASES_CONFIG.mode;
      const googleMode = mode === 'google' || mode === 'google-apps-script';
      if (googleMode && WISECASES_CONFIG.googleAppsScript?.enabled && WISECASES_CONFIG.googleAppsScript?.baseUrl) {
        return GoogleSheetsCaseRepository;
      }
      return LocalCaseRepository;
    },

    async init() {
      return await LocalCaseRepository.init();
    },

    getAllCases() {
      return LocalCaseRepository.getAllCases();
    },

    getAll() {
      return LocalCaseRepository.getAll();
    },

    getCase(caseId) {
      return LocalCaseRepository.getCase(caseId);
    },

    getById(id) {
      return LocalCaseRepository.getById(id);
    },

    getStage(caseId, stageNumber) {
      return LocalCaseRepository.getStage(caseId, stageNumber);
    },

    searchCases(query, category) {
      return LocalCaseRepository.searchCases(query, category);
    },

    saveCase(caseObj) {
      return LocalCaseRepository.saveCase(caseObj);
    },

    save(caseObj) {
      return LocalCaseRepository.save(caseObj);
    },

    updateCase(caseObj) {
      return LocalCaseRepository.updateCase(caseObj);
    },

    duplicateCase(caseId) {
      return LocalCaseRepository.duplicateCase(caseId);
    },

    duplicate(id) {
      return LocalCaseRepository.duplicate(id);
    },

    deleteCase(caseId) {
      return LocalCaseRepository.deleteCase(caseId);
    },

    delete(id) {
      return LocalCaseRepository.delete(id);
    },

    validateCase(c) {
      return LocalCaseRepository.validateCase(c);
    },

    importCases(parsedData) {
      return LocalCaseRepository.importCases(parsedData);
    },

    commitImport(validCases) {
      return LocalCaseRepository.commitImport(validCases);
    },

    exportCase(caseId) {
      return LocalCaseRepository.exportCase(caseId);
    },

    exportAllCases() {
      return LocalCaseRepository.exportAllCases();
    },

    submitAnswer(caseId, stageNumber, answer) {
      return this.activeRepo.submitAnswer(caseId, stageNumber, answer);
    },

    resetToDemoData() {
      return LocalCaseRepository.resetToDemoData();
    },

    ConditionRepository,
    detectDuplicateCase,
    generateCaseInventoryCSV
  };

  // ==========================================================================
  // 4. RESULT REPOSITORY (Persists diagnostic history in localStorage)
  // ==========================================================================
  const ResultRepository = {
    _results: [],

    init() {
      const stored = StorageService.get(StorageService.KEYS.RESULTS, []);
      this._results = Array.isArray(stored) ? stored : [];
      return this._results;
    },

    getAll() {
      return [...this._results];
    },

    saveResult(res) {
      const pId = res.playerId || res.player_id || PlayerService.getPlayerId();
      const record = {
        playerId: pId,
        player_id: pId,
        id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        caseId: res.caseId,
        caseTitle: res.caseTitle,
        score: res.score,
        livesUsed: res.livesUsed,
        startingLives: res.startingLives,
        stagesReached: res.stagesReached,
        totalStages: res.totalStages,
        attempts: res.attempts,
        won: Boolean(res.won),
        completedAt: new Date().toISOString()
      };

      this._results.unshift(record);
      StorageService.set(StorageService.KEYS.RESULTS, this._results);
      return record;
    },

    getAnalytics() {
      const total = this._results.length;
      if (total === 0) {
        return {
          casesPlayed: 0,
          casesCompleted: 0,
          correctDiagnoses: 0,
          failedCases: 0,
          averageScore: 0,
          accuracyRate: '0%'
        };
      }

      let totalScore = 0;
      let totalWins = 0;
      let totalAttemptsCount = 0;
      let correctAttemptsCount = 0;

      this._results.forEach(r => {
        totalScore += (r.score || 0);
        if (r.won) {
          totalWins++;
          correctAttemptsCount++;
        }
        if (Array.isArray(r.attempts)) {
          totalAttemptsCount += r.attempts.length;
        } else {
          totalAttemptsCount += 1;
        }
      });

      const avgScore = Math.round(totalScore / total);
      const accuracy = totalAttemptsCount > 0 
        ? Math.round((correctAttemptsCount / totalAttemptsCount) * 100) 
        : 0;

      return {
        casesPlayed: total,
        casesCompleted: total,
        correctDiagnoses: totalWins,
        failedCases: total - totalWins,
        averageScore: avgScore,
        accuracyRate: `${accuracy}%`
      };
    },

    clearHistory() {
      this._results = [];
      StorageService.remove(StorageService.KEYS.RESULTS);
      return true;
    }
  };

  // ==========================================================================
  // 5. GAME ENGINE (Progressive clinical deduction loop)
  // ==========================================================================
  const GameEngine = {
    activeCase: null,
    isPreview: false,
    currentStageIndex: 0,
    livesRemaining: 5,
    maxLives: 5,
    lifeLossPerWrong: 1,
    currentScore: 1000,
    wrongScorePenalty: 100,
    submittedAttempts: [],
    isFinished: false,
    isWon: false,

    startCase(caseObj, isPreview = false) {
      if (!caseObj) throw new Error('No case provided to GameEngine.');
      
      this.activeCase = JSON.parse(JSON.stringify(caseObj));
      this.isPreview = Boolean(isPreview);
      this.currentStageIndex = 0;
      
      const settings = this.activeCase.settings || {};
      this.maxLives = Number(settings.startingLives) || 5;
      this.livesRemaining = this.maxLives;
      this.lifeLossPerWrong = Number(settings.lifeLossPerWrongAnswer) || 1;
      this.currentScore = Number(settings.startingScore) || 1000;
      this.wrongScorePenalty = Number(settings.wrongAnswerScorePenalty) || 100;
      
      this.submittedAttempts = [];
      this.isFinished = false;
      this.isWon = false;

      return this.getState();
    },

    getState() {
      return {
        case: this.activeCase,
        isPreview: this.isPreview,
        currentStageIndex: this.currentStageIndex,
        totalStages: this.activeCase ? this.activeCase.stages.length : 0,
        revealedStages: this.activeCase ? this.activeCase.stages.slice(0, this.currentStageIndex + 1) : [],
        livesRemaining: this.livesRemaining,
        maxLives: this.maxLives,
        currentScore: this.currentScore,
        submittedAttempts: [...this.submittedAttempts],
        isFinished: this.isFinished,
        isWon: this.isWon
      };
    },

    normalizeString(str) {
      if (!str) return '';
      return String(str)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    },

    checkAnswerMatch(userAnswer) {
      const normalizedUser = this.normalizeString(userAnswer);
      if (!normalizedUser) return false;

      // Evaluated via Layer B Repository abstraction
      const res = LocalCaseRepository.submitAnswer(this.activeCase.id, this.currentStageIndex + 1, userAnswer);
      return Boolean(res.correct);
    },

    submitDiagnosis(userAnswer) {
      if (this.isFinished) {
        return { status: 'FINISHED', state: this.getState() };
      }

      const trimmedAnswer = String(userAnswer || '').trim();
      if (!trimmedAnswer) {
        return { status: 'EMPTY_INPUT', state: this.getState() };
      }

      const isMatch = this.checkAnswerMatch(trimmedAnswer);
      const stageNum = this.currentStageIndex + 1;
      const normAns = this.normalizeString(trimmedAnswer);

      // Determine Canonical Matched Condition
      let matchedCondition = trimmedAnswer;
      if (isMatch) {
        matchedCondition = this.activeCase.diagnosis?.primary || this.activeCase.diagnosis?.correctAnswer || trimmedAnswer;
      } else {
        const diffs = this.activeCase.differentialDiagnoses || [];
        const matchedDiff = diffs.find(d => {
          const dName = this.normalizeString(d.diagnosis || d.name);
          return dName && (dName === normAns || (d.aliases || []).some(a => this.normalizeString(a) === normAns));
        });
        if (matchedDiff) {
          matchedCondition = matchedDiff.diagnosis || matchedDiff.name;
        } else {
          const wrongList = this.activeCase.wrongAnswerExplanations || [];
          const matchedWrong = wrongList.find(w => {
            const wName = this.normalizeString(w.diagnosis || w.condition || w.answer);
            return wName && (wName === normAns || (w.aliases || []).some(a => this.normalizeString(a) === normAns));
          });
          if (matchedWrong) {
            matchedCondition = matchedWrong.diagnosis || matchedWrong.condition || matchedWrong.answer;
          } else {
            const repoMatch = (typeof ConditionRepository !== 'undefined' && ConditionRepository.resolveCondition)
              ? ConditionRepository.resolveCondition(trimmedAnswer)
              : null;
            if (repoMatch) {
              matchedCondition = repoMatch;
            }
          }
        }
      }

      if (isMatch) {
        this.isWon = true;
        this.isFinished = true;

        this.submittedAttempts.push({
          stageNumber: stageNum,
          answer: trimmedAnswer,
          submittedAnswer: trimmedAnswer,
          matchedCondition: matchedCondition,
          isCorrect: true,
          timestamp: new Date().toISOString()
        });

        // Save result if not in preview mode
        if (!this.isPreview) {
          ResultRepository.saveResult({
            caseId: this.activeCase.id,
            caseTitle: this.activeCase.title,
            score: this.currentScore,
            livesUsed: this.maxLives - this.livesRemaining,
            startingLives: this.maxLives,
            stagesReached: stageNum,
            totalStages: this.activeCase.stages.length,
            attempts: this.submittedAttempts,
            won: true
          });
        }

        const whyCorrect = this.activeCase.diagnosis?.detailedExplanation ||
                           this.activeCase.diagnosis?.shortExplanation ||
                           this.activeCase.explanation?.clinicalSummary ||
                           'Excellent clinical deduction. This diagnosis verified the full clinical and laboratory pattern.';
        const decisiveFindings = Array.isArray(this.activeCase.diagnosis?.decisiveFindings)
          ? this.activeCase.diagnosis.decisiveFindings
          : (Array.isArray(this.activeCase.decisiveFindings) ? this.activeCase.decisiveFindings : []);

        return {
          status: 'CORRECT',
          message: 'Excellent clinical reasoning. Diagnosis verified.',
          userAnswer: trimmedAnswer,
          submittedAnswer: trimmedAnswer,
          matchedCondition,
          whyCorrect,
          decisiveFindings,
          state: this.getState()
        };
      }

      // Handle Incorrect Answer
      this.livesRemaining = Math.max(0, this.livesRemaining - this.lifeLossPerWrong);
      this.currentScore = Math.max(0, this.currentScore - this.wrongScorePenalty);

      this.submittedAttempts.push({
        stageNumber: stageNum,
        answer: trimmedAnswer,
        submittedAnswer: trimmedAnswer,
        matchedCondition: matchedCondition,
        isCorrect: false,
        timestamp: new Date().toISOString()
      });

      // Construct targeted educational reasoning debrief
      let whyWrong = '';
      let missedClues = [];
      let betterDirection = '';

      const normMatched = this.normalizeString(matchedCondition);
      const wrongList = this.activeCase.wrongAnswerExplanations || [];
      const matchedWrong = wrongList.find(w => {
        const wName = this.normalizeString(w.diagnosis || w.condition || w.answer);
        return wName && (wName === normAns || wName === normMatched || (w.aliases || []).some(a => this.normalizeString(a) === normAns || this.normalizeString(a) === normMatched));
      });

      if (matchedWrong) {
        whyWrong = matchedWrong.whyWrong || matchedWrong.explanation || '';
        missedClues = Array.isArray(matchedWrong.missedClues) ? matchedWrong.missedClues : (matchedWrong.missedClues ? [matchedWrong.missedClues] : []);
        betterDirection = matchedWrong.betterDirection || matchedWrong.nextDecision || '';
      } else {
        const diffs = this.activeCase.differentialDiagnoses || [];
        const matchedDiff = diffs.find(d => {
          const dName = this.normalizeString(d.diagnosis || d.name);
          return dName && (dName === normAns || dName === normMatched || (d.aliases || []).some(a => this.normalizeString(a) === normAns || this.normalizeString(a) === normMatched));
        });

        if (matchedDiff && matchedDiff.reasonRejected) {
          whyWrong = `"${matchedDiff.diagnosis || matchedDiff.name}" was considered because ${matchedDiff.reasonConsidered || 'of clinical overlap'}, but is refuted because: ${matchedDiff.reasonRejected}`;
          if (matchedDiff.clinicalInsight) {
            missedClues = [matchedDiff.clinicalInsight];
          }
          if (matchedDiff.reasonConsidered) {
            betterDirection = `Notice how this overlaps with ${matchedDiff.reasonConsidered}, but look closer at the specific diagnostic criteria and newly revealed findings.`;
          }
        } else {
          const pitfalls = this.activeCase.whereReasoningCanGoWrong || this.activeCase.explanation?.whereReasoningCanGoWrong;
          if (Array.isArray(pitfalls) && pitfalls.length > 0) {
            whyWrong = pitfalls[0];
          } else if (typeof pitfalls === 'string' && pitfalls.trim()) {
            whyWrong = pitfalls;
          } else {
            whyWrong = `"${trimmedAnswer}" does not adequately explain the complete spectrum of laboratory findings, imaging, and chronological manifestations revealed so far. Review the newly unlocked clue.`;
          }
        }
      }

      // Check if lives exhausted
      if (this.livesRemaining <= 0) {
        this.isWon = false;
        this.isFinished = true;

        // Reveal remaining stages so the learner can study all findings
        this.currentStageIndex = this.activeCase.stages.length - 1;

        if (!this.isPreview) {
          ResultRepository.saveResult({
            caseId: this.activeCase.id,
            caseTitle: this.activeCase.title,
            score: this.currentScore,
            livesUsed: this.maxLives,
            startingLives: this.maxLives,
            stagesReached: stageNum,
            totalStages: this.activeCase.stages.length,
            attempts: this.submittedAttempts,
            won: false
          });
        }

        return {
          status: 'DEPLETED',
          message: 'You have used all available diagnostic attempts. Let us examine the complete clinical picture.',
          userAnswer: trimmedAnswer,
          submittedAnswer: trimmedAnswer,
          matchedCondition,
          whyWrong: whyWrong,
          educationalReasoning: whyWrong,
          missedClues,
          betterDirection,
          state: this.getState()
        };
      }

      // Unlock next stage if available
      const totalStages = this.activeCase.stages.length;
      let nextStageUnlocked = false;
      if (this.currentStageIndex + 1 < totalStages) {
        this.currentStageIndex++;
        nextStageUnlocked = true;
      }

      return {
        status: 'INCORRECT',
        message: 'This does not sufficiently explain the complete clinical picture.',
        userAnswer: trimmedAnswer,
        submittedAnswer: trimmedAnswer,
        matchedCondition,
        whyWrong: whyWrong,
        educationalReasoning: whyWrong,
        missedClues,
        betterDirection,
        nextStageUnlocked,
        state: this.getState()
      };
    }
  };

  // ==========================================================================
  // 5B. AUTOCOMPLETE CONTROLLER (Accessible Combobox & Diagnosis Search)
  // ==========================================================================
  const AutocompleteController = {
    inputEl: null,
    listEl: null,
    highlightedIndex: -1,
    currentMatches: [],
    isOpen: false,

    init() {
      this.inputEl = document.getElementById('game-diagnosis-input');
      this.listEl = document.getElementById('diagnosis-autocomplete-list');
      if (!this.inputEl || !this.listEl) return;

      this.bindEvents();
    },

    bindEvents() {
      let debounceTimer = null;

      this.inputEl.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.handleInput(this.inputEl.value);
        }, 120);
      });

      this.inputEl.addEventListener('keydown', (e) => {
        this.handleKeydown(e);
      });

      document.addEventListener('click', (e) => {
        if (!this.inputEl.contains(e.target) && !this.listEl.contains(e.target)) {
          this.close();
        }
      });
    },

    handleInput(val) {
      const trimmed = String(val || '').trim();
      if (!trimmed || trimmed.length < 2) {
        this.close();
        return;
      }

      const matches = ConditionRepository.search(trimmed, 8);
      this.currentMatches = matches;
      this.renderSuggestions(matches, trimmed);
    },

    renderSuggestions(items, query) {
      if (!items || items.length === 0) {
        this.close();
        return;
      }

      this.listEl.innerHTML = '';
      this.highlightedIndex = -1;

      items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.id = `autocomplete-item-${idx}`;
        li.className = 'autocomplete-item';
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', 'false');

        const cleanQ = query.replace(/[^a-zA-Z0-9]/g, '');
        let highlightedName = item.name;
        if (cleanQ) {
          const regex = new RegExp(`(${cleanQ})`, 'gi');
          highlightedName = item.name.replace(regex, '<mark>$1</mark>');
        }

        li.innerHTML = `
          <div class="autocomplete-item-name">${highlightedName}</div>
          <div class="autocomplete-item-meta">
            <span>${item.specialty || item.category || 'Clinical Diagnosis'}</span>
            ${item.aliases && item.aliases.length > 0 ? `<span>• Aka: ${item.aliases.slice(0, 2).join(', ')}</span>` : ''}
          </div>
        `;

        li.addEventListener('mousedown', (e) => {
          e.preventDefault();
          this.selectItem(item.name);
        });

        this.listEl.appendChild(li);
      });

      this.listEl.style.display = 'block';
      this.isOpen = true;
      this.inputEl.setAttribute('aria-expanded', 'true');
    },

    handleKeydown(e) {
      if (!this.isOpen || this.currentMatches.length === 0) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.highlightNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.highlightPrev();
      } else if (e.key === 'Enter') {
        if (this.highlightedIndex >= 0 && this.highlightedIndex < this.currentMatches.length) {
          e.preventDefault();
          e.stopPropagation();
          this.selectItem(this.currentMatches[this.highlightedIndex].name);
        }
      } else if (e.key === 'Escape') {
        this.close();
      }
    },

    highlightNext() {
      const count = this.currentMatches.length;
      this.highlightedIndex = (this.highlightedIndex + 1) % count;
      this.updateHighlight();
    },

    highlightPrev() {
      const count = this.currentMatches.length;
      this.highlightedIndex = (this.highlightedIndex - 1 + count) % count;
      this.updateHighlight();
    },

    updateHighlight() {
      const items = this.listEl.querySelectorAll('.autocomplete-item');
      items.forEach((item, idx) => {
        if (idx === this.highlightedIndex) {
          item.classList.add('selected');
          item.setAttribute('aria-selected', 'true');
          this.inputEl.setAttribute('aria-activedescendant', item.id);
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
          item.setAttribute('aria-selected', 'false');
        }
      });
    },

    selectItem(name) {
      if (this.inputEl) {
        this.inputEl.value = name;
        this.inputEl.focus();
      }
      this.close();
    },

    close() {
      if (this.listEl) {
        this.listEl.style.display = 'none';
        this.listEl.innerHTML = '';
      }
      this.isOpen = false;
      this.highlightedIndex = -1;
      this.currentMatches = [];
      if (this.inputEl) {
        this.inputEl.setAttribute('aria-expanded', 'false');
        this.inputEl.removeAttribute('aria-activedescendant');
      }
    }
  };

  // ==========================================================================
  // 6. UI VIEW MANAGER & APPLICATION CONTROLLER
  // ==========================================================================
  const AppUI = {
    activeView: 'home',
    currentCategoryFilter: 'All',
    searchQuery: '',

    elements: {
      views: {},
      navLinks: {},
      toastContainer: document.getElementById('toast-container'),
      mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
      navMenu: document.getElementById('nav-menu')
    },

    init() {
      this.cacheDOMElements();
      this.bindGlobalEvents();
      this.handleHashChange();
    },

    cacheDOMElements() {
      // Views
      ['home', 'library', 'game', 'result', 'results', 'admin', 'import', 'settings'].forEach(v => {
        this.elements.views[v] = document.getElementById(`view-${v}`);
      });

      // Nav Links
      document.querySelectorAll('.nav-link').forEach(link => {
        const target = link.getAttribute('data-nav');
        if (target) this.elements.navLinks[target] = link;
      });
    },

    bindGlobalEvents() {
      // Hash routing
      window.addEventListener('hashchange', () => this.handleHashChange());

      // Mobile Menu Toggle
      if (this.elements.mobileMenuToggle) {
        this.elements.mobileMenuToggle.addEventListener('click', () => {
          this.elements.navMenu.classList.toggle('menu-open');
        });
      }

      // Close mobile menu when clicking nav link
      document.querySelectorAll('.nav-link').forEach(el => {
        el.addEventListener('click', () => {
          this.elements.navMenu.classList.remove('menu-open');
        });
      });

      // Home Hero Buttons
      document.getElementById('btn-hero-start')?.addEventListener('click', () => {
        window.location.hash = '#library';
      });
      document.getElementById('btn-hero-library')?.addEventListener('click', () => {
        window.location.hash = '#library';
      });
      document.getElementById('btn-hero-results')?.addEventListener('click', () => {
        window.location.hash = '#results';
      });

      // Library Search & Category Filters (Debounced 200ms)
      const searchInput = document.getElementById('library-search-input');
      if (searchInput) {
        let searchDebounce = null;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchDebounce);
          searchDebounce = setTimeout(() => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.renderLibraryCases();
          }, 200);
        });
      }

      // Game Diagnosis Form
      const diagnosisForm = document.getElementById('game-diagnosis-form');
      if (diagnosisForm) {
        diagnosisForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleDiagnosisSubmit();
        });
      }

      // Game Back Button
      document.getElementById('btn-game-back')?.addEventListener('click', () => {
        window.location.hash = '#library';
      });

      // Result Actions
      document.getElementById('btn-result-next-case')?.addEventListener('click', () => {
        this.playNextCase();
      });
      document.getElementById('btn-result-try-again')?.addEventListener('click', () => {
        if (GameEngine.activeCase) {
          this.startGame(GameEngine.activeCase.id, GameEngine.isPreview);
        }
      });
      document.getElementById('btn-result-library')?.addEventListener('click', () => {
        window.location.hash = '#library';
      });
      document.getElementById('btn-result-my-results')?.addEventListener('click', () => {
        window.location.hash = '#results';
      });

      // My Results: Clear History
      document.getElementById('btn-clear-history')?.addEventListener('click', () => {
        this.showConfirmModal(
          'Clear Diagnostic History?',
          'Are you sure you want to clear your local performance history? This cannot be undone.',
          () => {
            ResultRepository.clearHistory();
            this.renderMyResults();
            this.showToast('Diagnostic history cleared.', 'info');
          }
        );
      });

      // Admin Action Buttons
      document.getElementById('btn-admin-new-case')?.addEventListener('click', () => {
        AdminManager.openEditor();
      });
      document.getElementById('btn-admin-import-json')?.addEventListener('click', () => {
        AdminManager.openImportModal();
      });
      document.getElementById('btn-admin-export-all')?.addEventListener('click', () => {
        AdminManager.exportAllCases();
      });
      document.getElementById('btn-admin-reset-demo')?.addEventListener('click', () => {
        this.showConfirmModal(
          'Reset Demo Data?',
          'This will restore all default clinical cases and reset local result history. Are you sure you want to proceed?',
          () => {
            CaseRepository.resetToDemoData();
            ResultRepository.clearHistory();
            this.renderLibraryCases();
            this.renderAdminCases();
            this.renderMyResults();
            this.showToast('Demo data restored successfully.', 'success');
          }
        );
      });

      // Admin Search (Debounced 200ms)
      const adminSearch = document.getElementById('admin-search-input');
      if (adminSearch) {
        let adminSearchDebounce = null;
        adminSearch.addEventListener('input', (e) => {
          clearTimeout(adminSearchDebounce);
          adminSearchDebounce = setTimeout(() => {
            AdminManager.renderTable(e.target.value.toLowerCase().trim());
          }, 200);
        });
      }

      // Case Inventory & Template Handlers
      document.getElementById('btn-admin-import-center')?.addEventListener('click', () => {
        window.location.hash = '#import';
      });
      document.getElementById('btn-admin-backup-all')?.addEventListener('click', () => {
        AdminManager.backupEverything();
      });
      document.getElementById('btn-import-back-admin')?.addEventListener('click', () => {
        window.location.hash = '#admin';
      });
      document.getElementById('btn-import-download-sample-csv')?.addEventListener('click', () => {
        if (typeof ImportCenter !== 'undefined') ImportCenter.downloadDemoCsv();
      });
      document.getElementById('btn-cancel-import-run')?.addEventListener('click', () => {
        window.location.hash = '#admin';
      });
      document.getElementById('btn-admin-import-center')?.addEventListener('click', () => {
        window.location.hash = '#import';
      });
      document.getElementById('btn-admin-backup-all')?.addEventListener('click', () => {
        AdminManager.backupEverything();
      });
      document.getElementById('btn-import-back-admin')?.addEventListener('click', () => {
        window.location.hash = '#admin';
      });
      document.getElementById('btn-import-download-sample-csv')?.addEventListener('click', () => {
        if (typeof ImportCenter !== 'undefined') ImportCenter.downloadDemoCsv();
      });
      document.getElementById('btn-cancel-import-run')?.addEventListener('click', () => {
        window.location.hash = '#admin';
      });
      document.getElementById('btn-admin-download-template')?.addEventListener('click', () => {
        AdminManager.downloadCaseTemplate();
      });
      document.getElementById('btn-admin-case-inventory')?.addEventListener('click', () => {
        document.getElementById('modal-case-inventory')?.classList.add('modal-open');
      });
      document.getElementById('btn-export-inventory-csv')?.addEventListener('click', () => {
        const csvContent = generateCaseInventoryCSV(CaseRepository.getAll());
        AdminManager.downloadCsvBlob(csvContent, 'wisecases-inventory.csv');
        AppUI.showToast('Case Inventory CSV exported.', 'success');
      });
      document.getElementById('btn-export-inventory-template')?.addEventListener('click', () => {
        const sampleCase = [{
          id: 'CASE-007',
          title: 'Sample Case Title',
          category: 'Medicine',
          subcategory: 'Hepatology',
          difficulty: 'Progressive',
          status: 'Published',
          settings: { startingLives: 5 },
          diagnosis: { correctAnswer: 'Primary Diagnosis' },
          explanation: { clinicalSummary: 'Brief overview of the clinical case.' }
        }];
        const csvContent = generateCaseInventoryCSV(sampleCase);
        AdminManager.downloadCsvBlob(csvContent, 'wisecases-inventory-template.csv');
      });
      document.getElementById('modal-inventory-close')?.addEventListener('click', () => {
        document.getElementById('modal-case-inventory')?.classList.remove('modal-open');
      });
      document.getElementById('modal-inventory-cancel')?.addEventListener('click', () => {
        document.getElementById('modal-case-inventory')?.classList.remove('modal-open');
      });
    },

    handleHashChange() {
      const hash = (window.location.hash || '#home').replace('#', '').trim();
      const parts = hash.split('/');
      const viewName = parts[0] || 'home';
      const param = parts[1] || null;

      this.switchView(viewName, param);
    },

    switchView(viewName, param = null) {
      if (!this.elements.views[viewName]) {
        viewName = 'home';
      }

      this.activeView = viewName;

      // Update Nav highlighting
      Object.keys(this.elements.navLinks).forEach(k => {
        if (k === viewName) {
          this.elements.navLinks[k].classList.add('active');
        } else {
          this.elements.navLinks[k].classList.remove('active');
        }
      });

      // Switch view DOM visibility
      Object.keys(this.elements.views).forEach(k => {
        const v = this.elements.views[k];
        if (k === viewName) {
          v.classList.add('view-active');
        } else {
          v.classList.remove('view-active');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // View-specific render hooks
      if (viewName === 'library') {
        this.renderLibrary();
      } else if (viewName === 'game') {
        if (param) {
          if (GameEngine.activeCase && String(GameEngine.activeCase.id).toLowerCase() === String(param).toLowerCase()) {
            this.renderGame();
          } else {
            this.startGame(param, false);
          }
        } else if (!GameEngine.activeCase) {
          // Fallback if accessed #game with no active case
          window.location.hash = '#library';
        } else {
          this.renderGame();
        }
      } else if (viewName === 'result') {
        this.renderResultScreen();
      } else if (viewName === 'results') {
        this.renderMyResults();
      } else if (viewName === 'admin') {
        this.renderAdminCases();
      } else if (viewName === 'import') {
        if (typeof ImportCenter !== 'undefined') ImportCenter.initView();
      } else if (viewName === 'settings') {
        if (typeof SettingsManager !== 'undefined') SettingsManager.initView();
      } else if (viewName === 'import') {
        if (typeof ImportCenter !== 'undefined') ImportCenter.initView();
      } else if (viewName === 'settings') {
        if (typeof SettingsManager !== 'undefined') SettingsManager.initView();
      }
    },

    // ------------------------------------------------------------------------
    // Library Rendering
    // ------------------------------------------------------------------------
    renderLibrary() {
      const cases = CaseRepository.getAll();
      const countEl = document.getElementById('library-case-count');
      if (countEl) countEl.textContent = `${cases.length} Clinical Scenarios`;

      this.renderCategoryFilterChips(cases);
      this.renderLibraryCases();
    },

    renderCategoryFilterChips(cases) {
      const chipContainer = document.getElementById('category-filter-chips');
      if (!chipContainer) return;

      const categories = ['All'];
      cases.forEach(c => {
        if (c.category && !categories.includes(c.category)) {
          categories.push(c.category);
        }
      });

      chipContainer.innerHTML = '';
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-chip ${cat === this.currentCategoryFilter ? 'active' : ''}`;
        btn.textContent = cat;
        btn.addEventListener('click', () => {
          this.currentCategoryFilter = cat;
          document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.renderLibraryCases();
        });
        chipContainer.appendChild(btn);
      });
    },

    renderLibraryCases() {
      const grid = document.getElementById('case-cards-grid');
      if (!grid) return;

      const allCases = CaseRepository.getAll();
      const history = ResultRepository.getAll();

      const filtered = allCases.filter(c => {
        const matchCat = this.currentCategoryFilter === 'All' || c.category === this.currentCategoryFilter;
        const q = this.searchQuery;
        const matchQuery = !q || 
          c.title.toLowerCase().includes(q) || 
          c.id.toLowerCase().includes(q) || 
          (c.category && c.category.toLowerCase().includes(q)) ||
          (c.patient?.summary && c.patient.summary.toLowerCase().includes(q));

        return matchCat && matchQuery;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <div class="empty-state-title">No Clinical Cases Found</div>
            <div class="empty-state-desc">Try clearing your search query or selecting a different specialty category.</div>
          </div>
        `;
        return;
      }

      grid.innerHTML = '';
      filtered.forEach(c => {
        // Check if player has completed this case in history
        const completedRecord = history.find(h => h.caseId.toLowerCase() === c.id.toLowerCase() && h.won);
        
        const card = document.createElement('div');
        card.className = 'card-ai-feature case-card';

        const startingLives = c.settings?.startingLives || 5;
        const stageCount = c.stages?.length || 0;

        card.innerHTML = `
          <div>
            <div class="case-card-header">
              <span class="case-id-badge">${c.id}</span>
              ${completedRecord ? '<span class="badge badge-green">✓ Solved</span>' : '<span class="badge badge-blue">Progressive</span>'}
            </div>
            
            <h3 class="case-card-title">${c.title}</h3>
            
            <div class="case-meta-row">
              <span class="badge badge-neutral">${c.category}</span>
              ${c.subcategory ? `<span class="badge badge-neutral">${c.subcategory}</span>` : ''}
              <span class="badge badge-neutral">${c.difficulty || 'Progressive'}</span>
            </div>

            <p class="case-patient-summary">
              ${c.patient?.summary || 'Standard presentation across progressive clinical revelation stages.'}
            </p>
          </div>

          <div class="case-card-footer">
            <div class="case-spec-stats">
              <span class="spec-stat-item" title="Available Diagnostic Lives">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-wise-red);">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                ${startingLives} Lives
              </span>
              <span class="spec-stat-item" title="Progressive Clue Stages">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-wise-blue);">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                ${stageCount} Stages
              </span>
            </div>

            <button class="btn btn-primary btn-sm btn-start-case" data-id="${c.id}">
              ${completedRecord ? 'Review Case' : 'Start Case'}
            </button>
          </div>
        `;

        card.querySelector('.btn-start-case').addEventListener('click', () => {
          this.startGame(c.id, false);
        });

        grid.appendChild(card);
      });
    },

    // ------------------------------------------------------------------------
    // Main Game Logic & Rendering
    // ------------------------------------------------------------------------
    startGame(caseId, isPreview = false) {
      const c = CaseRepository.getById(caseId);
      if (!c) {
        this.showToast(`Case "${caseId}" could not be found.`, 'error');
        window.location.hash = '#library';
        return;
      }

      this._inFeedbackState = false;
      const banner = document.getElementById('game-feedback-banner');
      if (banner) banner.style.display = 'none';

      const input = document.getElementById('game-diagnosis-input');
      if (input) {
        input.value = '';
        input.disabled = false;
      }

      const btnSubmit = document.getElementById('btn-submit-diagnosis');
      if (btnSubmit) btnSubmit.style.display = 'inline-flex';
      const btnShowAns = document.getElementById('btn-show-answer');
      if (btnShowAns) btnShowAns.style.display = 'none';
      const btnCont = document.getElementById('btn-continue-stage');
      if (btnCont) btnCont.style.display = 'none';
      const btnShowComp = document.getElementById('btn-show-complete-answer');
      if (btnShowComp) btnShowComp.style.display = 'none';

      GameEngine.startCase(c, isPreview);
      window.location.hash = `#game/${c.id}`;
      this.renderGame();
    },

    renderGame() {
      const state = GameEngine.getState();
      const currentCase = state.case;
      if (!currentCase) return;

      if (!this._inFeedbackState) {
        const banner = document.getElementById('game-feedback-banner');
        if (banner) banner.style.display = 'none';
        const input = document.getElementById('game-diagnosis-input');
        if (input) input.disabled = false;
        const btnSubmit = document.getElementById('btn-submit-diagnosis');
        if (btnSubmit) btnSubmit.style.display = 'inline-flex';
        const btnShowAns = document.getElementById('btn-show-answer');
        if (btnShowAns) btnShowAns.style.display = 'none';
        const btnCont = document.getElementById('btn-continue-stage');
        if (btnCont) btnCont.style.display = 'none';
        const btnShowComp = document.getElementById('btn-show-complete-answer');
        if (btnShowComp) btnShowComp.style.display = 'none';
      }

      // Preview banner
      const previewBanner = document.getElementById('game-preview-banner');
      if (previewBanner) {
        previewBanner.style.display = state.isPreview ? 'inline-flex' : 'none';
      }

      // Case Header & Demographics
      document.getElementById('game-case-id').textContent = currentCase.id;
      document.getElementById('game-case-title').textContent = currentCase.title;
      document.getElementById('game-case-category').textContent = `${currentCase.category}${currentCase.subcategory ? ' / ' + currentCase.subcategory : ''}`;
      document.getElementById('game-patient-age').textContent = currentCase.patient?.age ? `${currentCase.patient.age} Yrs` : 'Not Specified';
      document.getElementById('game-patient-sex').textContent = currentCase.patient?.sex || 'Not Specified';
      document.getElementById('game-patient-summary').textContent = currentCase.patient?.summary || 'Progressive clinical examination protocol active.';

      // Stepper & Track
      this.renderGameStepper(state);

      // Progressive Clues
      this.renderCluesStream(state);

      // Diagnostic Vitals (Hearts, Score)
      this.renderGameVitals(state);

      // Attempts log
      this.renderGameAttemptsLog(state);

      // Feedback banner reset or show
      const banner = document.getElementById('game-feedback-banner');
      if (banner && !state.isFinished) {
        banner.className = 'feedback-banner';
        banner.style.display = 'none';
      }

      // Reset diagnosis input
      const input = document.getElementById('game-diagnosis-input');
      const submitBtn = document.getElementById('btn-submit-diagnosis');
      if (input) {
        input.value = '';
        input.disabled = state.isFinished;
        if (!state.isFinished) input.focus();
      }
      if (submitBtn) {
        submitBtn.disabled = state.isFinished;
      }
    },

    renderGameStepper(state) {
      const counter = document.getElementById('game-stage-counter');
      const track = document.getElementById('game-stepper-track');
      if (!track || !counter) return;

      const totalStages = state.totalStages;
      const currentStageNum = state.currentStageIndex + 1;
      counter.textContent = `Stage ${currentStageNum} of ${totalStages}`;

      track.innerHTML = '';

      // Progress bar fill percentage
      const fillPercentage = totalStages > 1 ? (state.currentStageIndex / (totalStages - 1)) * 100 : 100;
      const progressFill = document.createElement('div');
      progressFill.className = 'stepper-progress-fill';
      progressFill.style.width = `calc(${fillPercentage}% * 0.9)`;
      track.appendChild(progressFill);

      for (let i = 0; i < totalStages; i++) {
        const step = document.createElement('div');
        const stageNum = i + 1;

        if (i < state.currentStageIndex) {
          step.className = 'stepper-step completed';
          step.innerHTML = '✓';
        } else if (i === state.currentStageIndex) {
          step.className = 'stepper-step active';
          step.textContent = stageNum;
        } else {
          step.className = 'stepper-step locked';
          step.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          `;
        }
        track.appendChild(step);
      }
    },

    renderCluesStream(state) {
      const container = document.getElementById('game-clues-stream');
      if (!container) return;

      container.innerHTML = '';
      const totalStages = state.case.stages.length;

      // Render revealed stages
      state.revealedStages.forEach((stg, idx) => {
        const isCurrentActive = idx === state.currentStageIndex && !state.isFinished;
        const card = document.createElement('div');
        card.className = `clue-card ${isCurrentActive ? 'current-active-stage' : 'past-stage'}`;

        card.innerHTML = `
          <div class="clue-badge-row">
            <span class="clue-stage-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Stage ${stg.stage} — ${isCurrentActive ? 'Active Diagnostic Focus' : 'Established Finding'}
            </span>
            <span class="badge ${isCurrentActive ? 'badge-blue' : 'badge-neutral'}">
              ${isCurrentActive ? 'Current Clue' : 'Cross-Reference'}
            </span>
          </div>

          <h3 class="clue-title">${stg.title}</h3>
          <p class="clue-text">${stg.clue}</p>
        `;

        container.appendChild(card);
      });

      // If there are future stages locked, render single locked preview placeholder
      if (state.currentStageIndex + 1 < totalStages && !state.isFinished) {
        const remainingLocked = totalStages - (state.currentStageIndex + 1);
        const lockedCard = document.createElement('div');
        lockedCard.className = 'clue-card-locked';
        lockedCard.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <div>
            <strong>${remainingLocked} Progressive Clue${remainingLocked > 1 ? 's' : ''} Locked</strong>
            <div style="font-size: 12px; color: var(--color-slate-gray-light); margin-top: 2px;">
              Will be revealed sequentially if initial diagnostic attempt requires refinement.
            </div>
          </div>
        `;
        container.appendChild(lockedCard);
      }
    },

    renderGameVitals(state) {
      // Lives text
      const livesText = document.getElementById('game-lives-text');
      if (livesText) {
        livesText.textContent = `${state.livesRemaining} / ${state.maxLives}`;
      }

      // Lives Hearts
      const heartsContainer = document.getElementById('game-lives-container');
      if (heartsContainer) {
        heartsContainer.innerHTML = '';
        for (let i = 0; i < state.maxLives; i++) {
          const heart = document.createElement('span');
          heart.className = `life-heart ${i < state.livesRemaining ? 'active' : 'lost'}`;
          heart.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          `;
          heartsContainer.appendChild(heart);
        }
      }

      // Score
      const scoreDisplay = document.getElementById('game-score-display');
      if (scoreDisplay) {
        scoreDisplay.textContent = state.currentScore;
      }
    },

    renderGameAttemptsLog(state) {
      const logList = document.getElementById('game-attempts-list');
      if (!logList) return;

      if (!state.submittedAttempts || state.submittedAttempts.length === 0) {
        logList.innerHTML = `
          <div style="font-size: 13px; color: var(--color-slate-gray-light); font-style: italic; padding: 4px;">
            No diagnosis submitted yet. Review Stage 1 clue carefully.
          </div>
        `;
        return;
      }

      logList.innerHTML = '';
      state.submittedAttempts.forEach(att => {
        const item = document.createElement('div');
        item.className = `attempt-log-item ${att.isCorrect ? 'correct' : 'incorrect'}`;
        const hasMatched = att.matchedCondition && att.matchedCondition.toLowerCase() !== (att.submittedAnswer || att.answer).toLowerCase();
        item.innerHTML = `
          <span class="attempt-stage-label">Stage ${att.stageNumber}</span>
          <span class="attempt-answer-text" title="${att.submittedAnswer || att.answer}">
            ${att.submittedAnswer || att.answer}
            ${hasMatched ? `<span style="font-size: 11px; opacity: 0.8; font-weight: 500;"> (${att.matchedCondition})</span>` : ''}
          </span>
          <span style="font-weight: 700; color: ${att.isCorrect ? 'var(--color-success-green)' : 'var(--color-warning-red)'}">
            ${att.isCorrect ? '✓ Correct' : '✕ Wrong'}
          </span>
        `;
        logList.appendChild(item);
      });
    },

    handleDiagnosisSubmit() {
      const input = document.getElementById('game-diagnosis-input');
      if (!input) return;

      if (typeof AutocompleteController !== 'undefined' && AutocompleteController.close) {
        AutocompleteController.close();
      }

      const userVal = input.value.trim();
      if (!userVal) {
        input.focus();
        return;
      }

      const outcome = GameEngine.submitDiagnosis(userVal);
      const state = outcome.state;

      const banner = document.getElementById('game-feedback-banner');
      const feedbackTitle = document.getElementById('feedback-title');
      const feedbackIcon = document.getElementById('feedback-icon');
      const feedbackMsg = document.getElementById('feedback-message');
      const feedbackMeta = document.getElementById('feedback-meta');
      const feedbackUserAns = document.getElementById('feedback-user-answer');
      const feedbackMatchedCond = document.getElementById('feedback-matched-condition');
      const feedbackReasonWrap = document.getElementById('feedback-reasoning-wrap');
      const feedbackReasonText = document.getElementById('feedback-reasoning-text');
      const feedbackMissedWrap = document.getElementById('feedback-missed-wrap');
      const feedbackMissedList = document.getElementById('feedback-missed-list');
      const feedbackDirectionWrap = document.getElementById('feedback-direction-wrap');
      const feedbackDirectionText = document.getElementById('feedback-direction-text');
      const feedbackCorrectWrap = document.getElementById('feedback-correct-wrap');
      const feedbackCorrectWhy = document.getElementById('feedback-correct-why');
      const feedbackDecisiveWrap = document.getElementById('feedback-decisive-wrap');
      const feedbackDecisiveList = document.getElementById('feedback-decisive-list');
      const feedbackAction = document.getElementById('feedback-action-container');

      const btnSubmit = document.getElementById('btn-submit-diagnosis');
      const btnShowAns = document.getElementById('btn-show-answer');
      const btnCont = document.getElementById('btn-continue-stage');
      const btnShowComp = document.getElementById('btn-show-complete-answer');

      this._inFeedbackState = true;
      if (banner) banner.style.display = 'block';

      const escapeHtml = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

      if (outcome.status === 'CORRECT') {
        if (banner) banner.className = 'feedback-banner feedback-correct';
        if (feedbackIcon) feedbackIcon.textContent = '✓';
        if (feedbackTitle) feedbackTitle.textContent = 'CORRECT';
        if (feedbackMsg) feedbackMsg.textContent = 'Excellent clinical reasoning. Diagnosis verified.';
        if (feedbackMeta) feedbackMeta.innerHTML = `Final Score: <strong>${state.currentScore}</strong> • Lives Remaining: <strong>${state.livesRemaining} / ${state.maxLives}</strong>`;

        if (feedbackUserAns) {
          feedbackUserAns.innerHTML = `Your Answer: "<strong>${escapeHtml(outcome.submittedAnswer)}</strong>"`;
        }
        if (feedbackMatchedCond) {
          if (outcome.matchedCondition && outcome.matchedCondition.toLowerCase() !== outcome.submittedAnswer.toLowerCase()) {
            feedbackMatchedCond.innerHTML = `Matched Medical Condition: <strong>${escapeHtml(outcome.matchedCondition)}</strong>`;
            feedbackMatchedCond.style.display = 'block';
          } else {
            feedbackMatchedCond.style.display = 'none';
          }
        }

        if (feedbackReasonWrap) feedbackReasonWrap.style.display = 'none';
        if (feedbackCorrectWrap) {
          feedbackCorrectWrap.style.display = 'block';
          if (feedbackCorrectWhy) feedbackCorrectWhy.textContent = outcome.whyCorrect || 'This diagnosis verified the clinical findings and pathophysiologic timeline.';
          if (feedbackDecisiveWrap && feedbackDecisiveList) {
            if (outcome.decisiveFindings && outcome.decisiveFindings.length > 0) {
              feedbackDecisiveWrap.style.display = 'block';
              feedbackDecisiveList.innerHTML = outcome.decisiveFindings.map(df => `<li>${escapeHtml(df)}</li>`).join('');
            } else {
              feedbackDecisiveWrap.style.display = 'none';
            }
          }
        }

        // Diagnosis Button State: SHOW COMPLETE ANSWER
        input.disabled = true;
        if (btnSubmit) btnSubmit.style.display = 'none';
        if (btnShowAns) btnShowAns.style.display = 'none';
        if (btnCont) btnCont.style.display = 'none';
        if (btnShowComp) {
          btnShowComp.style.display = 'inline-flex';
          btnShowComp.onclick = () => { window.location.hash = '#result'; };
        }

        if (feedbackAction) {
          feedbackAction.innerHTML = `
            <button class="btn btn-success btn-sm" id="btn-view-explanation">
              View Complete Clinical Case Debrief →
            </button>
          `;
          document.getElementById('btn-view-explanation')?.addEventListener('click', () => {
            window.location.hash = '#result';
          });
        }

        this.renderGame();
        this.showToast('Diagnosis Verified! Outstanding reasoning.', 'success');

      } else if (outcome.status === 'DEPLETED') {
        if (banner) banner.className = 'feedback-banner feedback-depleted';
        if (feedbackIcon) feedbackIcon.textContent = '✕';
        if (feedbackTitle) feedbackTitle.textContent = 'ALL LIVES LOST';
        if (feedbackMsg) feedbackMsg.textContent = 'You have used all available diagnostic attempts. Let us review the complete clinical case.';
        if (feedbackMeta) feedbackMeta.innerHTML = `The diagnosis was: <strong>${state.case.diagnosis?.primary || state.case.diagnosis?.correctAnswer}</strong> • 0 Lives Remaining`;

        if (feedbackUserAns) {
          feedbackUserAns.innerHTML = `Final Attempt: "<strong>${escapeHtml(outcome.submittedAnswer)}</strong>"`;
        }
        if (feedbackMatchedCond) {
          if (outcome.matchedCondition && outcome.matchedCondition.toLowerCase() !== outcome.submittedAnswer.toLowerCase()) {
            feedbackMatchedCond.innerHTML = `Matched Differential: <strong>${escapeHtml(outcome.matchedCondition)}</strong>`;
            feedbackMatchedCond.style.display = 'block';
          } else {
            feedbackMatchedCond.style.display = 'none';
          }
        }

        if (feedbackCorrectWrap) feedbackCorrectWrap.style.display = 'none';
        if (feedbackReasonWrap) {
          feedbackReasonWrap.style.display = 'block';
          if (feedbackReasonText) feedbackReasonText.textContent = outcome.whyWrong || outcome.educationalReasoning || 'Let us examine the full clinical case presentation and definitive diagnosis.';
          if (feedbackMissedWrap && feedbackMissedList) {
            if (outcome.missedClues && outcome.missedClues.length > 0) {
              feedbackMissedWrap.style.display = 'block';
              feedbackMissedList.innerHTML = outcome.missedClues.map(c => `<li>${escapeHtml(c)}</li>`).join('');
            } else {
              feedbackMissedWrap.style.display = 'none';
            }
          }
          if (feedbackDirectionWrap && feedbackDirectionText) {
            if (outcome.betterDirection) {
              feedbackDirectionWrap.style.display = 'block';
              feedbackDirectionText.textContent = outcome.betterDirection;
            } else {
              feedbackDirectionWrap.style.display = 'none';
            }
          }
        }

        // Diagnosis Button State: SHOW THE ANSWER
        input.disabled = true;
        if (btnSubmit) btnSubmit.style.display = 'none';
        if (btnCont) btnCont.style.display = 'none';
        if (btnShowComp) btnShowComp.style.display = 'none';
        if (btnShowAns) {
          btnShowAns.style.display = 'inline-flex';
          btnShowAns.onclick = () => { window.location.hash = '#result'; };
        }

        if (feedbackAction) {
          feedbackAction.innerHTML = `
            <button class="btn btn-primary btn-sm" id="btn-view-explanation">
              View Complete Case Debrief & Explanation →
            </button>
          `;
          document.getElementById('btn-view-explanation')?.addEventListener('click', () => {
            window.location.hash = '#result';
          });
        }

        this.renderGame();
        this.showToast('Clinical attempts depleted. Reviewing full debrief.', 'info');

      } else if (outcome.status === 'INCORRECT') {
        if (banner) banner.className = 'feedback-banner feedback-incorrect';
        if (feedbackIcon) feedbackIcon.textContent = '✕';
        if (feedbackTitle) feedbackTitle.textContent = 'INCORRECT';
        if (feedbackMsg) feedbackMsg.textContent = 'This diagnosis does not sufficiently explain the complete clinical presentation.';
        if (feedbackMeta) feedbackMeta.innerHTML = `−1 Life • Lives remaining: <strong>${state.livesRemaining} / ${state.maxLives}</strong> • Stage ${state.currentStageIndex + 1} clue revealed.`;

        if (feedbackUserAns) {
          feedbackUserAns.innerHTML = `Your Answer: "<strong>${escapeHtml(outcome.submittedAnswer)}</strong>"`;
        }
        if (feedbackMatchedCond) {
          if (outcome.matchedCondition && outcome.matchedCondition.toLowerCase() !== outcome.submittedAnswer.toLowerCase()) {
            feedbackMatchedCond.innerHTML = `Matched Differential: <strong>${escapeHtml(outcome.matchedCondition)}</strong>`;
            feedbackMatchedCond.style.display = 'block';
          } else {
            feedbackMatchedCond.style.display = 'none';
          }
        }

        if (feedbackCorrectWrap) feedbackCorrectWrap.style.display = 'none';
        if (feedbackReasonWrap) {
          feedbackReasonWrap.style.display = 'block';
          if (feedbackReasonText) feedbackReasonText.textContent = outcome.whyWrong || outcome.educationalReasoning || 'This does not sufficiently explain the complete clinical presentation.';
          if (feedbackMissedWrap && feedbackMissedList) {
            if (outcome.missedClues && outcome.missedClues.length > 0) {
              feedbackMissedWrap.style.display = 'block';
              feedbackMissedList.innerHTML = outcome.missedClues.map(c => `<li>${escapeHtml(c)}</li>`).join('');
            } else {
              feedbackMissedWrap.style.display = 'none';
            }
          }
          if (feedbackDirectionWrap && feedbackDirectionText) {
            if (outcome.betterDirection) {
              feedbackDirectionWrap.style.display = 'block';
              feedbackDirectionText.textContent = outcome.betterDirection;
            } else {
              feedbackDirectionWrap.style.display = 'none';
            }
          }
        }

        // Button States: SHOW THE ANSWER (primary) & CONTINUE TO NEXT STAGE (secondary)
        if (btnSubmit) btnSubmit.style.display = 'none';
        if (btnShowComp) btnShowComp.style.display = 'none';
        if (btnShowAns) {
          btnShowAns.style.display = 'inline-flex';
          btnShowAns.onclick = () => {
            GameEngine.currentStageIndex = GameEngine.activeCase.stages.length - 1;
            window.location.hash = '#result';
          };
        }

        if (outcome.nextStageUnlocked && state.livesRemaining > 0) {
          if (btnCont) {
            btnCont.style.display = 'inline-flex';
            btnCont.onclick = () => {
              this._inFeedbackState = false;
              if (banner) banner.style.display = 'none';
              input.value = '';
              if (btnSubmit) btnSubmit.style.display = 'inline-flex';
              if (btnShowAns) btnShowAns.style.display = 'none';
              if (btnCont) btnCont.style.display = 'none';
              if (btnShowComp) btnShowComp.style.display = 'none';
              this.renderGame();
              input.focus();
            };
          }
        } else {
          if (btnCont) btnCont.style.display = 'none';
        }

        if (feedbackAction) feedbackAction.innerHTML = '';

        // Subtle shake animation
        input.classList.remove('shake');
        void input.offsetWidth;
        input.classList.add('shake');

        this.renderGame();
      }
    },
    playNextCase() {
      const all = CaseRepository.getAll();
      if (!GameEngine.activeCase || all.length <= 1) {
        window.location.hash = '#library';
        return;
      }

      const currIdx = all.findIndex(c => c.id === GameEngine.activeCase.id);
      const nextIdx = (currIdx + 1) % all.length;
      this.startGame(all[nextIdx].id, false);
    },

    // ------------------------------------------------------------------------
    // Result Screen Rendering
    // ------------------------------------------------------------------------
    renderResultScreen() {
      const state = GameEngine.getState();
      const currentCase = state.case;
      if (!currentCase) {
        window.location.hash = '#library';
        return;
      }

      const escapeHtml = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

      // 1. Page Header & Case Title
      const pageTitleEl = document.getElementById('result-page-title');
      if (pageTitleEl) pageTitleEl.textContent = 'COMPLETE CLINICAL ANSWER';

      const caseTitleEl = document.getElementById('result-case-title');
      if (caseTitleEl) caseTitleEl.textContent = currentCase.title;

      // Final Diagnosis Box
      const diagPrimary = currentCase.diagnosis?.primary || currentCase.diagnosis?.correctAnswer || 'Clinical Diagnosis';
      const diagDisplay = currentCase.diagnosis?.displayName || '';
      const diagDetailed = currentCase.diagnosis?.detailedExplanation || currentCase.detailedExplanation || currentCase.explanation?.clinicalSummary || '';
      const diagRefs = currentCase.diagnosis?.crossReferences || currentCase.crossReferences || [];

      const correctDiagEl = document.getElementById('result-correct-diagnosis');
      if (correctDiagEl) correctDiagEl.textContent = diagPrimary;

      const dispNameEl = document.getElementById('result-diagnosis-display-name');
      if (dispNameEl) {
        if (diagDisplay && diagDisplay.trim() && diagDisplay.toLowerCase() !== diagPrimary.toLowerCase()) {
          dispNameEl.textContent = diagDisplay;
          dispNameEl.style.display = 'block';
        } else {
          dispNameEl.style.display = 'none';
        }
      }

      const detailedWrap = document.getElementById('result-diagnosis-detailed-explanation');
      const detailedText = document.getElementById('result-diagnosis-detailed-text');
      if (detailedWrap && detailedText) {
        if (diagDetailed && diagDetailed.trim()) {
          detailedText.textContent = diagDetailed;
          detailedWrap.style.display = 'block';
        } else {
          detailedWrap.style.display = 'none';
        }
      }

      const diagRefsEl = document.getElementById('result-diagnosis-cross-refs');
      if (diagRefsEl) {
        if (Array.isArray(diagRefs) && diagRefs.length > 0) {
          diagRefsEl.innerHTML = `
            <div style="font-size: 12px; font-weight: 700; color: var(--color-slate-gray); text-transform: uppercase; margin-bottom: 6px;">Clinical Cross-References:</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${diagRefs.map(r => `<a href="${r.url || '#'}" target="_blank" rel="noopener noreferrer" class="badge badge-neutral" style="text-decoration: underline;">${escapeHtml(r.title || r.name)}</a>`).join('')}
            </div>
          `;
          diagRefsEl.style.display = 'block';
        } else {
          diagRefsEl.style.display = 'none';
        }
      }

      // Status Badge & Stage Pill
      const statusBadge = document.getElementById('result-status-badge');
      const diagLabel = document.getElementById('result-diagnosis-label');
      const stagePill = document.getElementById('result-stage-identified-pill');
      const explanationHeading = document.getElementById('result-explanation-heading-text');
      const learningHeading = document.getElementById('result-learning-heading-text');

      if (state.isWon) {
        if (statusBadge) {
          statusBadge.className = 'badge badge-green';
          statusBadge.innerHTML = '✓ CORRECT';
        }
        if (diagLabel) diagLabel.textContent = 'FINAL DIAGNOSIS';
        if (stagePill) {
          const solvedAttempt = state.submittedAttempts.find(a => a.isCorrect);
          const solvedStage = solvedAttempt ? solvedAttempt.stageNumber : (state.currentStageIndex + 1);
          stagePill.className = 'badge badge-green';
          stagePill.textContent = `You identified the diagnosis at Stage ${solvedStage} of ${state.totalStages}`;
        }
        if (explanationHeading) explanationHeading.textContent = 'Why The Diagnosis Was Made';
        if (learningHeading) learningHeading.textContent = 'Key Learning Points & Takeaways';
      } else {
        if (statusBadge) {
          statusBadge.className = 'badge badge-red';
          statusBadge.innerHTML = 'ALL LIVES LOST';
        }
        if (diagLabel) diagLabel.textContent = 'THE DIAGNOSIS WAS:';
        if (stagePill) {
          stagePill.className = 'badge badge-red';
          stagePill.textContent = 'All available diagnostic attempts were utilized.';
        }
        if (explanationHeading) explanationHeading.textContent = 'Why The Diagnosis Was Made';
        if (learningHeading) learningHeading.textContent = 'What You Should Remember';
      }

      // Metric Cards
      document.getElementById('result-metric-score').textContent = state.currentScore;
      document.getElementById('result-metric-lives').textContent = `${state.maxLives - state.livesRemaining} / ${state.maxLives}`;
      document.getElementById('result-metric-stage').textContent = `${state.currentStageIndex + 1} / ${state.totalStages}`;
      document.getElementById('result-metric-attempts').textContent = state.submittedAttempts.length;

      const accuracy = state.submittedAttempts.length > 0
        ? Math.round((state.isWon ? 1 : 0) / state.submittedAttempts.length * 100)
        : 0;
      document.getElementById('result-metric-accuracy').textContent = `${accuracy}%`;

      // ----------------------------------------------------------------------
      // Section 1: Case Presentation
      // ----------------------------------------------------------------------
      const patientEl = document.getElementById('debrief-patient-profile');
      if (patientEl) {
        patientEl.innerHTML = `
          <p style="margin-bottom: 8px;"><strong>Patient:</strong> ${currentCase.patient?.age ? currentCase.patient.age + ' years old, ' : ''}${currentCase.patient?.sex || 'Patient'}.</p>
          <p style="margin-bottom: 8px;"><strong>Chief Presentation:</strong> ${currentCase.patient?.summary || currentCase.stages[0]?.clue || 'Initial presentation profile.'}</p>
          <p style="color: var(--color-slate-gray); font-size: 14px;"><strong>Specialty Domain:</strong> ${currentCase.category} ${currentCase.subcategory ? '• ' + currentCase.subcategory : ''}</p>
        `;
      }

      // Clinical Summary Card
      const clinicalSummaryCard = document.getElementById('debrief-clinical-summary-card');
      const clinicalSummaryText = document.getElementById('result-clinical-summary');
      if (clinicalSummaryCard && clinicalSummaryText) {
        if (currentCase.explanation?.clinicalSummary) {
          clinicalSummaryText.textContent = currentCase.explanation.clinicalSummary;
          clinicalSummaryCard.style.display = 'block';
        } else {
          clinicalSummaryCard.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Diagnostic Journey Timeline (User Attempts)
      // ----------------------------------------------------------------------
      const timeline = document.getElementById('result-journey-timeline');
      if (timeline) {
        timeline.innerHTML = '';
        if (state.submittedAttempts.length === 0) {
          timeline.innerHTML = '<p style="color: var(--color-slate-gray); font-style: italic;">No diagnostic attempts were submitted.</p>';
        } else {
          state.submittedAttempts.forEach((att) => {
            const item = document.createElement('div');
            item.className = `journey-step-item ${att.isCorrect ? 'step-correct' : 'step-wrong'}`;
            const hasMatched = att.matchedCondition && att.matchedCondition.toLowerCase() !== (att.submittedAnswer || att.answer).toLowerCase();
            item.innerHTML = `
              <div class="journey-step-status-icon ${att.isCorrect ? 'correct' : 'wrong'}">
                ${att.isCorrect ? '✓' : '✕'}
              </div>
              <div class="journey-step-content">
                <div class="journey-step-title">Stage ${att.stageNumber}</div>
                <div class="journey-step-answer">
                  Your answer: <strong>${escapeHtml(att.submittedAnswer || att.answer)}</strong>
                  ${hasMatched ? `<span style="font-size: 12px; color: var(--color-slate-gray); font-weight: 600;"> (Matched: ${escapeHtml(att.matchedCondition)})</span>` : ''}
                  — 
                  <span style="color: ${att.isCorrect ? 'var(--color-success-green)' : 'var(--color-warning-red)'}; font-weight: 700;">
                    ${att.isCorrect ? '✓ Correct' : '✕ Incorrect'}
                  </span>
                </div>
              </div>
            `;
            timeline.appendChild(item);
          });
        }
      }

      // ----------------------------------------------------------------------
      // Section 2: Stage-by-Stage Journey (Show ALL Stages)
      // ----------------------------------------------------------------------
      const allStagesTimeline = document.getElementById('result-all-stages-timeline');
      if (allStagesTimeline) {
        allStagesTimeline.innerHTML = '';
        currentCase.stages.forEach((stg, sIdx) => {
          const stageNum = sIdx + 1;
          const attemptsOnStage = state.submittedAttempts.filter(a => a.stageNumber === stageNum);
          const correctOnStage = attemptsOnStage.some(a => a.isCorrect);
          const wrongOnStage = attemptsOnStage.some(a => !a.isCorrect);

          let statusBadgeHtml = '<span class="badge badge-neutral">Stage Clue</span>';
          if (correctOnStage) {
            statusBadgeHtml = '<span class="badge badge-green">✓ Solved at this Stage</span>';
          } else if (wrongOnStage) {
            statusBadgeHtml = '<span class="badge badge-red">✕ Incorrect attempt submitted</span>';
          } else if (stageNum <= state.currentStageIndex + 1) {
            statusBadgeHtml = '<span class="badge badge-blue">Unlocked Finding</span>';
          }

          let stageBlocksHtml = '';

          // 1. What was known (Clue)
          if (stg.clue || stg.clinicalFindings) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">WHAT WAS KNOWN:</div>
                <div class="stage-review-text">${stg.clue || stg.clinicalFindings}</div>
              </div>
            `;
          }

          // 2. What should you think?
          if (stg.whatShouldYouThink || stg.decisionQuestion) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">WHAT SHOULD YOU THINK?</div>
                <div class="stage-review-text">${stg.whatShouldYouThink || stg.decisionQuestion}</div>
              </div>
            `;
          }

          // 3. Important clues
          const clues = stg.importantClues || (Array.isArray(stg.keyClues) ? stg.keyClues.join('; ') : stg.keyClues);
          if (clues) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">IMPORTANT CLUES:</div>
                <div class="stage-review-text">${clues}</div>
              </div>
            `;
          }

          // 4. Decision point
          if (stg.decisionPoint) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">DECISION POINT:</div>
                <div class="stage-review-text">${stg.decisionPoint}</div>
              </div>
            `;
          }

          // 5. Investigations to consider
          const stageInvs = Array.isArray(stg.investigations) ? stg.investigations.join(', ') : stg.investigations;
          if (stageInvs) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">INVESTIGATIONS TO CONSIDER:</div>
                <div class="stage-review-text">${stageInvs}</div>
              </div>
            `;
          }

          // 6. Reasoning / Answer Explanation
          const stgReason = stg.reasoning || stg.answerExplanation;
          if (stgReason) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">REASONING:</div>
                <div class="stage-review-text">${stgReason}</div>
              </div>
            `;
          }

          // 7. Key Takeaway
          if (stg.keyTakeaway) {
            stageBlocksHtml += `
              <div class="stage-review-block">
                <div class="stage-review-label">KEY TAKEAWAY:</div>
                <div class="stage-review-text" style="font-weight: 600; color: var(--color-wise-blue);">${stg.keyTakeaway}</div>
              </div>
            `;
          }

          // Stage cross references
          if (Array.isArray(stg.crossReferences) && stg.crossReferences.length > 0) {
            stageBlocksHtml += `
              <div class="stage-review-block" style="margin-top: 6px;">
                <div class="stage-review-label">STAGE REFERENCES:</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                  ${stg.crossReferences.map(r => `<a href="${r.url || '#'}" target="_blank" rel="noopener noreferrer" class="badge badge-neutral" style="text-decoration: underline; font-size: 11px;">${escapeHtml(r.title || r.name)}</a>`).join('')}
                </div>
              </div>
            `;
          }

          const card = document.createElement('div');
          card.className = `debrief-stage-card past-stage ${correctOnStage ? 'current-active-stage' : ''}`;
          card.innerHTML = `
            <div class="clue-badge-row">
              <span class="clue-stage-label">Stage ${stageNum} — ${stg.title}</span>
              ${statusBadgeHtml}
            </div>
            <div style="margin-top: 10px;">
              ${stageBlocksHtml}
            </div>
          `;
          allStagesTimeline.appendChild(card);
        });
      }

      // ----------------------------------------------------------------------
      // Section 3: Clinical Decision Points
      // ----------------------------------------------------------------------
      const dpCard = document.getElementById('debrief-decision-points-card');
      const dpContainer = document.getElementById('result-decision-points-list');
      if (dpCard && dpContainer) {
        dpContainer.innerHTML = '';
        let hasDecisionPoints = false;
        currentCase.stages.forEach((stg, idx) => {
          if (stg.decisionPoint || stg.decisionQuestion) {
            hasDecisionPoints = true;
            const item = document.createElement('div');
            item.className = 'decision-point-box';
            item.innerHTML = `
              <div style="font-size: 12px; font-weight: 700; color: var(--color-wise-blue); text-transform: uppercase; margin-bottom: 4px;">
                Stage ${idx + 1} Decision Point
              </div>
              <div style="font-size: 15px; font-weight: 700; color: var(--color-deep-navy); margin-bottom: 6px;">
                ${stg.decisionQuestion || 'Diagnostic Evaluation at this Stage'}
              </div>
              <div style="font-size: 14px; color: var(--color-slate-gray); line-height: 1.5;">
                ${stg.decisionPoint || stg.importantClues || ''}
              </div>
            `;
            dpContainer.appendChild(item);
          }
        });

        if (!hasDecisionPoints) {
          const item = document.createElement('div');
          item.className = 'decision-point-box';
          item.innerHTML = `
            <div style="font-size: 12px; font-weight: 700; color: var(--color-wise-blue); text-transform: uppercase; margin-bottom: 4px;">
              Key Diagnostic Decision Point
            </div>
            <div style="font-size: 15px; font-weight: 700; color: var(--color-deep-navy); margin-bottom: 6px;">
              What should you consider when the presentation mimics an acute or localized issue?
            </div>
            <div style="font-size: 14px; color: var(--color-slate-gray); line-height: 1.5;">
              Look beyond isolated organ symptoms. Re-evaluate discordant laboratory findings and systemic risk factors before prematurely narrowing the differential.
            </div>
          `;
          dpContainer.appendChild(item);
        }
        dpCard.style.display = 'block';
      }

      // ----------------------------------------------------------------------
      // Section 4: Diagnostic Reasoning Chain
      // ----------------------------------------------------------------------
      const reasoningChainCard = document.getElementById('debrief-reasoning-chain-card');
      const reasoningChainContainer = document.getElementById('result-reasoning-chain-container');
      if (reasoningChainCard && reasoningChainContainer) {
        reasoningChainContainer.innerHTML = '';
        let chain = currentCase.diagnosticReasoning;
        if (!Array.isArray(chain) || chain.length === 0) {
          chain = (currentCase.stages || []).map((s, idx) => ({
            step: idx + 1,
            finding: s.importantClues || (s.clue ? (s.clue.length > 100 ? s.clue.substring(0, 100) + '...' : s.clue) : `Stage ${idx + 1} findings`),
            meaning: s.whatShouldYouThink || `Diagnostic clues consistent with ${s.title}`,
            decision: s.decisionPoint || `Continue targeted clinical investigation`
          }));
          if (chain.length > 0) {
            chain.push({
              step: chain.length + 1,
              finding: 'Synthesis of clinical, laboratory, and imaging progression',
              meaning: 'Pathophysiologic timeline fits definitive diagnostic criteria',
              decision: `Confirm final diagnosis: ${currentCase.diagnosis?.primary || currentCase.diagnosis?.correctAnswer || 'Verified Condition'}`
            });
          }
        }

        if (Array.isArray(chain) && chain.length > 0) {
          reasoningChainCard.style.display = 'block';
          chain.forEach((step, sIdx) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'reasoning-chain-step';
            stepEl.innerHTML = `
              <div class="reasoning-chain-step-num">Step ${step.step || sIdx + 1}</div>
              <div class="reasoning-chain-finding"><strong>Finding:</strong> ${escapeHtml(step.finding || '')}</div>
              <div class="reasoning-chain-meaning"><strong>Clinical Meaning:</strong> ${escapeHtml(step.meaning || '')}</div>
              <div class="reasoning-chain-decision"><strong>Diagnostic Decision:</strong> ${escapeHtml(step.decision || '')}</div>
            `;
            reasoningChainContainer.appendChild(stepEl);

            if (sIdx < chain.length - 1) {
              const arrow = document.createElement('div');
              arrow.className = 'reasoning-chain-arrow';
              arrow.textContent = '➔';
              reasoningChainContainer.appendChild(arrow);
            }
          });
        } else {
          reasoningChainCard.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Section 5: Investigations & Interpretation
      // ----------------------------------------------------------------------
      const invCard = document.getElementById('debrief-investigations-card');
      const invContainer = document.getElementById('result-investigations-container');
      const invSummaryWrap = document.getElementById('result-investigation-summary-wrap');
      const invSummaryEl = document.getElementById('result-investigation-summary');
      if (invCard && invContainer) {
        const invList = currentCase.investigations || [];
        if (Array.isArray(invList) && invList.length > 0) {
          invCard.style.display = 'block';
          let html = `
            <table class="investigations-table">
              <thead>
                <tr>
                  <th>Investigation</th>
                  <th>Result Value</th>
                  <th>Reference / Unit</th>
                  <th>Interpretation & Clinical Meaning</th>
                </tr>
              </thead>
              <tbody>
          `;
          invList.forEach(inv => {
            const isAbn = inv.interpretation && /elevated|abnormal|positive|critical|severe|deranged|marked/i.test(inv.interpretation);
            html += `
              <tr>
                <td><strong>${escapeHtml(inv.name || inv.test)}</strong></td>
                <td><span class="${isAbn ? 'investigation-val-abnormal' : ''}">${escapeHtml(inv.value)}</span></td>
                <td>${escapeHtml(inv.unit || inv.referenceRange || '—')}</td>
                <td>
                  <span class="badge ${isAbn ? 'badge-red' : 'badge-neutral'}">${escapeHtml(inv.interpretation || 'Normal')}</span>
                  ${inv.meaning ? `<div style="font-size: 12px; color: var(--color-slate-gray); margin-top: 4px;">${escapeHtml(inv.meaning)}</div>` : ''}
                </td>
              </tr>
            `;
          });
          html += '</tbody></table>';
          invContainer.innerHTML = html;
        } else {
          invCard.style.display = 'block';
          invContainer.innerHTML = `
            <div style="padding: 12px; background: #F8FAFC; border: 1px solid var(--color-light-gray); border-radius: var(--radius-md); font-size: 14px; color: var(--color-slate-gray); line-height: 1.6;">
              Detailed quantitative and diagnostic workup established across progressive stages:
              <ul style="margin: 8px 0 0 16px; padding: 0;">
                ${currentCase.stages.slice(1).map(s => `<li><strong>${s.title}:</strong> ${s.clue}</li>`).join('')}
              </ul>
            </div>
          `;
        }

        if (currentCase.investigationInterpretation || currentCase.investigationSummary) {
          if (invSummaryWrap) invSummaryWrap.style.display = 'block';
          if (invSummaryEl) invSummaryEl.textContent = currentCase.investigationInterpretation || currentCase.investigationSummary;
        } else {
          if (invSummaryWrap) invSummaryWrap.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Section 6: Clinical Insight Card
      // ----------------------------------------------------------------------
      const insightCard = document.getElementById('debrief-clinical-insight-card');
      const insightTitleEl = document.getElementById('debrief-clinical-insight-title');
      const insightContentEl = document.getElementById('debrief-clinical-insight-content');
      if (insightCard && insightTitleEl && insightContentEl) {
        if (currentCase.clinicalInsight && (currentCase.clinicalInsight.title || currentCase.clinicalInsight.content)) {
          insightCard.style.display = 'block';
          insightTitleEl.textContent = currentCase.clinicalInsight.title || 'Clinical Insight';
          insightContentEl.innerHTML = currentCase.clinicalInsight.content || '';
        } else {
          insightCard.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Section 7: Differential Diagnoses Evaluated
      // ----------------------------------------------------------------------
      const diffCard = document.getElementById('debrief-differentials-card');
      const diffContainer = document.getElementById('result-differentials-container');
      if (diffCard && diffContainer) {
        const diffList = currentCase.differentialDiagnoses || [];
        if (Array.isArray(diffList) && diffList.length > 0) {
          diffCard.style.display = 'block';
          let dHtml = '<div class="differentials-card-list">';
          diffList.forEach(d => {
            const dName = d.diagnosis || d.name;
            const considered = d.reasonConsidered || d.whyConsidered || 'Overlapping presentation';
            const rejected = d.reasonRejected || d.whyRejected || 'Refuted by specific clinical or laboratory criteria';
            const insight = d.clinicalInsight || d.clinicalExplanation || '';
            const crossRefs = d.crossReferences || [];

            dHtml += `
              <div class="differential-card">
                <div class="differential-title">${escapeHtml(dName)}</div>
                <div class="differential-grid">
                  <div class="diff-considered-box">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #1E40AF; margin-bottom: 2px;">Why Considered:</div>
                    <div style="font-size: 13.5px; line-height: 1.5; color: #1E293B;">${escapeHtml(considered)}</div>
                  </div>
                  <div class="diff-rejected-box">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #991B1B; margin-bottom: 2px;">Why Rejected / Refuted:</div>
                    <div style="font-size: 13.5px; line-height: 1.5; color: #1E293B;">${escapeHtml(rejected)}</div>
                  </div>
                </div>
                ${insight ? `
                  <div class="diff-insight-box">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #475569; margin-bottom: 2px;">Clinical Insight:</div>
                    <div style="font-size: 13.5px; line-height: 1.5; color: #334155;">${escapeHtml(insight)}</div>
                  </div>
                ` : ''}
                ${Array.isArray(crossRefs) && crossRefs.length > 0 ? `
                  <div style="margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
                    ${crossRefs.map(cr => `<a href="${cr.url || '#'}" target="_blank" rel="noopener noreferrer" class="badge badge-neutral" style="text-decoration: underline; font-size: 11px;">${escapeHtml(cr.title || cr.name)}</a>`).join('')}
                  </div>
                ` : ''}
              </div>
            `;
          });
          dHtml += '</div>';
          diffContainer.innerHTML = dHtml;
        } else {
          diffCard.style.display = 'block';
          diffContainer.innerHTML = `
            <div style="padding: 12px; background: #F8FAFC; border: 1px solid var(--color-light-gray); border-radius: var(--radius-md); font-size: 14px; color: var(--color-slate-gray); line-height: 1.6;">
              Clinical reasoning actively prioritized ruling out acute mimickers and secondary etiologies through the revealed diagnostic sequence before arriving at <strong>${escapeHtml(currentCase.diagnosis?.primary || currentCase.diagnosis?.correctAnswer)}</strong>.
            </div>
          `;
        }
      }

      // ----------------------------------------------------------------------
      // Section 8: Decisive Findings
      // ----------------------------------------------------------------------
      const decisiveCard = document.getElementById('debrief-decisive-findings-card');
      const decisiveListEl = document.getElementById('result-decisive-findings-list');
      if (decisiveCard && decisiveListEl) {
        const decisiveList = currentCase.decisiveFindings || currentCase.diagnosis?.decisiveFindings || [];
        if (Array.isArray(decisiveList) && decisiveList.length > 0) {
          decisiveCard.style.display = 'block';
          decisiveListEl.innerHTML = decisiveList.map(df => `<li>${escapeHtml(df)}</li>`).join('');
        } else {
          decisiveCard.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Section 9: Where Reasoning Could Go Wrong (Pitfalls)
      // ----------------------------------------------------------------------
      const pitfallsCard = document.getElementById('debrief-pitfalls-card');
      const pitfallsList = document.getElementById('result-pitfalls-list');
      if (pitfallsCard && pitfallsList) {
        pitfallsList.innerHTML = '';
        const pitfalls = currentCase.whereReasoningCanGoWrong || currentCase.explanation?.whereReasoningCanGoWrong || [];
        const pArr = Array.isArray(pitfalls) ? pitfalls : (pitfalls ? [pitfalls] : []);
        if (pArr.length > 0 && pArr[0]) {
          pitfallsCard.style.display = 'block';
          pArr.forEach(p => {
            const li = document.createElement('li');
            li.style.marginBottom = '8px';
            li.innerHTML = `<strong>Diagnostic Trap:</strong> ${escapeHtml(p)}`;
            pitfallsList.appendChild(li);
          });
        } else {
          const li = document.createElement('li');
          li.innerHTML = `<strong>Diagnostic Trap:</strong> Premature closure or anchoring on superficial symptoms (e.g. treating localized findings without evaluating underlying chronic organ dysfunction or discordant laboratory anomalies).`;
          pitfallsList.appendChild(li);
        }
        pitfallsCard.style.display = 'block';
      }

      // ----------------------------------------------------------------------
      // Section 10: Pathophysiologic Reasoning
      // ----------------------------------------------------------------------
      const pathoCard = document.getElementById('debrief-pathophysiology-card');
      const pathoText = document.getElementById('result-clinical-reasoning');
      if (pathoCard && pathoText) {
        const reason = currentCase.explanation?.reasoning || currentCase.diagnosis?.finalReasoning || '';
        if (reason && reason.trim()) {
          pathoCard.style.display = 'block';
          pathoText.textContent = reason;
        } else {
          pathoCard.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Section 11: Learning Points
      // ----------------------------------------------------------------------
      const learningCard = document.getElementById('debrief-learning-card');
      const lpContainer = document.getElementById('result-learning-points');
      if (learningCard && lpContainer) {
        lpContainer.innerHTML = '';
        const points = currentCase.explanation?.learningPoints || [];
        if (Array.isArray(points) && points.length > 0) {
          learningCard.style.display = 'block';
          points.forEach(pt => {
            const li = document.createElement('li');
            li.className = 'learning-point-item';
            li.innerHTML = `
              <div class="learning-point-icon">✓</div>
              <div>${escapeHtml(pt)}</div>
            `;
            lpContainer.appendChild(li);
          });
        } else {
          learningCard.style.display = 'none';
        }
      }

      // ----------------------------------------------------------------------
      // Section 12: References
      // ----------------------------------------------------------------------
      const refsCard = document.getElementById('debrief-references-card');
      const refContainer = document.getElementById('result-references-list');
      if (refsCard && refContainer) {
        refContainer.innerHTML = '';
        const refs = currentCase.references || [];
        if (Array.isArray(refs) && refs.length > 0) {
          refsCard.style.display = 'block';
          refs.forEach(r => {
            const li = document.createElement('li');
            li.className = 'reference-item';
            li.innerHTML = `
              <a href="${r.url || '#'}" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                ${escapeHtml(r.title)}
              </a>
            `;
            refContainer.appendChild(li);
          });
        } else {
          refsCard.style.display = 'none';
        }
      }
    },

    // ------------------------------------------------------------------------
    // My Results (History & Analytics)
    // ------------------------------------------------------------------------
    renderMyResults() {
      const pIdEl = document.getElementById('player-id-badge');
      if (pIdEl) {
        pIdEl.textContent = `Player ID: ${PlayerService.getPlayerId()}`;
      }

      const stats = ResultRepository.getAnalytics();
      const history = ResultRepository.getAll();

      document.getElementById('stats-cases-played').textContent = stats.casesPlayed;
      document.getElementById('stats-cases-completed').textContent = stats.casesCompleted;
      document.getElementById('stats-correct-diagnoses').textContent = stats.correctDiagnoses;
      document.getElementById('stats-failed-cases').textContent = stats.failedCases;
      document.getElementById('stats-average-score').textContent = stats.averageScore;
      document.getElementById('stats-accuracy-rate').textContent = stats.accuracyRate;

      const container = document.getElementById('history-cards-list');
      if (!container) return;

      if (history.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <div class="empty-state-title">No Case History Yet</div>
            <div class="empty-state-desc">Your completed clinical diagnostic sessions and scores will appear here.</div>
            <button class="btn btn-primary" onclick="window.location.hash='#library'">Go to Case Library</button>
          </div>
        `;
        return;
      }

      const escapeHtml = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

      container.innerHTML = '';
      history.forEach(item => {
        const card = document.createElement('div');
        card.className = 'history-card';
        const dateStr = item.completedAt ? new Date(item.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';

        const attemptsHtml = (item.attempts || []).map(att => {
          const hasMatched = att.matchedCondition && att.matchedCondition.toLowerCase() !== (att.submittedAnswer || att.answer).toLowerCase();
          return `
            <div style="font-size: 12px; margin-top: 3px; color: var(--color-deep-navy);">
              Stage ${att.stageNumber}: <strong>${escapeHtml(att.submittedAnswer || att.answer)}</strong>
              ${hasMatched ? `<span style="color: var(--color-slate-gray); font-weight: 500;">(Matched: ${escapeHtml(att.matchedCondition)})</span>` : ''}
              — <span style="color: ${att.isCorrect ? 'var(--color-success-green)' : 'var(--color-warning-red)'}; font-weight: 700;">
                ${att.isCorrect ? '✓ Correct' : '✕ Wrong'}
              </span>
            </div>
          `;
        }).join('');

        card.innerHTML = `
          <div class="history-card-left">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge ${item.won ? 'badge-green' : 'badge-red'}">
                ${item.won ? '✓ Solved' : '✕ Depleted'}
              </span>
              <span style="font-size: 12px; color: var(--color-slate-gray-light); font-weight: 600;">${dateStr}</span>
            </div>
            <div class="history-case-title">${escapeHtml(item.caseTitle)} (${escapeHtml(item.caseId)})</div>
            <div class="history-case-meta">
              <span>Lives Used: <strong>${item.livesUsed} / ${item.startingLives || 5}</strong></span>
              <span>Stages Reached: <strong>${item.stagesReached} / ${item.totalStages || 5}</strong></span>
              <span>Attempts: <strong>${item.attempts?.length || 1}</strong></span>
            </div>
            ${attemptsHtml ? `<div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed var(--color-light-gray);">${attemptsHtml}</div>` : ''}
          </div>

          <div class="history-card-right">
            <div class="history-score-display">
              <span class="history-score-num">${item.score}</span>
              <span class="history-score-label">Score</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="btn btn-primary btn-sm btn-review-history" data-id="${item.caseId}">
                Review Explanation
              </button>
              <button class="btn btn-secondary btn-sm btn-replay-history" data-id="${item.caseId}">
                Replay Case
              </button>
            </div>
          </div>
        `;

        card.querySelector('.btn-replay-history').addEventListener('click', () => {
          this.startGame(item.caseId, false);
        });

        card.querySelector('.btn-review-history').addEventListener('click', () => {
          const c = CaseRepository.getById(item.caseId);
          if (c) {
            GameEngine.activeCase = JSON.parse(JSON.stringify(c));
            GameEngine.submittedAttempts = item.attempts || [];
            GameEngine.currentStageIndex = (item.stagesReached || c.stages.length) - 1;
            GameEngine.currentScore = item.score || 0;
            GameEngine.livesRemaining = (item.startingLives || 5) - (item.livesUsed || 0);
            GameEngine.maxLives = item.startingLives || 5;
            GameEngine.isWon = Boolean(item.won);
            GameEngine.isFinished = true;
            window.location.hash = '#result';
          }
        });

        container.appendChild(card);
      });
    },
    renderAdminCases() {
      AdminManager.renderTable();
    },

    // ------------------------------------------------------------------------
    // Toast Notification System
    // ------------------------------------------------------------------------
    showToast(message, type = 'info') {
      const container = this.elements.toastContainer;
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    // ------------------------------------------------------------------------
    // Confirmation Dialog
    // ------------------------------------------------------------------------
    showConfirmModal(title, message, onProceed) {
      const modal = document.getElementById('modal-confirm');
      const titleEl = document.getElementById('modal-confirm-title');
      const msgEl = document.getElementById('modal-confirm-message');
      const proceedBtn = document.getElementById('modal-confirm-proceed');
      const cancelBtn = document.getElementById('modal-confirm-cancel');
      const closeBtn = document.getElementById('modal-confirm-close');

      if (!modal) return;

      titleEl.textContent = title;
      msgEl.textContent = message;
      modal.classList.add('modal-open');

      const cleanup = () => {
        modal.classList.remove('modal-open');
        proceedBtn.onclick = null;
        cancelBtn.onclick = null;
        closeBtn.onclick = null;
      };

      proceedBtn.onclick = () => {
        cleanup();
        if (typeof onProceed === 'function') onProceed();
      };
      cancelBtn.onclick = cleanup;
      closeBtn.onclick = cleanup;
    }
  };

  // ==========================================================================
  // 7. ADMIN MANAGER (Case creation, editing, dynamic stages, import, export)
  // ==========================================================================
  const AdminManager = {
    editingCaseId: null,
    pendingImportCases: [],

    init() {
      this.bindEditorEvents();
      this.bindImportEvents();
    },

    renderTable(filterQuery = '') {
      const tbody = document.getElementById('admin-cases-tbody');
      const countBadge = document.getElementById('admin-cases-count');
      if (!tbody) return;

      const cases = CaseRepository.getAll();
      if (countBadge) countBadge.textContent = `${cases.length} Cases Configured`;

      const filtered = cases.filter(c => {
        if (!filterQuery) return true;
        return c.id.toLowerCase().includes(filterQuery) ||
          c.title.toLowerCase().includes(filterQuery) ||
          c.category.toLowerCase().includes(filterQuery);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center; color: var(--color-slate-gray); padding: 32px;">
              No cases matching filter criteria.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = '';
      filtered.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${c.id}</strong></td>
          <td class="admin-case-title-cell">${c.title}</td>
          <td><span class="badge badge-neutral">${c.category}</span></td>
          <td><span class="badge ${c.status === 'Published' ? 'badge-green' : 'badge-neutral'}">${c.status || 'Published'}</span></td>
          <td>${c.stages?.length || 0}</td>
          <td>${c.settings?.startingLives || 5}</td>
          <td>
            <div class="table-actions-cell">
              <button class="btn btn-secondary btn-sm action-edit" title="Edit Case">Edit</button>
              <button class="btn btn-secondary btn-sm action-dup" title="Duplicate Case">Duplicate</button>
              <button class="btn btn-secondary btn-sm action-prev" title="Preview Case without Saving Stats">Preview</button>
              <button class="btn btn-secondary btn-sm action-export" title="Export Single JSON">Export</button>
              <button class="btn btn-outline-danger btn-sm action-del" title="Delete Case">Delete</button>
            </div>
          </td>
        `;

        tr.querySelector('.action-edit').addEventListener('click', () => this.openEditor(c.id));
        tr.querySelector('.action-dup').addEventListener('click', () => this.duplicateCase(c.id));
        tr.querySelector('.action-prev').addEventListener('click', () => {
          AppUI.startGame(c.id, true); // true = preview mode
        });
        tr.querySelector('.action-export').addEventListener('click', () => this.exportSingleCase(c.id));
        tr.querySelector('.action-del').addEventListener('click', () => this.deleteCase(c.id));

        tbody.appendChild(tr);
      });
    },

    // ------------------------------------------------------------------------
    // Case Editor
    // ------------------------------------------------------------------------
    openEditor(caseId = null) {
      const modal = document.getElementById('modal-case-editor');
      const titleEl = document.getElementById('modal-editor-title');
      if (!modal) return;

      this.editingCaseId = caseId;
      const stagesList = document.getElementById('stages-editor-list');
      stagesList.innerHTML = '';

      if (caseId) {
        const c = CaseRepository.getById(caseId);
        if (!c) return;

        titleEl.textContent = `Edit Case: ${c.id}`;
        document.getElementById('edit-original-id').value = c.id;
        document.getElementById('form-case-id').value = c.id;
        document.getElementById('form-case-title').value = c.title;
        document.getElementById('form-case-category').value = c.category || 'Medicine';
        document.getElementById('form-case-subcategory').value = c.subcategory || '';
        document.getElementById('form-case-difficulty').value = c.difficulty || 'Progressive';
        if (document.getElementById('form-case-status')) {
          document.getElementById('form-case-status').value = c.status || 'Published';
        }
        document.getElementById('form-starting-lives').value = c.settings?.startingLives || 5;
        document.getElementById('form-patient-age').value = c.patient?.age || '';
        document.getElementById('form-patient-sex').value = c.patient?.sex || '';
        document.getElementById('form-patient-summary').value = c.patient?.summary || '';

        // Stages
        (c.stages || []).forEach(stg => this.addStageRow(stg.title, stg.clue));

        // Diagnosis
        const diagObj = c.diagnosis || {};
        document.getElementById('form-correct-diagnosis').value = diagObj.primary || diagObj.correctAnswer || '';
        if (document.getElementById('form-display-diagnosis')) {
          document.getElementById('form-display-diagnosis').value = diagObj.displayName || '';
        }
        document.getElementById('form-accepted-answers').value = (diagObj.acceptedAnswers || []).join('\n');
        if (document.getElementById('form-aliases')) {
          document.getElementById('form-aliases').value = (diagObj.aliases || []).join(', ');
        }
        if (document.getElementById('form-diagnosis-short-explanation')) {
          document.getElementById('form-diagnosis-short-explanation').value = diagObj.shortExplanation || '';
        }
        if (document.getElementById('form-diagnosis-detailed-explanation')) {
          document.getElementById('form-diagnosis-detailed-explanation').value = diagObj.detailedExplanation || '';
        }
        if (document.getElementById('form-decisive-findings')) {
          const df = diagObj.decisiveFindings || c.decisiveFindings || [];
          document.getElementById('form-decisive-findings').value = (Array.isArray(df) ? df : [df]).join('\n');
        }
        if (document.getElementById('form-final-reasoning')) {
          document.getElementById('form-final-reasoning').value = diagObj.finalReasoning || c.finalReasoning || '';
        }

        // Differential Diagnoses (JSON array)
        if (document.getElementById('form-differentials-json')) {
          document.getElementById('form-differentials-json').value = (c.differentialDiagnoses && c.differentialDiagnoses.length > 0)
            ? JSON.stringify(c.differentialDiagnoses, null, 2)
            : '';
        }

        // Wrong Answer Explanations (JSON array)
        if (document.getElementById('form-wrong-answers-json')) {
          document.getElementById('form-wrong-answers-json').value = (c.wrongAnswerExplanations && c.wrongAnswerExplanations.length > 0)
            ? JSON.stringify(c.wrongAnswerExplanations, null, 2)
            : '';
        }

        // Clinical Insight
        if (document.getElementById('form-insight-title')) {
          document.getElementById('form-insight-title').value = c.clinicalInsight?.title || '';
        }
        if (document.getElementById('form-insight-content')) {
          document.getElementById('form-insight-content').value = c.clinicalInsight?.content || '';
        }

        // Diagnostic Reasoning (JSON array)
        if (document.getElementById('form-diagnostic-reasoning-json')) {
          document.getElementById('form-diagnostic-reasoning-json').value = (c.diagnosticReasoning && c.diagnosticReasoning.length > 0)
            ? JSON.stringify(c.diagnosticReasoning, null, 2)
            : '';
        }

        // Explanation, Learning & Pitfalls
        document.getElementById('form-clinical-summary').value = c.explanation?.clinicalSummary || '';
        document.getElementById('form-clinical-reasoning').value = c.explanation?.reasoning || '';
        if (document.getElementById('form-pitfalls')) {
          const pf = c.whereReasoningCanGoWrong || c.explanation?.whereReasoningCanGoWrong || [];
          document.getElementById('form-pitfalls').value = (Array.isArray(pf) ? pf : [pf]).join('\n');
        }
        document.getElementById('form-learning-points').value = (c.explanation?.learningPoints || []).join('\n');

        // References
        const refLines = (c.references || []).map(r => `${r.title} | ${r.url}`);
        document.getElementById('form-references').value = refLines.join('\n');

      } else {
        titleEl.textContent = 'Create New Clinical Case';
        document.getElementById('case-editor-form').reset();
        document.getElementById('edit-original-id').value = '';

        // Suggest next Case ID
        const all = CaseRepository.getAll();
        const nextNum = all.length + 1;
        document.getElementById('form-case-id').value = `CASE-${String(nextNum).padStart(3, '0')}`;
        document.getElementById('form-starting-lives').value = 5;

        // Reset accordion inputs
        if (document.getElementById('form-display-diagnosis')) document.getElementById('form-display-diagnosis').value = '';
        if (document.getElementById('form-aliases')) document.getElementById('form-aliases').value = '';
        if (document.getElementById('form-diagnosis-short-explanation')) document.getElementById('form-diagnosis-short-explanation').value = '';
        if (document.getElementById('form-diagnosis-detailed-explanation')) document.getElementById('form-diagnosis-detailed-explanation').value = '';
        if (document.getElementById('form-decisive-findings')) document.getElementById('form-decisive-findings').value = '';
        if (document.getElementById('form-final-reasoning')) document.getElementById('form-final-reasoning').value = '';
        if (document.getElementById('form-differentials-json')) document.getElementById('form-differentials-json').value = '';
        if (document.getElementById('form-wrong-answers-json')) document.getElementById('form-wrong-answers-json').value = '';
        if (document.getElementById('form-insight-title')) document.getElementById('form-insight-title').value = '';
        if (document.getElementById('form-insight-content')) document.getElementById('form-insight-content').value = '';
        if (document.getElementById('form-diagnostic-reasoning-json')) document.getElementById('form-diagnostic-reasoning-json').value = '';
        if (document.getElementById('form-pitfalls')) document.getElementById('form-pitfalls').value = '';

        // Provide 3 initial default stage slots
        this.addStageRow('The Chief Complaint', '');
        this.addStageRow('Physical Examination Findings', '');
        this.addStageRow('Systemic Indicators & Imaging', '');
      }

      modal.classList.add('modal-open');
    },

    closeEditor() {
      const modal = document.getElementById('modal-case-editor');
      if (modal) modal.classList.remove('modal-open');
    },

    addStageRow(title = '', clue = '') {
      const stagesList = document.getElementById('stages-editor-list');
      if (!stagesList) return;

      const stageIndex = stagesList.children.length + 1;
      const card = document.createElement('div');
      card.className = 'stage-editor-card';

      card.innerHTML = `
        <div class="stage-editor-header">
          <span class="stage-editor-num">Stage ${stageIndex}</span>
          <button type="button" class="btn btn-outline-danger btn-sm btn-del-stage" style="padding: 4px 10px; font-size: 12px;">
            Remove
          </button>
        </div>
        <div class="form-group" style="margin-bottom: 8px;">
          <input type="text" class="form-input stage-title-input" placeholder="Stage Title (e.g. The Chief Complaint)" value="${title}">
        </div>
        <div class="form-group">
          <textarea class="form-textarea stage-clue-input" placeholder="Enter clinical finding and progressive clues..." required>${clue}</textarea>
        </div>
      `;

      card.querySelector('.btn-del-stage').addEventListener('click', () => {
        if (stagesList.children.length <= 1) {
          AppUI.showToast('Cases must have at least 1 progressive stage.', 'error');
          return;
        }
        card.remove();
        this.renumberStages();
      });

      stagesList.appendChild(card);
    },

    renumberStages() {
      const stagesList = document.getElementById('stages-editor-list');
      if (!stagesList) return;
      Array.from(stagesList.children).forEach((child, idx) => {
        const numEl = child.querySelector('.stage-editor-num');
        if (numEl) numEl.textContent = `Stage ${idx + 1}`;
      });
    },

    collectCaseFromEditor() {
      const stagesList = document.getElementById('stages-editor-list');
      const stageCards = Array.from(stagesList.children);

      const stages = stageCards.map((card, idx) => {
        const titleInput = card.querySelector('.stage-title-input');
        const clueInput = card.querySelector('.stage-clue-input');
        return {
          stage: idx + 1,
          title: titleInput ? titleInput.value.trim() || `Stage ${idx + 1}` : `Stage ${idx + 1}`,
          clue: clueInput ? clueInput.value.trim() : ''
        };
      });

      const acceptedRaw = document.getElementById('form-accepted-answers').value;
      const acceptedAnswers = acceptedRaw
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const correctAns = document.getElementById('form-correct-diagnosis').value.trim();
      if (correctAns && !acceptedAnswers.includes(correctAns)) {
        acceptedAnswers.unshift(correctAns);
      }

      const lpRaw = document.getElementById('form-learning-points').value;
      const learningPoints = lpRaw
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const refRaw = document.getElementById('form-references').value;
      const references = refRaw
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
        .map(line => {
          const parts = line.split('|');
          return {
            title: parts[0]?.trim() || line,
            url: parts[1]?.trim() || ''
          };
        });

      // Parse JSON textareas safely
      let differentialDiagnoses = [];
      const diffRaw = document.getElementById('form-differentials-json')?.value.trim();
      if (diffRaw) {
        try {
          differentialDiagnoses = JSON.parse(diffRaw);
        } catch (e) {
          console.warn('[AdminManager] Invalid differentialDiagnoses JSON:', e);
        }
      }

      let wrongAnswerExplanations = [];
      const wrongRaw = document.getElementById('form-wrong-answers-json')?.value.trim();
      if (wrongRaw) {
        try {
          wrongAnswerExplanations = JSON.parse(wrongRaw);
        } catch (e) {
          console.warn('[AdminManager] Invalid wrongAnswerExplanations JSON:', e);
        }
      }

      let diagnosticReasoning = [];
      const drRaw = document.getElementById('form-diagnostic-reasoning-json')?.value.trim();
      if (drRaw) {
        try {
          diagnosticReasoning = JSON.parse(drRaw);
        } catch (e) {
          console.warn('[AdminManager] Invalid diagnosticReasoning JSON:', e);
        }
      }

      const insightTitle = document.getElementById('form-insight-title')?.value.trim();
      const insightContent = document.getElementById('form-insight-content')?.value.trim();
      const clinicalInsight = (insightTitle || insightContent)
        ? { title: insightTitle, content: insightContent }
        : undefined;

      const pitfallsRaw = document.getElementById('form-pitfalls')?.value || '';
      const whereReasoningCanGoWrong = pitfallsRaw
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const decisiveRaw = document.getElementById('form-decisive-findings')?.value || '';
      const decisiveFindings = decisiveRaw
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const aliasesRaw = document.getElementById('form-aliases')?.value || '';
      const aliases = aliasesRaw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const dispName = document.getElementById('form-display-diagnosis')?.value.trim() || correctAns;
      const shortExp = document.getElementById('form-diagnosis-short-explanation')?.value.trim() || '';
      const detailedExp = document.getElementById('form-diagnosis-detailed-explanation')?.value.trim() || '';
      const finalReasoning = document.getElementById('form-final-reasoning')?.value.trim() || '';

      const caseObj = {
        id: document.getElementById('form-case-id').value.trim(),
        title: document.getElementById('form-case-title').value.trim(),
        category: document.getElementById('form-case-category').value.trim() || 'Medicine',
        subcategory: document.getElementById('form-case-subcategory').value.trim() || '',
        difficulty: document.getElementById('form-case-difficulty').value || 'Progressive',
        status: document.getElementById('form-case-status')?.value || 'Published',
        settings: {
          startingLives: Number(document.getElementById('form-starting-lives').value) || 5,
          lifeLossPerWrongAnswer: 1,
          showNextClueAfterWrong: true,
          showAnswerAfterLivesZero: true,
          startingScore: 1000,
          wrongAnswerScorePenalty: 100
        },
        patient: {
          age: document.getElementById('form-patient-age').value.trim(),
          sex: document.getElementById('form-patient-sex').value.trim(),
          summary: document.getElementById('form-patient-summary').value.trim()
        },
        stages,
        diagnosis: {
          primary: correctAns,
          correctAnswer: correctAns,
          displayName: dispName,
          acceptedAnswers,
          aliases,
          shortExplanation: shortExp,
          detailedExplanation: detailedExp,
          decisiveFindings,
          finalReasoning
        },
        explanation: {
          clinicalSummary: document.getElementById('form-clinical-summary').value.trim(),
          reasoning: document.getElementById('form-clinical-reasoning').value.trim(),
          learningPoints,
          whereReasoningCanGoWrong
        },
        references
      };

      if (differentialDiagnoses.length > 0) caseObj.differentialDiagnoses = differentialDiagnoses;
      if (wrongAnswerExplanations.length > 0) caseObj.wrongAnswerExplanations = wrongAnswerExplanations;
      if (diagnosticReasoning.length > 0) caseObj.diagnosticReasoning = diagnosticReasoning;
      if (clinicalInsight) caseObj.clinicalInsight = clinicalInsight;
      if (whereReasoningCanGoWrong.length > 0) caseObj.whereReasoningCanGoWrong = whereReasoningCanGoWrong;
      if (decisiveFindings.length > 0) caseObj.decisiveFindings = decisiveFindings;
      if (finalReasoning) caseObj.finalReasoning = finalReasoning;

      return caseObj;
    },
    saveCaseFromEditor(skipDupCheck = false) {
      try {
        const caseObj = this.collectCaseFromEditor();

        if (!skipDupCheck && !this.editingCaseId) {
          const allExisting = CaseRepository.getAll().filter(c => String(c.id).toLowerCase() !== String(caseObj.id).toLowerCase());
          const dup = detectDuplicateCase(caseObj, allExisting);
          if (dup.isDuplicate) {
            if (dup.type === 'EXACT_ID') {
              AppUI.showToast(`Case ID "${caseObj.id}" already exists. Case IDs must be unique.`, 'error');
              return;
            } else {
              this.showDuplicateWarningModal(caseObj, dup, () => {
                this.saveCaseFromEditor(true);
              });
              return;
            }
          }
        }

        CaseRepository.save(caseObj);
        this.closeEditor();
        this.renderTable();
        AppUI.renderLibraryCases();
        AppUI.showToast(`Case "${caseObj.id}" saved successfully!`, 'success');
      } catch (err) {
        alert(`Validation Error: ${err.message}`);
      }
    },

    showDuplicateWarningModal(candidateCase, dupResult, onProceed) {
      const modal = document.getElementById('modal-duplicate-warning');
      if (!modal) {
        if (confirm(`Duplicate Warning: ${dupResult.message}\nDo you want to proceed anyway?`)) {
          onProceed();
        }
        return;
      }

      const typeLabel = document.getElementById('dup-type-label');
      const simBadge = document.getElementById('dup-similarity-badge');
      const details = document.getElementById('dup-warning-details');
      const summary = document.getElementById('dup-existing-case-summary');

      if (typeLabel) typeLabel.textContent = dupResult.type === 'TITLE_SIMILARITY' ? 'High Title Similarity' : 'High Clue Similarity';
      if (simBadge) simBadge.textContent = `${dupResult.similarity}% Match`;
      if (details) details.textContent = dupResult.message;
      if (summary && dupResult.existingCase) {
        summary.innerHTML = `
          <strong>Existing Case:</strong> ${dupResult.existingCase.id} — "${dupResult.existingCase.title}"<br>
          <span style="color: var(--color-slate-gray);">Diagnosis: ${dupResult.existingCase.diagnosis?.correctAnswer || 'N/A'}</span>
        `;
      }

      const btnCancel = document.getElementById('btn-dup-cancel');
      const btnClose = document.getElementById('modal-dup-close');
      const btnView = document.getElementById('btn-dup-view-existing');
      const btnAddAnyway = document.getElementById('btn-dup-add-anyway');

      const cleanup = () => {
        modal.classList.remove('modal-open');
        btnCancel?.removeEventListener('click', onCancel);
        btnClose?.removeEventListener('click', onCancel);
        btnView?.removeEventListener('click', onView);
        btnAddAnyway?.removeEventListener('click', onAdd);
      };

      const onCancel = () => cleanup();
      const onView = () => {
        cleanup();
        this.openEditor(dupResult.existingCase.id);
      };
      const onAdd = () => {
        cleanup();
        onProceed();
      };

      btnCancel?.addEventListener('click', onCancel);
      btnClose?.addEventListener('click', onCancel);
      btnView?.addEventListener('click', onView);
      btnAddAnyway?.addEventListener('click', onAdd);

      modal.classList.add('modal-open');
    },

    backupEverything() {
      const backupData = {
        exportType: 'WiseCases-Complete-Backup',
        version: '2.5.0',
        exportedAt: new Date().toISOString(),
        cases: CaseRepository.getAll(),
        results: ResultRepository.getAll(),
        config: (typeof window !== 'undefined' ? window.WISECASES_CONFIG : {}) || {}
      };
      const nowStr = new Date().toISOString().split('T')[0];
      if (typeof this.downloadJsonBlob === 'function') {
        this.downloadJsonBlob(backupData, `wisecases-backup-${nowStr}.json`);
      }
      if (typeof AppUI !== 'undefined' && AppUI.showToast) {
        AppUI.showToast('Full WiseCases backup downloaded.', 'success');
      }
      return backupData;
    },

    async downloadCaseTemplate() {
      try {
        let templateData = null;
        try {
          const resp = await fetch('data/case-template.json');
          if (resp.ok) templateData = await resp.json();
        } catch (e) {}

        if (!templateData) {
          templateData = {
            schemaVersion: "2.0",
            id: "CASE-XXX",
            title: "Clinical Scenario Title",
            category: "Medicine",
            subcategory: "Subspecialty",
            difficulty: "Progressive",
            stages: [
              { stage: 1, title: "The Chief Complaint", clue: "Patient presentation...", decisionQuestion: "What should you think here?" }
            ],
            diagnosis: { correctAnswer: "Primary Diagnosis", acceptedAnswers: [] },
            explanation: { clinicalSummary: "Summary...", reasoning: "Reasoning...", learningPoints: [] }
          };
        }
        this.downloadJsonBlob(templateData, 'wisecases-case-template.json');
        AppUI.showToast('Official Case JSON Template downloaded.', 'success');
      } catch (err) {
        AppUI.showToast('Could not download template: ' + err.message, 'error');
      }
    },

    downloadCsvBlob(csvContent, filename) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    duplicateCase(caseId) {
      try {
        const dup = CaseRepository.duplicate(caseId);
        this.renderTable();
        AppUI.renderLibraryCases();
        AppUI.showToast(`Duplicated into "${dup.id}".`, 'success');
      } catch (err) {
        AppUI.showToast(err.message, 'error');
      }
    },

    deleteCase(caseId) {
      AppUI.showConfirmModal(
        `Delete Case ${caseId}?`,
        `Are you sure you want to permanently delete case ${caseId}? This action cannot be reversed.`,
        () => {
          CaseRepository.delete(caseId);
          this.renderTable();
          AppUI.renderLibraryCases();
          AppUI.showToast(`Case ${caseId} deleted.`, 'info');
        }
      );
    },

    bindEditorEvents() {
      document.getElementById('modal-editor-close')?.addEventListener('click', () => this.closeEditor());
      document.getElementById('modal-editor-cancel')?.addEventListener('click', () => this.closeEditor());
      document.getElementById('btn-add-stage')?.addEventListener('click', () => this.addStageRow());
      document.getElementById('btn-editor-save')?.addEventListener('click', () => this.saveCaseFromEditor());

      document.getElementById('btn-editor-preview')?.addEventListener('click', () => {
        try {
          const caseObj = this.collectCaseFromEditor();
          this.closeEditor();
          GameEngine.startCase(caseObj, true); // Preview mode!
          window.location.hash = `#game/${caseObj.id}`;
          AppUI.renderGame();
        } catch (err) {
          alert(`Validation Error: ${err.message}`);
        }
      });

      document.getElementById('btn-editor-export-single')?.addEventListener('click', () => {
        try {
          const caseObj = this.collectCaseFromEditor();
          this.downloadJsonBlob(caseObj, `${caseObj.id || 'case'}.json`);
        } catch (err) {
          alert(`Export error: ${err.message}`);
        }
      });
    },

    // ------------------------------------------------------------------------
    // Export Functions
    // ------------------------------------------------------------------------
    exportSingleCase(caseId) {
      const c = CaseRepository.getById(caseId);
      if (!c) return;
      this.downloadJsonBlob(c, `${c.id}.json`);
      AppUI.showToast(`Exported ${c.id}.json`, 'success');
    },

    exportAllCases() {
      const all = CaseRepository.getAll();
      const payload = { cases: all };
      this.downloadJsonBlob(payload, 'wisecases-curriculum.json');
      AppUI.showToast(`Exported all ${all.length} cases.`, 'success');
    },

    downloadJsonBlob(data, filename) {
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    // ------------------------------------------------------------------------
    // Import Functions & Real-time Validation
    // ------------------------------------------------------------------------
    openImportModal() {
      const modal = document.getElementById('modal-import-json');
      if (!modal) return;

      this.pendingImportCases = [];
      document.getElementById('import-json-textarea').value = '';
      document.getElementById('import-file-input').value = '';
      
      const valBox = document.getElementById('import-validation-box');
      valBox.className = 'import-feedback-box';
      valBox.style.display = 'none';

      document.getElementById('btn-import-confirm').disabled = true;
      modal.classList.add('modal-open');
    },

    closeImportModal() {
      const modal = document.getElementById('modal-import-json');
      if (modal) modal.classList.remove('modal-open');
    },

    bindImportEvents() {
      document.getElementById('modal-import-close')?.addEventListener('click', () => this.closeImportModal());
      document.getElementById('modal-import-cancel')?.addEventListener('click', () => this.closeImportModal());

      // Dropzone click
      const dropzone = document.getElementById('import-dropzone');
      const fileInput = document.getElementById('import-file-input');

      if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
          e.preventDefault();
          dropzone.style.borderColor = 'var(--color-wise-blue)';
        });
        dropzone.addEventListener('dragleave', () => {
          dropzone.style.borderColor = 'var(--color-ai-glow-blue)';
        });
        dropzone.addEventListener('drop', (e) => {
          e.preventDefault();
          dropzone.style.borderColor = 'var(--color-ai-glow-blue)';
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.handleFileSelected(e.dataTransfer.files[0]);
          }
        });

        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            this.handleFileSelected(e.target.files[0]);
          }
        });
      }

      // Textarea live input validation
      const textarea = document.getElementById('import-json-textarea');
      if (textarea) {
        textarea.addEventListener('input', () => {
          this.validateImportRaw(textarea.value);
        });
      }

      // Confirm Import
      document.getElementById('btn-import-confirm')?.addEventListener('click', () => {
        if (this.pendingImportCases.length > 0) {
          const count = CaseRepository.commitImport(this.pendingImportCases);
          this.closeImportModal();
          this.renderTable();
          AppUI.renderLibraryCases();
          AppUI.showToast(`Successfully imported ${count} clinical case(s)!`, 'success');
        }
      });
    },

    handleFileSelected(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        document.getElementById('import-json-textarea').value = content;
        this.validateImportRaw(content);
      };
      reader.readAsText(file);
    },

    validateImportRaw(text) {
      const valBox = document.getElementById('import-validation-box');
      const sumEl = document.getElementById('import-val-summary');
      const detEl = document.getElementById('import-val-details');
      const confirmBtn = document.getElementById('btn-import-confirm');

      if (!text || !text.trim()) {
        valBox.style.display = 'none';
        confirmBtn.disabled = true;
        this.pendingImportCases = [];
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        valBox.className = 'import-feedback-box error visible';
        sumEl.textContent = '✕ INVALID JSON FORMAT';
        detEl.textContent = `Parse error: ${err.message}`;
        confirmBtn.disabled = true;
        this.pendingImportCases = [];
        return;
      }

      const res = CaseRepository.importCases(parsed);
      const validCount = res.validCases.length;
      const errorCount = res.totalDetected - validCount;

      valBox.style.display = 'block';

      if (validCount > 0) {
        valBox.className = 'import-feedback-box success visible';
        sumEl.textContent = `IMPORT VALIDATION — ${res.totalDetected} case${res.totalDetected === 1 ? '' : 's'} detected`;
        detEl.innerHTML = `
          ✓ ${validCount} valid cases ready for import.<br>
          ${errorCount > 0 ? `✕ ${errorCount} case(s) contain validation errors and will be omitted.<br>` : ''}
          Click "Import Cases" to commit these to your curriculum library.
        `;
        confirmBtn.disabled = false;
        confirmBtn.textContent = `Import ${validCount} Case${validCount === 1 ? '' : 's'}`;
        this.pendingImportCases = res.validCases;
      } else {
        valBox.className = 'import-feedback-box error visible';
        sumEl.textContent = `✕ IMPORT VALIDATION FAILED — 0 of ${res.totalDetected} cases valid`;
        detEl.innerHTML = (res.report || []).map(r => `<div><strong>${r.item}</strong>: ${r.errors?.join(', ')}</div>`).join('');
        confirmBtn.disabled = true;
        this.pendingImportCases = [];
      }
    }
  };

  // ==========================================================================
  // 7B. IMPORT CENTER (Excel .xlsx, CSV, and JSON multi-format bulk ingestion)
  // ==========================================================================
  const ImportCenter = {
    currentType: 'csv',
    pendingCases: [],
    validationReport: { total: 0, valid: 0, warnings: 0, errors: 0, duplicates: 0, details: [] },

    init() {
      this.bindEvents();
    },

    initView() {
      this.reset();
      this.setImportType('csv');
    },

    setImportType(type) {
      this.currentType = type;
      ['csv', 'excel', 'json'].forEach(t => {
        const card = document.getElementById(`import-type-${t}`);
        if (card) {
          if (t === type) card.classList.add('active');
          else card.classList.remove('active');
        }
      });
    },

    reset() {
      this.pendingCases = [];
      this.validationReport = { total: 0, valid: 0, warnings: 0, errors: 0, duplicates: 0, details: [] };
      const mapPanel = document.getElementById('import-mapping-panel');
      const valPanel = document.getElementById('import-validation-card');
      const pasteArea = document.getElementById('import-paste-textarea');
      const fileInput = document.getElementById('import-file-input');
      if (mapPanel) mapPanel.style.display = 'none';
      if (valPanel) valPanel.style.display = 'none';
      if (pasteArea) pasteArea.value = '';
      if (fileInput) fileInput.value = '';
    },

    bindEvents() {
      const dropzone = document.getElementById('import-dropzone');
      const fileInput = document.getElementById('import-file-input');
      const pasteBtn = document.getElementById('btn-parse-pasted-data');
      const commitBtn = document.getElementById('btn-commit-import');
      const confirmMapBtn = document.getElementById('btn-confirm-mapping');

      if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.handleFile(e.dataTransfer.files[0]);
          }
        });
        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files.length > 0) {
            this.handleFile(e.target.files[0]);
          }
        });
      }

      if (pasteBtn) {
        pasteBtn.addEventListener('click', () => {
          const text = document.getElementById('import-paste-textarea')?.value.trim();
          if (!text) {
            AppUI.showToast('Please paste data before parsing.', 'error');
            return;
          }
          this.handleRawText(text);
        });
      }

      if (confirmMapBtn) {
        confirmMapBtn.addEventListener('click', () => {
          this.validateAndPreview(this.pendingCases);
        });
      }

      if (commitBtn) {
        commitBtn.addEventListener('click', () => {
          this.commitImport();
        });
      }
    },

    handleFile(file) {
      const name = file.name.toLowerCase();
      if (name.endsWith('.json')) {
        this.setImportType('json');
        const reader = new FileReader();
        reader.onload = (e) => this.handleRawText(e.target.result, 'json');
        reader.readAsText(file);
      } else if (name.endsWith('.csv')) {
        this.setImportType('csv');
        const reader = new FileReader();
        reader.onload = (e) => this.handleRawText(e.target.result, 'csv');
        reader.readAsText(file);
      } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
        this.setImportType('excel');
        const reader = new FileReader();
        reader.onload = (e) => this.handleExcelBuffer(e.target.result);
        reader.readAsArrayBuffer(file);
      } else {
        AppUI.showToast('Unsupported file type. Use .csv, .xlsx, or .json.', 'error');
      }
    },

    handleRawText(text, forcedFormat) {
      let format = forcedFormat || this.currentType;
      if (!forcedFormat) {
        if (text.trim().startsWith('{') || text.trim().startsWith('[')) format = 'json';
        else format = 'csv';
      }

      if (format === 'json') {
        try {
          const parsed = JSON.parse(text);
          const cases = Array.isArray(parsed) ? parsed : (parsed.cases || [parsed]);
          this.pendingCases = cases;
          this.validateAndPreview(cases);
        } catch (err) {
          AppUI.showToast('Invalid JSON syntax: ' + err.message, 'error');
        }
      } else {
        try {
          const cases = this.parseCSV(text);
          this.pendingCases = cases;
          this.validateAndPreview(cases);
        } catch (err) {
          AppUI.showToast('CSV parsing error: ' + err.message, 'error');
        }
      }
    },

    handleExcelBuffer(buffer) {
      if (typeof XLSX !== 'undefined') {
        try {
          const workbook = XLSX.read(buffer, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const csvText = XLSX.utils.sheet_to_csv(firstSheet);
          const cases = this.parseCSV(csvText);
          this.pendingCases = cases;
          this.validateAndPreview(cases);
        } catch (err) {
          AppUI.showToast('Excel reading failed: ' + err.message, 'error');
        }
      } else {
        AppUI.showToast('Excel (.xlsx) parser is initializing. If offline, use CSV format.', 'info');
      }
    },

    parseCSV(text) {
      const lines = [];
      let currentLine = [];
      let currentCell = '';
      let insideQuotes = false;

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
          if (insideQuotes && nextChar === '"') {
            currentCell += '"';
            i++;
          } else {
            insideQuotes = !insideQuotes;
          }
        } else if (char === ',' && !insideQuotes) {
          currentLine.push(currentCell.trim());
          currentCell = '';
        } else if ((char === '\r' || char === '\n') && !insideQuotes) {
          if (char === '\r' && nextChar === '\n') i++;
          currentLine.push(currentCell.trim());
          if (currentLine.some(c => c.length > 0)) lines.push(currentLine);
          currentLine = [];
          currentCell = '';
        } else {
          currentCell += char;
        }
      }
      if (currentCell.length > 0 || currentLine.length > 0) {
        currentLine.push(currentCell.trim());
        if (currentLine.some(c => c.length > 0)) lines.push(currentLine);
      }

      if (lines.length < 2) return [];

      const rawHeaders = lines[0].map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));
      const cases = [];

      for (let r = 1; r < lines.length; r++) {
        const row = lines[r];
        const rowObj = {};
        for (let c = 0; c < rawHeaders.length; c++) {
          rowObj[rawHeaders[c]] = row[c] || '';
        }

        // Build Schema 2.0 Case
        const caseId = rowObj['id'] || rowObj['case_id'] || ('CASE-' + String(r).padStart(3, '0'));
        const caseTitle = rowObj['title'] || rowObj['case_title'] || 'Untitled Case';
        const category = rowObj['category'] || rowObj['specialty'] || 'Medicine';
        const subcategory = rowObj['subcategory'] || '';
        const difficulty = rowObj['difficulty'] || 'Progressive';
        const status = rowObj['status'] || 'Published';

        const canonicalDiag = rowObj['canonical_diagnosis'] || rowObj['diagnosis'] || rowObj['correctanswer'] || '';
        const displayTitle = rowObj['display_title'] || canonicalDiag;
        const acceptedRaw = rowObj['accepted_answers'] || rowObj['acceptedanswers'] || canonicalDiag;
        const acceptedAnswers = acceptedRaw.split(';').map(a => a.trim()).filter(Boolean);
        if (canonicalDiag && !acceptedAnswers.includes(canonicalDiag)) acceptedAnswers.unshift(canonicalDiag);

        const patientAge = rowObj['patientage'] || rowObj['age'] || '50';
        const patientSex = rowObj['patientsex'] || rowObj['sex'] || 'Unknown';
        const patientSummary = rowObj['patientsummary'] || rowObj['summary'] || '';

        const whyCorrect = rowObj['why_correct'] || rowObj['whycorrect'] || 'Matches progressive findings.';
        const detailedExplanation = rowObj['detailed_explanation'] || rowObj['explanation'] || '';
        const decisiveRaw = rowObj['decisive_findings'] || '';
        const decisiveFindings = decisiveRaw ? decisiveRaw.split(';').map(s => s.trim()).filter(Boolean) : [];
        const pitfallsRaw = rowObj['where_reasoning_can_go_wrong'] || rowObj['pitfalls'] || '';
        const whereReasoningCanGoWrong = pitfallsRaw ? pitfallsRaw.split(';').map(s => s.trim()).filter(Boolean) : [];

        // Dynamic Stages Extraction (Detect up to 20 stages)
        const stages = [];
        for (let s = 1; s <= 20; s++) {
          const sTitle = rowObj[`stage${s}_title`] || rowObj[`stage_${s}_title`];
          const sClue = rowObj[`stage${s}_clue`] || rowObj[`stage_${s}_clue`];
          const sReason = rowObj[`stage${s}_reasoning`] || rowObj[`stage_${s}_reasoning`] || '';

          if (sTitle || sClue) {
            stages.push({
              stage: s,
              title: sTitle || `Stage ${s}`,
              clue: sClue || 'Clinical clues disclosed at this stage.',
              whatWasKnown: `Findings from Stage 1 to ${s}.`,
              whatShouldYouThink: `Evaluate clues pointing toward ${sTitle || 'differential'}.`,
              importantClues: sClue || '',
              decisionPoint: `Formulate working diagnosis for Stage ${s}.`,
              reasoning: sReason || 'Progressive clinical deduction.',
              keyTakeaway: `Key findings synthesized in Stage ${s}.`,
              crossReferences: []
            });
          }
        }

        // Fallback if no stage columns found
        if (stages.length === 0) {
          stages.push({
            stage: 1,
            title: 'Initial Presentation',
            clue: patientSummary || 'Patient presents for clinical diagnostic evaluation.',
            whatWasKnown: 'Initial chief complaint.',
            whatShouldYouThink: 'Formulate differential diagnosis.',
            importantClues: patientSummary || 'Presentation clues',
            decisionPoint: 'Initial evaluation.',
            reasoning: 'Baseline presentation.',
            keyTakeaway: 'Always establish clear clinical timeline.'
          });
        }

        cases.push({
          schemaVersion: '2.0',
          id: caseId,
          title: caseTitle,
          displayTitle: displayTitle,
          category: category,
          subcategory: subcategory,
          difficulty: difficulty,
          status: status,
          settings: { startingLives: 5, startingScore: 1000, wrongAnswerScorePenalty: 100 },
          patient: { age: patientAge, sex: patientSex, summary: patientSummary },
          stages: stages,
          diagnosis: {
            canonical: canonicalDiag,
            correctAnswer: canonicalDiag,
            displayTitle: displayTitle,
            acceptedAnswers: acceptedAnswers,
            aliases: acceptedAnswers,
            detailedExplanation: detailedExplanation,
            whyCorrect: whyCorrect,
            decisiveFindings: decisiveFindings
          },
          learningPoints: decisiveFindings.length > 0 ? decisiveFindings : ['Carefully assess diagnostic milestones.'],
          whereReasoningCanGoWrong: whereReasoningCanGoWrong
        });
      }

      return cases;
    },

    validateAndPreview(cases) {
      const valPanel = document.getElementById('import-validation-card');
      const breakdownEl = document.getElementById('import-validation-breakdown');
      const commitBtn = document.getElementById('btn-commit-import');
      if (valPanel) valPanel.style.display = 'block';

      let total = cases.length;
      let valid = 0;
      let warnings = 0;
      let errors = 0;
      let duplicates = 0;
      const details = [];

      const existingIds = new Set(CaseRepository.getAll().map(c => String(c.id).toLowerCase()));

      cases.forEach((c, idx) => {
        const itemIssues = [];
        let isItemValid = true;

        if (!c.id) {
          itemIssues.push('✕ Missing required case ID.');
          isItemValid = false;
        }
        if (!c.title) {
          itemIssues.push('✕ Missing required case title.');
          isItemValid = false;
        }
        const diag = c.diagnosis ? (c.diagnosis.canonical || c.diagnosis.correctAnswer) : '';
        if (!diag) {
          itemIssues.push('✕ Missing canonical diagnosis.');
          isItemValid = false;
        }
        if (!c.stages || !Array.isArray(c.stages) || c.stages.length === 0) {
          itemIssues.push('✕ Case must contain at least 1 stage.');
          isItemValid = false;
        }

        const isDup = c.id && existingIds.has(String(c.id).toLowerCase());
        if (isDup) {
          duplicates++;
          itemIssues.push(`⚠ Duplicate ID "${c.id}" already exists in curriculum.`);
        }

        if (isItemValid) {
          valid++;
          if (itemIssues.length > 0) warnings++;
        } else {
          errors++;
        }

        details.push({
          caseId: c.id || `Row ${idx + 1}`,
          title: c.title || 'Untitled',
          isValid: isItemValid,
          isDuplicate: isDup,
          issues: itemIssues
        });
      });

      this.validationReport = { total, valid, warnings, errors, duplicates, details };

      // Update counters
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      setVal('val-metric-total', total);
      setVal('val-metric-valid', valid);
      setVal('val-metric-warnings', warnings);
      setVal('val-metric-errors', errors);
      setVal('val-metric-duplicates', duplicates);

      // Render breakdown list
      if (breakdownEl) {
        breakdownEl.innerHTML = details.map(d => `
          <div style="padding: 6px 0; border-bottom: 1px solid var(--color-light-gray); display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
            <div>
              <strong>${d.caseId}</strong>: ${d.title}
              ${d.issues.map(iss => `<div style="font-size: 12px; color: ${iss.startsWith('✕') ? 'var(--color-warning-red)' : '#D97706'};">${iss}</div>`).join('')}
            </div>
            <span class="badge ${d.isValid ? (d.isDuplicate ? 'badge-neutral' : 'badge-green') : 'badge-red'}">
              ${d.isValid ? (d.isDuplicate ? 'Duplicate' : '✓ Valid') : '✕ Invalid'}
            </span>
          </div>
        `).join('');
      }

      if (commitBtn) {
        commitBtn.disabled = valid === 0;
        commitBtn.textContent = `Commit ${valid} Valid Case${valid === 1 ? '' : 's'} to Curriculum`;
      }
    },

    commitImport() {
      const strategyEl = document.getElementById('import-duplicate-strategy');
      const strategy = strategyEl ? strategyEl.value : 'copy';
      const existingCases = CaseRepository.getAll();
      const existingIds = new Set(existingCases.map(c => String(c.id).toLowerCase()));

      let importedCount = 0;
      this.pendingCases.forEach(c => {
        if (!c.id || !c.title) return;
        const diag = c.diagnosis ? (c.diagnosis.canonical || c.diagnosis.correctAnswer) : '';
        if (!diag || !c.stages || c.stages.length === 0) return;

        const isDup = existingIds.has(String(c.id).toLowerCase());
        if (isDup) {
          if (strategy === 'skip') {
            return;
          } else if (strategy === 'copy') {
            let copyId = c.id + '-COPY';
            let counter = 2;
            while (existingIds.has(copyId.toLowerCase())) {
              copyId = `${c.id}-COPY-${counter}`;
              counter++;
            }
            c.id = copyId;
            c.title = `${c.title} (Copy)`;
            CaseRepository.saveCase(c);
            importedCount++;
          } else if (strategy === 'replace') {
            CaseRepository.saveCase(c);
            importedCount++;
          }
        } else {
          CaseRepository.saveCase(c);
          importedCount++;
        }
      });

      AppUI.showToast(`Successfully committed ${importedCount} cases to curriculum.`, 'success');
      AppUI.renderLibraryCases();
      AppUI.renderAdminCases();
      window.location.hash = '#library';
    },

    downloadDemoCsv() {
      const sample = CaseRepository.getAll();
      const csv = generateCaseInventoryCSV(sample);
      AdminManager.downloadCsvBlob(csv, 'wisecases-demo-import.csv');
      AppUI.showToast('Sample CSV downloaded for editing.', 'info');
    }
  };

  // ==========================================================================
  // 7C. SETTINGS MANAGER (Layer B Data persistence, Google Apps Script & Defaults)
  // ==========================================================================
  const SettingsManager = {
    init() {
      this.bindEvents();
    },

    initView() {
      const config = window.WISECASES_CONFIG || {};
      const mode = config.mode || 'local';
      this.updateModeUI(mode);

      const gasUrlInput = document.getElementById('settings-gas-url-input');
      if (gasUrlInput) gasUrlInput.value = config.googleAppsScript?.baseUrl || '';

      const defLives = document.getElementById('settings-default-lives');
      const startScore = document.getElementById('settings-starting-score');
      const wrongPenalty = document.getElementById('settings-wrong-penalty');
      if (defLives) defLives.value = config.player?.defaultLives || 5;
      if (startScore) startScore.value = config.player?.startingScore || 1000;
      if (wrongPenalty) wrongPenalty.value = config.player?.wrongAnswerPenalty || 100;

      const pIdDisplay = document.getElementById('settings-player-id-display');
      if (pIdDisplay) pIdDisplay.textContent = PlayerService.getPlayerId();
    },

    setDataMode(mode) {
      window.WISECASES_CONFIG.mode = mode;
      if (mode === 'google') {
        window.WISECASES_CONFIG.googleAppsScript.enabled = true;
      }
      this.persistConfig();
      this.updateModeUI(mode);
      AppUI.showToast(`Data mode switched to ${mode === 'google' ? 'Google Sheets' : 'Local Mode'}.`, 'info');
    },

    updateModeUI(mode) {
      const cardLocal = document.getElementById('mode-card-local');
      const cardGoogle = document.getElementById('mode-card-google');
      const badgeLocal = document.getElementById('badge-mode-local');
      const badgeGoogle = document.getElementById('badge-mode-google');
      const gasBox = document.getElementById('gas-config-container');

      if (mode === 'google') {
        if (cardLocal) cardLocal.classList.remove('active');
        if (cardGoogle) cardGoogle.classList.add('active');
        if (badgeLocal) { badgeLocal.textContent = 'Inactive'; badgeLocal.className = 'badge badge-neutral'; }
        if (badgeGoogle) { badgeGoogle.textContent = 'Active'; badgeGoogle.className = 'badge badge-green'; }
        if (gasBox) gasBox.style.display = 'block';
      } else {
        if (cardLocal) cardLocal.classList.add('active');
        if (cardGoogle) cardGoogle.classList.remove('active');
        if (badgeLocal) { badgeLocal.textContent = 'Active'; badgeLocal.className = 'badge badge-green'; }
        if (badgeGoogle) { badgeGoogle.textContent = 'Optional'; badgeGoogle.className = 'badge badge-neutral'; }
        if (gasBox) gasBox.style.display = 'none';
      }
    },

    persistConfig() {
      try {
        localStorage.setItem('wisecases_config_override', JSON.stringify(window.WISECASES_CONFIG));
      } catch (e) {
        console.warn('Could not save configuration override:', e);
      }
    },

    bindEvents() {
      document.getElementById('mode-card-local')?.addEventListener('click', () => {
        this.setDataMode('local');
      });
      document.getElementById('mode-card-google')?.addEventListener('click', () => {
        this.setDataMode('google');
      });

      document.getElementById('btn-test-gas-connection')?.addEventListener('click', () => {
        this.testGasConnection();
      });

      document.getElementById('btn-save-game-settings')?.addEventListener('click', () => {
        const lives = parseInt(document.getElementById('settings-default-lives')?.value, 10) || 5;
        const score = parseInt(document.getElementById('settings-starting-score')?.value, 10) || 1000;
        const penalty = parseInt(document.getElementById('settings-wrong-penalty')?.value, 10) || 100;

        window.WISECASES_CONFIG.player = { defaultLives: lives, startingScore: score, wrongAnswerPenalty: penalty };
        this.persistConfig();
        AppUI.showToast('Clinical simulation preferences saved.', 'success');
      });

      document.getElementById('btn-regenerate-player-id')?.addEventListener('click', () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let newId = 'WC-';
        for (let i = 0; i < 8; i++) newId += chars.charAt(Math.floor(Math.random() * chars.length));
        PlayerService.savePlayerId(newId);
        const pIdDisplay = document.getElementById('settings-player-id-display');
        if (pIdDisplay) pIdDisplay.textContent = newId;
        AppUI.showToast(`New anonymous Player ID generated: ${newId}`, 'info');
      });

      document.getElementById('btn-settings-clear-history')?.addEventListener('click', () => {
        AppUI.showConfirmModal(
          'Clear Diagnostic Performance Records?',
          'Are you sure you want to delete all saved test attempts and scores? This cannot be undone.',
          () => {
            ResultRepository.clearHistory();
            AppUI.renderMyResults();
            AppUI.showToast('Diagnostic performance history cleared.', 'info');
          }
        );
      });

      document.getElementById('btn-settings-reset-demo')?.addEventListener('click', () => {
        AppUI.showConfirmModal(
          'Reset Curriculum to Official Demo Cases?',
          'This will purge any custom imported cases and restore CASE-001 through CASE-006. Are you sure?',
          () => {
            CaseRepository.resetToDemoData();
            ResultRepository.clearHistory();
            AppUI.renderLibraryCases();
            AppUI.renderAdminCases();
            AppUI.showToast('Demo curriculum restored.', 'success');
          }
        );
      });
    },

    async testGasConnection() {
      const urlInput = document.getElementById('settings-gas-url-input');
      const wrap = document.getElementById('gas-test-result-wrap');
      const badge = document.getElementById('gas-status-badge');
      const diagBox = document.getElementById('gas-diagnostic-box');

      const url = urlInput ? urlInput.value.trim() : '';
      if (!url) {
        AppUI.showToast('Please enter a Google Apps Script Web App URL.', 'error');
        return;
      }

      window.WISECASES_CONFIG.googleAppsScript.baseUrl = url;
      this.persistConfig();

      if (wrap) wrap.style.display = 'block';
      if (badge) { badge.textContent = 'TESTING...'; badge.className = 'badge badge-neutral'; }
      if (diagBox) diagBox.textContent = `Connecting to ${url}?action=health ...`;

      try {
        const testUrl = url.includes('?') ? `${url}&action=health` : `${url}?action=health`;
        const res = await fetch(testUrl);
        const data = await res.json();

        if (data && data.success) {
          if (badge) { badge.textContent = 'CONNECTED ✓'; badge.className = 'badge badge-green'; }
          if (diagBox) diagBox.textContent = JSON.stringify(data, null, 2);
          AppUI.showToast('Successfully connected to Google Apps Script backend!', 'success');
        } else {
          if (badge) { badge.textContent = 'CONNECTION FAILED ✕'; badge.className = 'badge badge-red'; }
          if (diagBox) diagBox.textContent = JSON.stringify(data, null, 2);
          AppUI.showToast('Backend responded with error: ' + (data?.error?.message || 'Check endpoint'), 'error');
        }
      } catch (err) {
        if (badge) { badge.textContent = 'CONNECTION FAILED ✕'; badge.className = 'badge badge-red'; }
        if (diagBox) {
          diagBox.textContent = `HTTP / CORS Failure: ${err.message}\n\nTroubleshooting Tips:\n1. Verify Web App was deployed with access "Anyone".\n2. Confirm the URL ends with /exec.\n3. Note: If browser blocks cross-origin requests, Local Mode remains active.`;
        }
        AppUI.showToast('Connection failed. Verify Web App URL and permissions.', 'error');
      }
    }
  };

  // ==========================================================================
  // GLOBAL EXPORTS FOR DEV, TESTING, AND REPOSITORY ABSTRACTION
  // ==========================================================================
  const WiseCasesApp = {
    WISECASES_CONFIG,
    PlayerService,
    LocalCaseRepository,
    GoogleSheetsCaseRepository,
    CaseRepository,
    ConditionRepository,
    ResultRepository,
    GameEngine,
    AutocompleteController,
    AppUI,
    AdminManager,
    ImportCenter,
    SettingsManager,
    detectDuplicateCase,
    generateCaseInventoryCSV
  };

  if (typeof window !== 'undefined') {
    window.WISECASES_CONFIG = WISECASES_CONFIG;
    window.WISECASES = WiseCasesApp;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.WISECASES_CONFIG = WISECASES_CONFIG;
    globalThis.WISECASES = WiseCasesApp;
  }

  // ==========================================================================
  // 8. BOOTSTRAP APPLICATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await CaseRepository.init();
      await ConditionRepository.init();
      ResultRepository.init();
      AppUI.init();
      AdminManager.init();
      ImportCenter.init();
      SettingsManager.init();
      AutocompleteController.init();
      console.log('WiseCases Progressive Clinical Diagnosis Engine initialized successfully.');
    } catch (err) {
      console.error('Fatal initialization error:', err);
      alert('Application failed to initialize: ' + err.message);
    }
  });

})();
