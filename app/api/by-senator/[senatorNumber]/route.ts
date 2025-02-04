import { fetchFormsData } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { senatorNumber: string } },
) {
  try {
    const senatorNumber = params.senatorNumber;
    const { data } = await fetchFormsData();

    const filteredResult = data.filter((row) => {
      return row.selection.some((selectedSenator: string) => {
        return !!selectedSenator.match(`^${senatorNumber}\\.`);
      });
    });

    return NextResponse.json({ data: filteredResult, params });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
