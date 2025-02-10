import { groupBySenator } from "@/lib/utils";
import { fetchFormsData } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    department: string;
  }>;
};

export async function GET(req: NextRequest, props: Props) {
  try {
    const params = await props.params;
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
