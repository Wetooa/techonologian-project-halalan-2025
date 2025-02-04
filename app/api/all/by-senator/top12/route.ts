import { NextResponse } from "next/server";
import { fetchAllBySenator } from "../route";

export async function GET() {
  try {
    const sortedResults = await fetchAllBySenator();
    const top12 = sortedResults.slice(0, 12);

    return NextResponse.json({ data: top12 });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
