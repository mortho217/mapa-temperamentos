"use client";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

export default function ResultadosPage({ searchParams }: { searchParams: Record<string, string> }) {
  const SG = Number(searchParams.SG) || 0;
  const CL = Number(searchParams.CL) || 0;
  const FL = Number(searchParams.FL) || 0;
  const ML = Number(searchParams.ML) || 0;

  const data = [
    { subject: "Sanguíneo", A: SG, fullMark: 100 },
    { subject: "Colérico", A: CL, fullMark: 100 },
    { subject: "Flemático", A: FL, fullMark: 100 },
    { subject: "Melancólico", A: ML, fullMark: 100 },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Resultados de tu test</h1>
      <div className="w-full max-w-lg h-96">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Temperamentos" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}