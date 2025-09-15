'use client';
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';

type AxisKey = 'SG' | 'CL' | 'FL' | 'ML';
type Scores = Record<AxisKey, number>;

const COLORS: Record<AxisKey, string> = {
  SG: '#FF8A00',
  CL: '#E63946',
  FL: '#2A9D8F',
  ML: '#264653',
};

const LABELS: Record<AxisKey, string> = {
  SG: 'Sanguíneo',
  CL: 'Colérico',
  FL: 'Flemático',
  ML: 'Melancólico',
};

function getDominantAndSecondary(scores: Scores) {
  const entries = (Object.entries(scores) as [AxisKey, number][])
    .sort((a, b) => b[1] - a[1]);
  const [first, second] = entries;
  const dominant = first && first[1] >= 30 ? first : null;
  const secondary =
    second && second[1] >= 25 && first[1] - second[1] < 10 ? second : null;
  return { entries, dominant, secondary };
}

function getClarityIndex(entries: [AxisKey, number][]) {
  const [first, second] = entries;
  const diff = Math.abs(first[1] - (second?.[1] ?? 0));
  let ic: 'Alto' | 'Medio' | 'Bajo' = 'Bajo';
  if (diff >= 12) ic = 'Alto';
  else if (diff >= 7) ic = 'Medio';
  return { ic, diff };
}

const Badge: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderRadius: 999,
      padding: '6px 12px',
      backgroundColor: `${color}20`,
      color,
    }}
  >
    <span style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: color }} />
    {children}
  </span>
);

export default function MapaResultados({ scores = { SG: 45, CL: 32, FL: 18, ML: 28 } }: { scores?: Scores }) {
  const { entries, dominant, secondary } = getDominantAndSecondary(scores);
  const { ic, diff } = getClarityIndex(entries);

  const radarData = (Object.keys(scores) as AxisKey[]).map(k => ({
    eje: LABELS[k],
    key: k,
    valor: scores[k],
  }));

  const barsData = (Object.keys(scores) as AxisKey[]).map(k => ({
    key: k,
    nombre: LABELS[k],
    valor: scores[k],
  }));

  const dominanteStr = dominant ? `${LABELS[dominant[0]]} (${dominant[1]}%)` : '—';
  const secundarioStr = secondary ? `${LABELS[secondary[0]]} (${secondary[1]}%)` : '—';

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      {/* Resumen */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Badge color={dominant ? COLORS[dominant[0]] : '#64748B'}>Dominante: {dominanteStr}</Badge>
          <Badge color={secondary ? COLORS[secondary[0]] : '#94A3B8'}>Secundario: {secundarioStr}</Badge>
          <Badge color="#0EA5E9">Claridad: {ic} ({diff} pts)</Badge>
        </div>
      </div>

      {/* Radar */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>Mapa porcentual (radar)</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
              <PolarGrid />
              <PolarAngleAxis dataKey="eje" tick={{ fill: '#475569', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#94A3B8', fontSize: 10 }} angle={90} domain={[0, 100]} />
              {(Object.keys(scores) as AxisKey[]).map((k) => (
                <Radar
                  key={k}
                  name={LABELS[k]}
                  dataKey={(d: any) => (d.key === k ? d.valor : 0)}
                  stroke={COLORS[k]}
                  fill={COLORS[k]}
                  fillOpacity={0.18}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Barras */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
        <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>Intensidad por eje (barras)</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barsData} layout="vertical" margin={{ left: 24, right: 16, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94A3B8' }} />
              <YAxis dataKey="nombre" type="category" width={120} tick={{ fill: '#475569' }} />
              <Tooltip formatter={(v: any, n: any) => [`${v}%`, n]} />
              <Bar dataKey="valor" radius={[6, 6, 6, 6]}>
                {barsData.map((entry, idx) => {
                  const k = entry.key as AxisKey;
                  const isDominant = !!(dominant && dominant[0] === k);
                  const isSecondary = !!(secondary && secondary[0] === k);
                  const base = COLORS[k];
                  const color = isDominant ? base : isSecondary ? `${base}CC` : `${base}88`;
                  return <Cell key={`cell-${idx}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Aviso ético */}
      <p style={{ fontSize: 12, color: '#64748b', marginTop: 16 }}>
        Este contenido es formativo, no clínico. Si atraviesas malestar significativo, busca apoyo profesional.
      </p>
    </div>
  );
}