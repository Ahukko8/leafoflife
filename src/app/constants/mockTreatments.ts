interface Treatment {
  id: string;
  title: string;
  description: string;
  items?: string[];
  // imageUrl: string;
}

const MOCK_TREATMENTS: Treatment[] = [
  {
    id: "1",
    title: "Herbal Medicine",
    description:
      "Herbal medicine uses plants or plant extracts to treat various health conditions and support overall health. Includes Maldivian traditional medicine along with other herbal medications",
    // imageUrl: "/images/general-health.jpg",
  },
  {
    id: "2",
    title: "Cupping",
    description:
      "Cupping is a traditional therapy that involves placing cups on the skin to create suction, promoting blood flow and healing.",
    items: [
      "Dry cupping",
      "Herbal cupping",
      "Massage cupping",
      "Flash cupping",
      "Fire cupping",
      "Bamboo cupping",
      "Wet cupping",
    ],
  },
  {
    id: "3",
    title: "Moxabustion",
    description:
      "Moxibustion is a traditional Chinese medicine therapy that involves burning dried mugwort (a herb called moxa) near or on specific acupuncture points on the body.",
    // imageUrl: "/images/mental-health.jpg",
  },
  {
    id: "4",
    title: "Acurepresure",
    description:
      "Acupressure is a traditional healing practice that involves applying pressure to specific points on the body, known as acupoints, to stimulate the body's natural self-healing abilities.",
    // icon: "/icons/ui-ux-design.svg",
  },
  {
    id: "5",
    title: "Acurepuncture",
    description:
      "Acupuncture is a traditional Chinese medicine practice that involves inserting thin, sterile needles into specific points on the body, known as acupuncture points or acupoints.",
    // icon: "/icons/ui-ux-design.svg",
  },
  {
    id: "6",
    title: "Herbal physiotherapy",
    description:
      "Herbal physiotherapy combines traditional physiotherapy techniques with the therapeutic use of herbal remedies to enhance healing and recovery.",
    // icon: "/icons/ui-ux-design.svg",
  },
  {
    id: "7",
    title: "21 days diet plan",
    description:
      "Personlized 21 days diet plan for customers with various health issues or for general well being, as well as for athletes and body building.",
  },
  {
    id: "8",
    title: "Neurological Diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Neurological diseases such as: ",
    items: [
      "Parkinson",
      "progressive supramolecular palsy(PSP)",
      "Amyotrophic lateral sclerosis",
      "Alzheimer",
      "vascular dementia",
      "Torticollis",
      "TIC",
      "Tremor",
      "Stuttering",
      "Migraine",
      "Headache",
      "Pituitary adenoma",
      "Paralysis",
      "Cerebral palsy",
      "Belis palsy",
      "Epilepsy",
      "trigeminal neuralgia",
      "Hearing problems",
      "Tinnitus",
      "Insomnia",
      "Oversleeping",
      "Sciatica",
    ],
  },
  {
    id: "9",
    title: "Skin Diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Skin diseases such as:",
    items: [
      "Acne",
      "Eczema",
      "Psoriasis",
      "Alopecia areata",
      "Atopic dermatitis",
      "Epidermolysis bullosa",
      "Vitiligo",
      "Hidradenitis suppurative",
      "Ichthyosis",
      "Pachyonychia cogentia",
      "Pemphigus",
      "Raynauds phenomenon",
      "Rosacea",
      "Scleroderma",
      "Dandruff",
      "Skin tags",
      "Skin warts",
      "Hemorrhoids",
    ],
  },

  {
    id: "10",
    title: "Bone and Joints Diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Bone and Joints diseases such as:",
    items: [
      "Osteoarthritis",
      "Rheumatoid arthritis",
      "Back pain",
      "Paget's disease of bone",
      "joint pain",
      "Scoliosis",
      "Ankylosing spondylitis",
      "Fracture",
      "Rickets",
      "Osteopetrosis",
      "Born diseases",
      "Gout",
      "Fibrous dysplasia of bone",
      "Lupus",
      "Bursitis",
      "Osteopenia",
      "Fibromyalgia",
      "Osteomyelitis",
      "Osteonecrosis",
      "Osteoporosis",
      "Herniated disc",
      "Disc diseases",
      "Bone tumor",
    ],
  },
  {
    id: "11",
    title: "Psychiatric disorders",
    description:
      "Traditional / herbal medicine can treat or control the following Psychiatric disorders such as:",
    items: [
      "Depression",
      "Panic attack",
      "Obsessive -compulsive disorder",
      "Phobia",
      "Bipolar disorder",
      "aggresion",
      "Anxiety",
      "nightmare",
      "Hypertension",
    ],
  },
  {
    id: "12",
    title: "Female health and common diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Female health and common diseases such as:",
    items: [
      "Hypertension",
      "Diabetes",
      "High cholesterol",
      "Heart diseases",
      "Gastro -oesophageal reflux disease ( GERD)",
      "Urinary tract infection (UTI)",
      "uterine fibroid",
      "uterine prolapse",
      "Autoimmune diseases",
      "Skin diseases",
      "Depression",
      "Sinusitis",
      "Mental disorder",
      "PCOS",
      "thyroid",
      "Cysts",
      "Sexual and reproductive health",
      "Alzheimer's disease",
      "Menopause",
      "Obesity",
      "Anaemia",
      "Mensuration problems",
      "Infertility",
    ],
  },
  {
    id: "13",
    title: "Common diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Common diseases such as:",
    items: [
      "High cholesterol",
      "High blood pressure",
      "Diabetes",
      "Allergies",
      "Tonsillitis and throat infections",
      "Breathing problems",
      "Cold/ fever/ headache",
      "Migraine",
      "Hairfall",
      "Sinusitis",
      "Autoimmune diseases",
      "Insomnia",
      "Immune system deficiency",
      "Thyroid",
      "Gastric problems",
      "Uric acid",
      "Constipation",
      "Loose motion",
      "Urine infection",
      "Kidney stones",
      "Cancer",
      "Detoxifying toxics from the whole body",
      "Pneumonia",
      "Infertility",
    ],
  },
  {
    id: "14",
    title: "Opthalmic condition and diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Opthalmic condition and diseases such as:",
    items: [
      " microbial and viral infections 2. corneal ulcers",
      " glaucoma",
      " cataracts",
      " lowers IOP (intraocular pressure)",
      " Dry eye syndrome",
      " Nearsightedness (Myopia)",
      " Acute and chronic eye diseases",
      " Farsightedness (Hyperopia)",
      " Leukoma",
      "Trachoma",
    ],
  },
  {
    id: "15",
    title: "Infants and children care and common diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Infants and children care and common diseases such as:",
    items: [
      "Fever, cough and cold",
      "Asthma",
      "Diarrhoea and vomiting ",
      "Kawasaki disease",
      "skin rashes",
      "sore throat",
      "Tonsillitis",
      "Skin diseases ",
      "Neurological disorder diseases( down syndrome, autism).",
      "Infantile anorexia or food refusal.",
    ],
  },
  {
    id: "16",
    title: "Otology (Ear diseases)",
    description:
      "Traditional / herbal medicine can treat or control the following Otology (Ear diseases) such as:",
    items: [
      "Vertigo",
      "Ear inflammation",
      "Ear wax",
      "Tinnitus",
      "Glue ear",
      "Fluid from the ear",
      "Earache",
      "Hearing problems",
    ],
  },
  {
    id: "17",
    title: "Dental care and oral diseases",
    description:
      "Traditional / herbal medicine can treat or control the following Dental care and oral diseases such as:",
    items: ["Periodontal(Gum )disease", "Tooth decay", "Pain in tooth"],
  },
];
export default MOCK_TREATMENTS;
