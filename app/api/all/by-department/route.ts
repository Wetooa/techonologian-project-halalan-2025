import { fetchFormsData } from "@/db/db";
import { groupByField } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchAllByDepartment();

    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function fetchAllByDepartment() {
  const { data } = await fetchFormsData();

  const entries = groupByField(data, "department");

  const sortedDepartments = Array.from(entries).sort((a, b) => b[1] - a[1]);

  return sortedDepartments;
}
