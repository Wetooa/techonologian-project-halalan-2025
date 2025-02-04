import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchFormsData();

    const map = new Map();
    data.forEach((row) => {
      // console.log("Row:", row);
      row.selection.forEach((selectedSenator: string) => {
        map.set(selectedSenator, (map.get(selectedSenator) || 0) + 1);
      });
    });

    const result = Array.from(map.entries());
    // console.log("Processed result:", result);
    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
