import { fetchFormsData } from "@/utils/db";
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
  const departmentMap = new Map();

  data.forEach((row) => {
    const department = row.department;
    departmentMap.set(department, (departmentMap.get(department) || 0) + 1);
  });

  const sortedDepartments = Array.from(departmentMap.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  return sortedDepartments;
}
