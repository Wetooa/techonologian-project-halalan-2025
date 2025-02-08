import { groupByField } from "@/lib/utils";
import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchAllByCourse();
    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function fetchAllByCourse() {
  const { data } = await fetchFormsData();

  const entries = groupByField(data, "course");

  const sortedCourses = Array.from(entries).sort((a, b) => b[1] - a[1]);

  return sortedCourses;
}
