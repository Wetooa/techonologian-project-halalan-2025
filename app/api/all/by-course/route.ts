import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await fetchFormsData();

    const courseMap = new Map();

    //UNCLEANED PA ANG DATA 
    
    data.forEach((row) => {
      const course = row.course;
      courseMap.set(course, (courseMap.get(course) || 0) + 1);
    });

    const result = Array.from(courseMap.entries());

    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
