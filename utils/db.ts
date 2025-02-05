import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export function courseToDepartment(course: string) {
  const COURSE_TO_DEP: Record<string, string> = {
    BSPSYCH: "CASE",
    STEM: "STEM",
    BMMA: "CASE",
    BSME: "COEA",
    BSHM: "CMB",
    BSIT: "CCS",
    BSBIO: "CASE",
    BSIE: "COEA",
    BSCE: "COEA",
    BSCPE: "COEA",
    BSCHE: "COEA",
    BSEE: "COEA",
    BSARCH: "COEA",
    BSED: "CASE",
    BSA: "CMB",
    BSEM: "CASE",
    BSMA: "CMB",
    BSCS: "CCS",
    BSN: "CNHS",
    BSBA: "CMB",
  };

  return COURSE_TO_DEP[course] || "Unknown";
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
