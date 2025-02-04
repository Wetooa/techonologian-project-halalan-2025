"use client";

import { Bar, BarChart, XAxis, YAxis, LabelList, ResponsiveContainer } from "recharts";
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
    return Math.max(300, dataLength * 40); // Reduced from 50px to 40px per item
};

export function BarChartHorizontal(props: ChartProps) {
    const chartData = props.data
        ? props.data.map(([senatorName, votes] ) => ({
            senatorName,
            votes,
        }))
        : [];

    chartData.sort((a, b) => b.votes - a.votes); // Sort by votes

    const totalVotes = chartData.reduce((sum, item) => sum + item.votes, 0);
    const chartHeight = calculateChartHeight(chartData.length);

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="max-h-[600px] overflow-y-auto"> {/* Scrollable container */}
                    <ChartContainer
                        config={chartConfig}
                        className="w-full"
                        style={{ height: `${chartHeight}px` }}
                    >
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <XAxis type="number" dataKey="votes" hide />
                                <YAxis
                                    dataKey="senatorName"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    width={150}
                                    // tickFormatter={(value) =>
                                    //     window.innerWidth > 640 ? value : value.slice(0, 3)
                                    // }
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="votes"
                                    fill="var(--color-desktop)"
                                    radius={5}
                                    barSize={30}
                                >
                                    <LabelList
                                        dataKey="votes"
                                        position="right"
                                        formatter={(value : never) => {
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
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}