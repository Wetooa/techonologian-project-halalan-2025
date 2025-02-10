import { fetchAllByDepartment } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchAllByDepartment();

    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
