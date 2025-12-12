import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MetricChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const response = {
      months: [36, 40, 44, 48, 52, 56, 60],
      metrics: [
        {
          name: "Weight",
          data: [12.5, 13.2, 13.8, 14.8, 15.4, 16.0, 16.7],
          color: "#ff4b91",
        },
        {
          name: "Height",
          data: [95, 97, 99, 101, 103, 105, 107],
          color: "#4285f4",
        },
        {
          name: "BMI",
          data: [23.1, 23.5, 23.8, 24.0, 21.2, 33.5, 33.7],
          color: "#34a853",
        },
        {
          name: "Mid Arm",
          data: [14.1, 14.5, 14.8, 15.0, 15.2, 15.5, 15.7],
          color: "#a83834",
        },
      ],
    };

    // Convert to Recharts-friendly structure
    const mergedData = response.months.map((month, index) => {
      let row = { month };

      response.metrics.forEach((metric) => {
        row[metric.name] = metric.data[index];
      });

      return row;
    });

    setChartData(mergedData);
  }, []);

  const metrics = [
    { name: "Weight", color: "#ff4b91" },
    { name: "Height", color: "#4285f4" },
    { name: "BMI", color: "#34a853" },
    { name: "Mid Arm", color: "#a83834" },
  ];

  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -2 }} />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Dynamic Lines */}
        {metrics.map((metric) => (
          <Line
            key={metric.name}
            type="monotone"
            dataKey={metric.name}
            stroke={metric.color}
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
