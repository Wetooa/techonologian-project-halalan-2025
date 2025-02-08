import { groupBySenator } from "@/lib/utils";
import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchAllBySenator();
    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function fetchAllBySenator() {
  const { data } = await fetchFormsData();

  const result = groupBySenator(data);

  return result;
}
