import { Clock } from 'lucide-react';
import { HistorialEstado } from '../types/ac';

interface Props {
  historial: HistorialEstado[];
}

export function HistorialEstados({ historial }: Props) {
  return (
    <section className="hud-panel rounded-lg p-5">
      <div className="flex items-center gap-2">
        <Clock size={20} className="text-cyan-200" />
        <h2 className="text-lg font-bold text-slate-50">Historial de estados</h2>
      </div>
      <div className="hud-scroll mt-4 max-h-80 space-y-3 overflow-y-auto pr-2">
        {historial.map((item, index) => (
          <article key={`${item.fecha}-${index}`} className="rounded-md border border-slate-800/80 bg-slate-950/70 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-slate-100">{item.estado}</span>
              <time className="text-xs text-slate-400">{new Date(item.fecha).toLocaleTimeString()}</time>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-400">{item.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
