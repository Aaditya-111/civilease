export const SUPPORTED_LANGUAGES = [
  { label: "English", value: "English", speechCode: "en-US", speaker: "en-US-1", listenLabel: "Listen in English" },
  { label: "हिंदी (Hindi)", value: "Hindi", speechCode: "hi-IN", speaker: "hi-IN-1", listenLabel: "सुनें" },
  { label: "বাংলা (Bengali)", value: "Bengali", speechCode: "bn-IN", speaker: "bn-IN-1", listenLabel: "শুনুন" },
  { label: "తెలుగు (Telugu)", value: "Telugu", speechCode: "te-IN", speaker: "te-IN-1", listenLabel: "వినండి" },
  { label: "ಕನ್ನಡ (Kannada)", value: "Kannada", speechCode: "kn-IN", speaker: "kn-IN-1", listenLabel: "ಕೇಳಿ" },
  { label: "தமிழ் (Tamil)", value: "Tamil", speechCode: "ta-IN", speaker: "ta-IN-1", listenLabel: "கேளுங்கள்" },
];

export const GOV_PORTAL_LINKS = {
  // Central Government
  central: [
    { name: "India.gov.in — National Portal", url: "https://india.gov.in" },
    { name: "eCourts India", url: "https://ecourts.gov.in" },
    { name: "Passport Seva", url: "https://passportindia.gov.in" },
    { name: "Income Tax India", url: "https://incometax.gov.in" },
    { name: "National Food Security", url: "https://nfsa.gov.in" },
    { name: "EPFO — Provident Fund", url: "https://epfindia.gov.in" },
    { name: "DigiLocker", url: "https://digilocker.gov.in" },
    { name: "Aadhaar — UIDAI", url: "https://uidai.gov.in" },
    { name: "Voter ID — ECI", url: "https://eci.gov.in" },
    { name: "MCA — Company Affairs", url: "https://mca.gov.in" },
    { name: "NREGA Job Card", url: "https://nrega.nic.in" },
    { name: "PM Awas Yojana", url: "https://pmaymis.gov.in" },
    { name: "Ayushman Bharat", url: "https://pmjay.gov.in" },
    { name: "Civil Registration", url: "https://crsorgi.gov.in" },
    { name: "Land Records — DILRMP", url: "https://dolr.gov.in" },
  ],

  // States
  jharkhand: [
    { name: "Jharkhand e-District", url: "https://jharkhand.gov.in" },
    { name: "Jharsewa — Certificates", url: "https://jharsewa.jharkhand.gov.in" },
    { name: "Land Records — Jharkhand", url: "https://jharbhoomi.jharkhand.gov.in" },
    { name: "Jharkhand Property Tax", url: "https://npp.gov.in" },
  ],
  westbengal: [
    { name: "West Bengal e-District", url: "https://edistrict.wb.gov.in" },
    { name: "Banglar Bhumi — Land Records", url: "https://banglarbhumi.gov.in" },
    { name: "WB Property Tax", url: "https://www.kmcgov.in" },
    { name: "WB State Portal", url: "https://wb.gov.in" },
  ],
  maharashtra: [
    { name: "Maharashtra e-District", url: "https://aaplesarkar.mahaonline.gov.in" },
    { name: "Mahabhumi — Land Records", url: "https://mahabhumi.gov.in" },
    { name: "Maharashtra Property Tax", url: "https://mcmumbai.gov.in" },
    { name: "Maharashtra State Portal", url: "https://maharashtra.gov.in" },
  ],
  delhi: [
    { name: "Delhi e-District", url: "https://edistrict.delhigovt.nic.in" },
    { name: "Delhi Land Records", url: "https://dlrc.delhi.gov.in" },
    { name: "MCD Property Tax", url: "https://mcdonline.nic.in" },
    { name: "Delhi State Portal", url: "https://delhi.gov.in" },
  ],
  karnataka: [
    { name: "Karnataka Nadakacheri", url: "https://nadakacheri.karnataka.gov.in" },
    { name: "Bhoomi — Land Records", url: "https://bhoomi.karnataka.gov.in" },
    { name: "BBMP Property Tax", url: "https://bbmptax.karnataka.gov.in" },
    { name: "Karnataka State Portal", url: "https://karnataka.gov.in" },
  ],
  tamilnadu: [
    { name: "TN e-District", url: "https://tnedistrict.tn.gov.in" },
    { name: "Tamil Nadu Land Records", url: "https://eservices.tn.gov.in" },
    { name: "TN Property Tax", url: "https://chennaicorporation.gov.in" },
    { name: "Tamil Nadu State Portal", url: "https://tn.gov.in" },
  ],
  telangana: [
    { name: "Telangana MeeSeva", url: "https://meeseva.telangana.gov.in" },
    { name: "Dharani — Land Records", url: "https://dharani.telangana.gov.in" },
    { name: "GHMC Property Tax", url: "https://ptgis.ghmc.gov.in" },
    { name: "Telangana State Portal", url: "https://telangana.gov.in" },
  ],
  gujarat: [
    { name: "Gujarat e-District", url: "https://digitalgujarat.gov.in" },
    { name: "Gujarat Land Records", url: "https://anyror.gujarat.gov.in" },
    { name: "Gujarat State Portal", url: "https://gujarat.gov.in" },
  ],
  rajasthan: [
    { name: "Rajasthan SSO Portal", url: "https://sso.rajasthan.gov.in" },
    { name: "Apna Khata — Land Records", url: "https://apnakhata.raj.nic.in" },
    { name: "Rajasthan State Portal", url: "https://rajasthan.gov.in" },
  ],
  uttarpradesh: [
    { name: "UP e-District", url: "https://edistrict.up.gov.in" },
    { name: "UP Bhulekh — Land Records", url: "https://upbhulekh.gov.in" },
    { name: "UP State Portal", url: "https://up.gov.in" },
  ],
  madhyapradesh: [
    { name: "MP e-District", url: "https://mpedistrict.gov.in" },
    { name: "MP Bhulekh — Land Records", url: "https://mpbhulekh.gov.in" },
    { name: "MP State Portal", url: "https://mp.gov.in" },
  ],
  bihar: [
    { name: "Bihar e-District", url: "https://serviceonline.bihar.gov.in" },
    { name: "Bihar Land Records", url: "https://biharbhumi.bihar.gov.in" },
    { name: "Bihar State Portal", url: "https://bihar.gov.in" },
  ],
};
