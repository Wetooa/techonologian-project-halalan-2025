import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchFormsData();

    const map = new Map();
    data.forEach((row) => {
      row.selection.forEach((selectedSenator: string) => {
        map.set(selectedSenator, (map.get(selectedSenator) || 0) + 1);
      });
    });

    const sortedResults = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    // Top 12
    const top12 = sortedResults.slice(0, 12);

    return NextResponse.json({ data: top12 });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
