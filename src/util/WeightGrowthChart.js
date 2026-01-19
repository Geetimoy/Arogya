import React from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function WeightGrowthChart({ data }) {
  // Convert consolidated data to chart-friendly format
  const chartData = data.map(item => ({
    month: item.month,
    min: item.who.min,
    max: item.who.max,
    weight: item.child.weight
  }));

  return (
    <div style={{ width: "100%", height: 500 }}>
      <h2>WEIGHT (kg)</h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            label={{ value: "MONTHS", position: "bottom", offset: 10 }}
          />

          <YAxis
            label={{ value: "WEIGHT (kg)", angle: -90, position: "insideLeft" }}
          />

          {/* WHO Ideal Range */}
          <Area
            dataKey="max"
            fill="#e6e6e6"
            stroke="none"
            name="WHO Range"
          />
          <Area
            dataKey="min"
            fill="#ffffff"
            stroke="none"
          />

          {/* Child Weight */}
          <Line
            dataKey="weight"
            stroke="#f0487f"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="Your Entries"
          />

          {/* Reference lines (optional) */}
          <ReferenceLine x={48} stroke="#999" strokeDasharray="4 4" />

          <Tooltip formatter={(v) => `${v} cm`} />
          <Legend verticalAlign="bottom" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
