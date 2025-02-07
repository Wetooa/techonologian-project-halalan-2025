import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export function courseToDepartment(course: string) {
  const COURSE_TO_DEP: Record<string, string> = {
    BSARCH: "COEA",
    BSCHE: "COEA",
    BSCE: "COEA",
    BSCPE: "COEA",
    BSEE: "COEA",
    BSECE: "COEA",
    BSIE: "COEA",
    "BSME-CS": "COEA",
    "BSME-MECH": "COEA",
    BSMinE: "COEA",

    "MEng-CHE": "COEA",
    "MEng-CE": "COEA",
    "MEng-IE": "COEA",
    "MEng-ME": "COEA",
    "MEngEd-CHE": "COEA",
    "MEngEd-CE": "COEA",
    "MEngEd-CPE": "COEA",
    "MEngEd-EE": "COEA",
    "MEngEd-ECE": "COEA",
    "MEngEd-IE": "COEA",
    "MEngEd-ME": "COEA",

    BSA: "CMBA",
    BSAIS: "CMBA",
    BSMA: "CMBA",
    "BSBA-BFM": "CMBA",
    "BSBA-BA": "CMBA",
    "BSBA-GBM": "CMBA",
    "BSBA-HRM": "CMBA",
    "BSBA-MKM": "CMBA",
    "BSBA-OM": "CMBA",
    "BSBA-QM": "CMBA",
    BSHM: "CMBA",
    BSTM: "CMBA",
    BSOA: "CMBA",
    AOA: "CMBA",
    BPA: "CMBA",

    "MBA-TH": "CMBA",
    "MBA-NT": "CMBA",
    "MPA-TH": "CMBA",
    "MPA-NT": "CMBA",
    "PhD-MGMT": "CMBA",
    DBA: "CMBA",
    DPA: "CMBA",

    "AB-COMM": "CASE",
    "AB-ENG": "CASE",
    BEEd: "CASE",
    "BSEd-ENG": "CASE",
    "BSEd-FIL": "CASE",
    "BSEd-MATH": "CASE",
    "BSEd-SCI": "CASE",
    BMMA: "CASE",
    BSBIO: "CASE",
    "BSMA-AIM": "CASE",
    BSPSYCH: "CASE",

    "MAEd-ELT": "CASE",
    "MAEd-FIL": "CASE",
    "MAEd-MATH": "CASE",
    "MAEd-SCI": "CASE",
    "MA-PSYCH": "CASE",
    "MA-PSYCH-SP": "CASE",
    "MA-PSYCH-CP": "CASE",
    "MA-PSYCH-IP": "CASE",
    "MST-MATH": "CASE",

    BSN: "CNAHS",
    BSPHARM: "CNAHS",
    MSN: "CNAHS",

    BSCS: "CCS",
    BSIT: "CCS",

    MCS: "CCS",
    MSCS: "CASE",
    MIT: "CASE",
    DipComp: "CASE",
    DIT: "CASE",

    BSC: "CCJ",

    STEM: "SHS",
  };

  return COURSE_TO_DEP[course] || "OTHERS";
}

export interface FormData {
  timestamp: string;
  name: string;
  email: string;
  studentId: string;
  course: string;
  department: string;
  isRegisteredVoter: string;
  selection: string[];
}

export async function fetchFormsData() {
  const URL = process.env.SHEET_ID;

  if (URL === undefined) {
    throw new Error("URL is not defined");
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(URL, serviceAccountAuth);
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const SHEET_TITLES = {
    timestamp: "Column 1",
    name: "Name",
    email: "Institutional Email",
    studentId: "Student ID:",
    course: "Course:",
    isRegisteredVoter: "Are you a registered voter?",
    selection:
      "Please take a moment to thoughtfully select the candidates you genuinely support for the upcoming election:",
  };

  const cleanedData = rows.map((row) => {
    const cleanedRow: FormData = {
      timestamp: row.get(SHEET_TITLES.timestamp),
      name: row.get(SHEET_TITLES.name),
      email: row.get(SHEET_TITLES.email),
      studentId: row.get(SHEET_TITLES.studentId),
      course: row.get(SHEET_TITLES.course),
      isRegisteredVoter: row.get(SHEET_TITLES.isRegisteredVoter),
      selection: Array.from(
        row.get(SHEET_TITLES.selection).split(/\,?\s(?=\d+\.)/),
      ),
      department: courseToDepartment(row.get(SHEET_TITLES.course)),
    };

    return cleanedRow;
  }) as FormData[];

  return { data: cleanedData, message: "Fetch Successful" };
}
