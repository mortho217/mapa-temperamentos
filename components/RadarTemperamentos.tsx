"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  SG: number;
  CL: number;
  FL: number;
  ML: number;
};

export default function RadarTemperamentos({ SG, CL, FL, ML }: Props) {
  const data = [
    { subject: "Sanguíneo", value: SG, fullMark: 100 },
    { subject: "Colérico", value: CL, fullMark: 100 },
    { subject: "Flemático", value: FL, fullMark: 100 },
    { subject: "Melancólico", value: ML, fullMark: 100 },
  ];

  return (
    <div className="w-full max-w-lg h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Temperamentos"
            dataKey="value"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}