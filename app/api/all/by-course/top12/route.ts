import { NextResponse } from "next/server";
import { fetchAllByCourse } from "../route";

export async function GET() {
  try {
    const sortedCourses = await fetchAllByCourse();
    const top12 = sortedCourses.splice(0, 12);

    return NextResponse.json({ data: top12 });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
