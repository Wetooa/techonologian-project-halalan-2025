import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchAllBySenator();
    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function fetchAllBySenator() {
  const { data } = await fetchFormsData();
  const map = new Map();

  data.forEach((row) => {
    row.selection.forEach((selectedSenator: string) => {
      map.set(selectedSenator, (map.get(selectedSenator) || 0) + 1);
    });
  });

  const result = Array.from(map.entries());
  return result;
}
