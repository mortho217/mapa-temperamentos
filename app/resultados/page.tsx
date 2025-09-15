use client';
import { useSearchParams } from 'next/navigation';
import MapaResultados from '@/components/MapaResultados';


export default function ResultadosPage() {
const sp = useSearchParams();
const parse = (k: string) => {
const v = Number(sp.get(k));
return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 0;
};


const scores = {
SG: parse('SG'),
CL: parse('CL'),
FL: parse('FL'),
ML: parse('ML'),
};


return (
<main>
<MapaResultados scores={scores} />
</main>
);
}