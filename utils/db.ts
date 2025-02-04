import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export function courseToDepartment(course: string) {
  return {
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
  }[course];
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

  const SHEET_TITLES: { [key: string]: string } = {
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
    const cleanedRow: { [key: string]: string | string[] } = {};

    Object.keys(SHEET_TITLES).forEach((key) => {
      cleanedRow[key] = row.get(SHEET_TITLES[key]);
    });

    cleanedRow.department = courseToDepartment(
      cleanedRow.course as string,
    ) as string;

    cleanedRow.selection = Array.from(
      (cleanedRow.selection as string).split(/\,?\s(?=\d+\.)/),
    ) as string[];

    return cleanedRow;
  });

  return { data: cleanedData, message: "Fetch Successful" };
}
