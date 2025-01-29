import { fetchFormsData } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { course: string } },
) {
  try {
    const course = params.course;
    const { data } = await fetchFormsData();

    // FIX: BASIC IMPLEMENTATION! DATA NOT CLEANED YET!
    const filteredDataByCourse = data.filter((row) => {
      return !!row.course.match(`${course}`);
    });

    const map = new Map();
    filteredDataByCourse.forEach((row) => {
      row.selection.forEach((selectedSenator: string) => {
        map.set(selectedSenator, (map.get(selectedSenator) || 0) + 1);
      });
    });

    const result = Array.from(map.entries());
    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
