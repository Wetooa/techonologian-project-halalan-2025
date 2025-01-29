import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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

  const cleanedData = rows.map((row) => {
    return {
      timestamp: row.get("Column 1"),
      name: row.get("Name"),
      email: row.get("Institutional Email"),
      studentId: row.get("Student ID"),
      course: row.get("Course"),
      isRegisteredVoter: row.get("Are you a registered voter?"),
      selection: row.get(
        "Please take a moment to thoughtfully select the candidates you genuinely support for the upcoming election: ",
      ),
    };
  });

  return { data: cleanedData, message: "Fetch Successful" };
}
