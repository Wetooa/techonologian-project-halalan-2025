"use client";

import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  title: string;
  description: string;
  data: Array<{ senatorName: string; votes: number }>;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const calculateChartHeight = (dataLength: number) => {
  return Math.max(300, dataLength * 50); // Minimum height of 300px, or 50px per data point
};

export function BarChartHorizontal(props: ChartProps) {
  const chartData = props.data
    ? props.data.map(([senatorName, votes]) => ({
        senatorName,
        votes,
      }))
    : [];

  const totalVotes = chartData.reduce((sum, item) => sum + item.votes, 0);

  const [chartHeight, setChartHeight] = useState(
    calculateChartHeight(chartData.length)
  );

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(calculateChartHeight(chartData.length));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: `${chartHeight}px` }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
            width={undefined}
            height={undefined}
          >
            <XAxis type="number" dataKey="votes" hide />
            <YAxis
              dataKey="senatorName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
              tickFormatter={(value) =>
                window.innerWidth > 640 ? value : value.slice(0, 3)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="votes"
              fill="var(--color-desktop)"
              radius={5}
              barSize={20}
            >
              <LabelList
                dataKey="votes"
                position="right"
                formatter={(value) => {
                  const percentage = totalVotes
                    ? ((value / totalVotes) * 100).toFixed(1) + "%"
                    : "0%";
                  return `${value} (${percentage})`;
                }}
                style={{
                  fill: "black",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
