import { fetchFormsData } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { senatorNumber: string } }
) {
  try {
    // console.log("Params: ", params);
    const senatorNumber = params.senatorNumber;
    // console.log("Senate num: ", senatorNumber);
    const { data } = await fetchFormsData();

    // Log the raw data
    // console.log("Raw Data:", JSON.stringify(data, null, 2));

    // Filter the data
    const filteredResult = data.filter((row) => {
      return row.selection.some((selectedSenator: string) => {
        return !!selectedSenator.match(`^${senatorNumber}\\.`);
      });
    });

    // Log the filtered result
    // console.log("Filtered Result:", JSON.stringify(filteredResult, null, 2));

    return NextResponse.json({ data: filteredResult, senatorNumber });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
