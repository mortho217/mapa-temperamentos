const color = isDominant ? base : isSecondary ? `${base}CC` : `${base}88`;
return <Cell key={`cell-${idx}`} fill={color} />;
})}
</Bar>
</BarChart>
</ResponsiveContainer>
</div>
</div>
</motion.div>


<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6">
<h3 className="text-slate-800 font-semibold mb-2">Consejos inmediatos</h3>
<p className="text-slate-600 text-sm mb-3">Tres acciones concretas para hoy según tu dominante:</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
{dominant?.[0] === 'SG' && (
<>
<Tip color={COLORS.SG}>Prioriza 2 tareas clave y cierra ciclos.</Tip>
<Tip color={COLORS.SG}>Usa Pomodoro 25/5 durante 2 bloques.</Tip>
<Tip color={COLORS.SG}>Evita añadir tareas nuevas hasta terminar.</Tip>
</>
)}
{dominant?.[0] === 'CL' && (
<>
<Tip color={COLORS.CL}>Pregunta expectativas antes de actuar.</Tip>
<Tip color={COLORS.CL}>Pausa consciente de 90 s antes de responder.</Tip>
<Tip color={COLORS.CL}>Delegar 1 tarea hoy con criterios claros.</Tip>
</>
)}
{dominant?.[0] === 'FL' && (
<>
<Tip color={COLORS.FL}>Bloque de enfoque de 25 min ahora.</Tip>
<Tip color={COLORS.FL}>Usa una frase asertiva para un pendiente.</Tip>
<Tip color={COLORS.FL}>Revisa y ordena 3 prioridades.</Tip>
</>
)}
{dominant?.[0] === 'ML' && (
<>
<Tip color={COLORS.ML}>Entrega una versión 80/20 hoy.</Tip>
<Tip color={COLORS.ML}>Define un límite de 2 revisiones.</Tip>
<Tip color={COLORS.ML}>Comparte un borrador temprano con alguien.</Tip>
</>
)}
{!dominant && (
<>
<Tip color="#64748B">Haz el test extendido para aumentar la claridad.</Tip>
<Tip color="#64748B">Elige una acción pequeña y hazla en 10 min.</Tip>
<Tip color="#64748B">Evita la sobrecarga: 2 tareas máximo hoy.</Tip>
</>
)}
</div>
</motion.div>


<p className="text-xs text-slate-500 mt-6">
Este contenido es formativo, no clínico. Si atraviesas malestar significativo, busca apoyo profesional.
</p>
</div>
);
}


const Tip: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
<label className="flex items-start gap-2 card p-3 cursor-pointer group">
<input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400" />
<span className="text-slate-700 text-sm leading-relaxed">{children}</span>
</label>
);