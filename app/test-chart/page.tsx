"use client";

import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const data = [
  { subject: "Sanguíneo", value: 40, fullMark: 100 },
  { subject: "Colérico", value: 30, fullMark: 100 },
  { subject: "Flemático", value: 20, fullMark: 100 },
  { subject: "Melancólico", value: 10, fullMark: 100 },
];

export default function TestChartPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[500px] h-[500px] border border-gray-300 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Temperamentos" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}