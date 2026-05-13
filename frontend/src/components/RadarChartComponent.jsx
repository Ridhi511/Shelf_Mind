import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function RadarChartComponent({
  data,
}) {
  return (
    <div className="w-full h-[420px]">

      <ResponsiveContainer>

        <RadarChart data={data}>

          <PolarGrid stroke="#27272a" />

          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "#a1a1aa",
              fontSize: 14,
            }}
          />

          <Radar
            name="Score"
            dataKey="score"
            stroke="#ffffff"
            fill="#ffffff"
            fillOpacity={0.15}
          />

        </RadarChart>

      </ResponsiveContainer>
    </div>
  );
}