import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { courseToDepartment, FormData } from "@/utils/utils";

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
  await doc.loadInfo();

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
