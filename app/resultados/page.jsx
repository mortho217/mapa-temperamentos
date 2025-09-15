"use client";
import { useSearchParams } from "next/navigation";
import MapaResultados from "@/components/MapaResultados";

export default function ResultadosPage() {
  const sp = useSearchParams();
  const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0));

  const scores = {
    SG: clamp(sp.get("SG")),
    CL: clamp(sp.get("CL")),
    FL: clamp(sp.get("FL")),
    ML: clamp(sp.get("ML")),
  };

  const allZero = Object.values(scores).every(v => v === 0);

  return (
    <main style={{ padding: 16 }}>
      {allZero ? (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Faltan parámetros</h2>
          <p>Abre esta página con la URL incluyendo valores, por ejemplo:</p>
          <code style={{ display: "block", marginTop: 8, whiteSpace: "pre-wrap" }}>
            {`/resultados?SG=45&CL=32&FL=18&ML=28`}
          </code>
        </div>
      ) : (
        <MapaResultados scores={scores} />
      )}
    </main>
  );
}