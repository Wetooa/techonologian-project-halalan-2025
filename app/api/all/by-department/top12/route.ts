import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchFormsData();

    const courseMap = new Map();

    data.forEach((row) => {
      const course = row.course;
      courseMap.set(course, (courseMap.get(course) || 0) + 1);
    });

    const sortedCourses = Array.from(courseMap.entries()).sort((a, b) => b[1] - a[1]);

    const top12 = sortedCourses.splice(0,12);

    return NextResponse.json({ data: top12 });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
