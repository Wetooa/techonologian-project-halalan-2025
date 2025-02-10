import { groupBySenator } from "@/lib/utils";
import { fetchFormsData } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { department: string } },
) {
  try {
    const department = params.department;
    const { data } = await fetchFormsData();

    const filteredDataByDepartment = data.filter((row) => {
      return !!row.department.match(`${department}`);
    });

    const result = groupBySenator(filteredDataByDepartment);

    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
