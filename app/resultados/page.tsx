import MapaResultados from '../../components/MapaResultados';

type Search = { SG?: string; CL?: string; FL?: string; ML?: string };

const clamp = (n: string | undefined) => {
  const v = Number(n);
  return Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 0;
};

// (Opcional) Fuerza render dinámico si quieres evitar cualquier prerender:
// export const dynamic = 'force-dynamic';
// o también: export const revalidate = 0;

export default function ResultadosPage({ searchParams }: { searchParams: Search }) {
  const scores = {
    SG: clamp(searchParams.SG),
    CL: clamp(searchParams.CL),
    FL: clamp(searchParams.FL),
    ML: clamp(searchParams.ML),
  };

  const allZero = Object.values(scores).every((v) => v === 0);

  return (
    <main style={{ padding: 16 }}>
      {allZero ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Faltan parámetros</h2>
          <p>Abre esta página con la URL incluyendo valores, por ejemplo:</p>
          <code style={{ display: 'block', marginTop: 8 }}>
            /resultados?SG=45&CL=32&FL=18&ML=28
          </code>
        </div>
      ) : (
        <MapaResultados scores={scores as any} />
      )}
    </main>
  );
}