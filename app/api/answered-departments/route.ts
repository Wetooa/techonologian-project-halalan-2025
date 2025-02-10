import { fetchFormsData } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchFormsData();
    const result = new Set(data.map((item) => item.department));
    const arrayResult = Array.from(result);

    return NextResponse.json({ data: arrayResult });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
