import { fetchFormsData } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    const { params } = context;
    const data = await fetchFormsData();

    console.log(params);

    return NextResponse.json({ data, params });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
