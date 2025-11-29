
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Convert date strings to timestamps
// const data = [
//   { date: "2025-11-01", weight: 7.0, height: 100},
//   { date: "2025-11-03", weight: 7.2, height: 115},
//   { date: "2025-11-05", weight: 7.5, height: 103},
//   { date: "2025-11-07", weight: 6.8, height: 104},
//   { date: "2025-11-09", weight: 7.1, height: 95},
//   { date: "2025-11-11", weight: 6.5, height: 106},
// ].map((item) => ({
//   ...item,
//   timestamp: new Date(item.date).getTime(),
// }));

const WeightLineChart = (props) => {
  const { weightChart } = props;
  const data = weightChart.map((item) => ({
  ...item,
  timestamp: new Date(item.date).getTime(),
}));

  return (
    <div style={{ width: "100%", height: 240 }}>
      <h3 style={{ textAlign: "center", fontSize: "14px" }}>Weight (kg) and Height (cm) Progress </h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Use numeric axis and format date */}
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={(tick) => new Date(tick).toLocaleDateString("en-GB")}tick={{
              angle: -90,        // vertical rotation
              textAnchor: "end", // proper alignment
              dy: 10,            // adjust gap
              dx: -5,
            }}
            height={90}           // give more space for rotated labels
          />

          <YAxis
            label={{ value: "Weight (kg)", angle: -90, position: "insideLeft", style: { fill: "#007bff" },
            dy: 40,  // move label UP
            dx: 0,  // move label LEFT  
          }}
          />

          {/* RIGHT Y-AXIS (Height cm) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Height (cm)",
              angle: 90,
              position: "insideRight",
              style: { fill: "#ff2828" },
              dy: 40,  // move label UP
              dx: 0,  // move label LEFT 
            }}
          />

          <Tooltip
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("en-GB")
            }
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#007bff"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          {/* Height Line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="height"
            stroke="#ff0000"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightLineChart;