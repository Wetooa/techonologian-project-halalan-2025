import { NextResponse } from "next/server";
import { fetchAllByDepartment } from "../route";

export async function GET() {
  try {
    const sortedDepartments = await fetchAllByDepartment();
    const top12 = sortedDepartments.splice(0, 12);

    return NextResponse.json({ data: top12 });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
