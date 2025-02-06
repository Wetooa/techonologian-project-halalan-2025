"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartWithLabelsProps {
  data: Array<[string, number]>;
}

export function PieChartWithLabels({ data }: PieChartWithLabelsProps) {
  const chartData = data.map(([name, visitors], index) => ({
    Department: name,
    visitors: visitors,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  // Generate dynamic chartConfig
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    ...Object.fromEntries(
      data.map(([name], index) => [
        name,
        {
          label: name,
          color: `hsl(var(--chart-${index + 1}))`,
        },
      ])
    ),
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>All Departments</CardTitle>
        <CardDescription>
          Shows data related to all departments collectively.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              label
              nameKey="Department"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
