import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchFormsData();
    return NextResponse.json({ data: data });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
