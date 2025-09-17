"use client";

import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import { FiCopy, FiCheck, FiBarChart2, FiHome } from "react-icons/fi";
import Link from "next/link";

type Temperamento = "SG" | "CL" | "FL" | "ML";

export default function ResultadosPage({ searchParams }: { searchParams: Record<string, string> }) {
  // Valores de la URL
  const SG = Number(searchParams?.SG ?? "0");
  const CL = Number(searchParams?.CL ?? "0");
  const FL = Number(searchParams?.FL ?? "0");
  const ML = Number(searchParams?.ML ?? "0");

  const [copiado, setCopiado] = useState(false);

  // Dataset
  const data = [
    { subject: "Sanguíneo", A: SG, fullMark: 100 },
    { subject: "Colérico", A: CL, fullMark: 100 },
    { subject: "Flemático", A: FL, fullMark: 100 },
    { subject: "Melancólico", A: ML, fullMark: 100 },
  ];

  // Detectar dominante/secundario/mixto
  const valores: Record<Temperamento, number> = { SG, CL, FL, ML };
  const ordenados = Object.entries(valores).sort((a, b) => b[1] - a[1]);
  const top1 = ordenados[0] as [Temperamento, number];
  const top2 = ordenados[1] as [Temperamento, number];

  let dominante: Temperamento | null = top1[0];
  let secundario: Temperamento | null = null;
  let mixto: [Temperamento, Temperamento] | null = null;

  if (top1[1] === top2[1]) {
    mixto = [top1[0], top2[0]];
    dominante = null;
  } else if (top2[1] >= 25 && top1[1] - top2[1] <= 10) {
    secundario = top2[0];
  }

  // Índice de claridad
  let indiceClaridad: "Alto" | "Medio" | "Bajo";
  const diferencia = top1[1] - top2[1];
  if (diferencia >= 12) indiceClaridad = "Alto";
  else if (diferencia >= 7) indiceClaridad = "Medio";
  else indiceClaridad = "Bajo";

  // Mini-tarjetas
  const tarjetas: Record<Temperamento, { icon: string; color: string; titulo: string; acciones: string[] }> = {
    SG: { icon: "🎆", color: "#FF8A00", titulo: "SANGUÍNEO", acciones: ["Prioriza 2 tareas clave", "Usa un Pomodoro de 25 min", "Cierra un pendiente hoy"] },
    CL: { icon: "⚡", color: "#E63946", titulo: "COLÉRICO", acciones: ["Pregunta expectativas antes de actuar", "Haz una pausa de 90 s", "Delegar al menos 1 tarea"] },
    FL: { icon: "🌊", color: "#2A9D8F", titulo: "FLEMÁTICO", acciones: ["Bloque de 25' sin interrupciones", "Practica una frase asertiva", "Revisa 3 prioridades"] },
    ML: { icon: "💡", color: "#264653", titulo: "MELANCÓLICO", acciones: ["Aplica la regla 80/20", "Pon límite a revisiones", "Comparte un borrador temprano"] },
  };

  // URL pública
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}/resultados?SG=${SG}&CL=${CL}&FL=${FL}&ML=${ML}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  // URLs sociales
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Mira mis resultados del test de temperamentos 👉 ${shareUrl}`
  )}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Mira mis resultados del test de temperamentos 👉 ${shareUrl}`
  )}`;

  // Estilo tarjetas sociales
  const cardStyle =
    "flex flex-col items-center justify-center w-32 h-28 rounded-2xl shadow-lg text-white font-semibold transition transform hover:scale-105 hover:shadow-2xl";

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 bg-gray-50 p-6">
      {/* 🎯 Encabezado llamativo */}
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
          🎯 Mapa de tus Temperamentos
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Descubre tu perfil y compártelo con el mundo
        </p>
      </header>

      <p className="text-gray-700">Índice de claridad: <b>{indiceClaridad}</b></p>

      {/* Radar */}
      <h2 className="text-lg font-semibold mt-6">📊 Distribución de tus temperamentos (%)</h2>
      <div className="border border-gray-300 bg-white p-4 rounded-lg shadow flex items-center justify-center" style={{ width: 500, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Temperamentos" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.5} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Barras */}
      <h2 className="text-lg font-semibold mt-6">📊 Comparación visual entre los cuatro tipos</h2>
      <div className="border border-gray-300 bg-white p-4 rounded-lg shadow flex items-center justify-center" style={{ width: 500, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="A" fill="#ff8a00" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mini-tarjeta */}
      {mixto ? (
        <div
          className="p-6 rounded-xl shadow text-white text-center max-w-md"
          style={{
            background: `linear-gradient(90deg, ${tarjetas[mixto[0]].color} 50%, ${tarjetas[mixto[1]].color} 50%)`,
          }}
        >
          <h2 className="text-xl font-bold mb-2">
            {tarjetas[mixto[0]].icon} {tarjetas[mixto[0]].titulo} – {tarjetas[mixto[1]].icon} {tarjetas[mixto[1]].titulo} (Mixto)
          </h2>
          <p className="mb-3">Pon en práctica hoy mismo:</p>
          <ul className="list-disc list-inside space-y-1 text-left">
            {[...tarjetas[mixto[0]].acciones.slice(0, 2), ...tarjetas[mixto[1]].acciones.slice(0, 2)].map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {dominante && (
            <div className="p-6 rounded-xl shadow text-white text-center max-w-md" style={{ backgroundColor: tarjetas[dominante].color }}>
              <h2 className="text-xl font-bold mb-2">
                {tarjetas[dominante].icon} {tarjetas[dominante].titulo} (Dominante)
              </h2>
              <p className="mb-3">Pon en práctica hoy mismo:</p>
              <ul className="list-disc list-inside space-y-1 text-left">
                {tarjetas[dominante].acciones.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {secundario && (
            <div className="p-6 rounded-xl shadow text-white text-center max-w-md" style={{ backgroundColor: tarjetas[secundario].color }}>
              <h2 className="text-xl font-bold mb-2">
                {tarjetas[secundario].icon} {tarjetas[secundario].titulo} (Secundario)
              </h2>
              <p className="mb-3">Pon en práctica hoy mismo:</p>
              <ul className="list-disc list-inside space-y-1 text-left">
                {tarjetas[secundario].acciones.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tarjetas sociales */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-lg font-semibold text-center mb-4">🔗 Comparte tus resultados</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
          <a href={shareUrl} target="_blank" rel="noopener noreferrer" className={`${cardStyle} bg-blue-600 hover:bg-blue-700`}>
            <FiBarChart2 size={28} />
            <span className="mt-2 text-sm">Abrir mi resultado</span>
          </a>

          <button onClick={handleCopy} className={`${cardStyle} bg-gray-700 hover:bg-gray-800`}>
            {copiado ? <FiCheck size={28} /> : <FiCopy size={28} />}
            <span className="mt-2 text-sm">{copiado ? "Copiado" : "Copiar link"}</span>
          </button>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${cardStyle} bg-green-600 hover:bg-green-700`}>
            <FaWhatsapp size={28} />
            <span className="mt-2 text-sm">Compartir por WhatsApp</span>
          </a>

          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={`${cardStyle} bg-blue-800 hover:bg-blue-900`}>
            <FaFacebook size={28} />
            <span className="mt-2 text-sm">Facebook</span>
          </a>

          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={`${cardStyle} bg-sky-500 hover:bg-sky-600`}>
            <FaTwitter size={28} />
            <span className="mt-2 text-sm">Twitter/X</span>
          </a>
        </div>
      </div>

      {/* Botón volver al inicio con animación */}
      <div className="mt-10">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition animate-pulse"
        >
          <FiHome size={20} />
          Hacer otro test
        </Link>
      </div>

      {/* Aviso ético */}
      <p className="text-xs text-gray-500 text-center mt-8">
        Este contenido es formativo, no clínico.  
        Si atraviesas malestar significativo, busca apoyo profesional.
      </p>
    </div>
  );
}