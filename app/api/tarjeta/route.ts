import { NextResponse } from "next/server";

type Key = "SG" | "CL" | "FL" | "ML";

function toNumber(x: unknown): number {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}
function clampRound(x: unknown): number {
  const n = Math.round(toNumber(x));
  return Math.max(0, Math.min(100, n));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const SG = clampRound(body?.SG);
  const CL = clampRound(body?.CL);
  const FL = clampRound(body?.FL);
  const ML = clampRound(body?.ML);

  const arr = [
    { k: "SG" as Key, v: SG },
    { k: "CL" as Key, v: CL },
    { k: "FL" as Key, v: FL },
    { k: "ML" as Key, v: ML },
  ].sort((a, b) => b.v - a.v);

  const top = arr[0].k;

  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://mapa-temperamentos-4ewk.vercel.app";

  const url = `${base}/tarjeta/${top}`;

  return NextResponse.json({ top, url });
}