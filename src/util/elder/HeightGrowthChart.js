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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  // 👇 full custom object
  const row = payload[0].payload;
  return (
    <div
      className="recharts-default-tooltip"
      role="status"
      aria-live="assertive"
      style={{
        margin: 0,
        padding: "10px",
        backgroundColor: "#ffffff",
        border: "1px solid #cccccc",
        whiteSpace: "nowrap"
      }}
    >
      <ul
        className="recharts-tooltip-item-list"
        style={{ padding: 0, margin: 0 }}
      >
        <li className="recharts-tooltip-item" style={{display: "block", paddingTop: "4px", paddingBottom: "4px", color: "rgb(240, 72, 127)" }}>
          <span className="recharts-tooltip-item-name">
            Age
          </span>
          <span className="recharts-tooltip-item-separator">
            {" : "}
          </span>
          <span className="recharts-tooltip-item-value">
            {row.month} Months
          </span>
        </li>
        <li className="recharts-tooltip-item" style={{display: "block", paddingTop: "4px", paddingBottom: "4px", color: "rgb(240, 72, 127)" }}>
          <span className="recharts-tooltip-item-name">
            Elder Height
          </span>
          <span className="recharts-tooltip-item-separator">
            {" : "}
          </span>
          <span className="recharts-tooltip-item-value">
            {row.height} cm
          </span>
        </li>
        {
          (row.min && row.max) && (
            <li className="recharts-tooltip-item" style={{display: "block", paddingTop: "4px", paddingBottom: "4px", color: "rgb(240, 72, 127)" }}>
              <span className="recharts-tooltip-item-name">
                WHO Range
              </span>
              <span className="recharts-tooltip-item-separator">
                {" : "}
              </span>
              <span className="recharts-tooltip-item-value">
                {row.min} - {row.max}
              </span>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default function HeightGrowthChart({ data }) {
  // Convert consolidated data to chart-friendly format
  const chartData = data.map(item => ({
    month: item.month,
    min: item.who.min,
    max: item.who.max,
    height: item.elder.height
  }));

  return (
    <div style={{ width: "100%", height: 420 }}>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            label={{ value: "MONTHS", position: "bottom", offset: 10 }}
          />

          <YAxis
            label={{ value: "HEIGHT (cm)", angle: -90, position: "insideLeft" }}
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

          {/* Elder Height */}
          <Line
            dataKey="height"
            stroke="#f0487f"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="Elder Height"
          />

          {/* Reference lines (optional) */}
          <ReferenceLine x={48} stroke="#999" strokeDasharray="4 4" />

          <Tooltip formatter={(v) => `${v} cm`}  content={<CustomTooltip/>}/>
          <Legend verticalAlign="bottom" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
