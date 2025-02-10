import { fetchFormsData } from "@/db/db";
import { groupByField } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    senatorNumber: string;
  }>;
};

export async function GET(req: NextRequest, props: Props) {
  try {
    const params = await props.params;
    const senatorNumber = params.senatorNumber;
    const { data } = await fetchFormsData();

    const filteredResult = data.filter((row) => {
      return row.selection.some((selectedSenator: string) => {
        return !!selectedSenator.match(`^${senatorNumber}\\.`);
      });
    });

    const result = groupByField(filteredResult, "department");

    return NextResponse.json({ data: result, senatorNumber });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
