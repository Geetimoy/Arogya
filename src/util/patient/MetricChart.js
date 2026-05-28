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

export default function MetricChart(props) {
  /*const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const response = {
      months: props.labels || ["0", "1", "2", "3", "4", "5", "6"],
      metrics: props.metrics || [
        { name: "Weight", data: [] },
        { name: "Height", data: [] },
        { name: "BMI", data: [] },
        { name: "Mid Arm", data: [] },
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
  }, []);*/


  var response = {
    months: props.labels || ["0", "1", "2", "3", "4", "5", "6"],
    metrics: props.metrics || [
      { name: "Weight", data: [] },
      { name: "Height", data: [] },
      { name: "BMI", data: [] },
      { name: "Mid Arm", data: [] },
    ],
  };

  // Convert to Recharts-friendly structure
  var chartData = response.months.map((month, index) => {
    let row = { month };

    response.metrics.forEach((metric) => {
      row[metric.name] = metric.data[index];
    });

    return row;
  });



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
