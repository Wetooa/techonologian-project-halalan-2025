import { fetchFormsData } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { department: string } },
) {
  try {
    const department = params.department;
    const { data } = await fetchFormsData();

    const filteredDataByCourse = data.filter((row) => {
      return !!row.course.match(`${department}`);
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
