import {
  Minus,
  Play,
  Plus,
  Power,
} from 'lucide-react';

interface Props {
  cargando: boolean;
  ejecutar: (accion: () => Promise<void>) => void;
  acciones: {
    encender: () => Promise<void>;
    apagar: () => Promise<void>;
    subirObjetivo: () => Promise<void>;
    bajarObjetivo: () => Promise<void>;
  };
}

const botonBase =
  'flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';

export function ControlButtons({ cargando, ejecutar, acciones }: Props) {
  return (
    <section className="hud-panel rounded-lg p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-50">Controles manuales</h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <button className={`${botonBase} border border-emerald-300/35 bg-emerald-400/10 text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_28px_rgba(16,185,129,0.16)] hover:border-emerald-200/70 hover:bg-emerald-300/18 hover:text-white`} disabled={cargando} onClick={() => ejecutar(acciones.encender)}>
          <Play size={18} /> Encender
        </button>
        <button className={`${botonBase} border border-rose-300/35 bg-rose-400/10 text-rose-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_28px_rgba(244,63,94,0.14)] hover:border-rose-200/70 hover:bg-rose-300/18 hover:text-white`} disabled={cargando} onClick={() => ejecutar(acciones.apagar)}>
          <Power size={18} /> Apagar
        </button>
        <button className={`${botonBase} bg-slate-950/80 text-cyan-100 ring-1 ring-cyan-300/20 hover:bg-cyan-950/60`} disabled={cargando} onClick={() => ejecutar(acciones.bajarObjetivo)}>
          <Minus size={18} /> Temperatura
        </button>
        <button className={`${botonBase} bg-slate-950/80 text-cyan-100 ring-1 ring-cyan-300/20 hover:bg-cyan-950/60`} disabled={cargando} onClick={() => ejecutar(acciones.subirObjetivo)}>
          <Plus size={18} /> Temperatura
        </button>
      </div>
    </section>
  );
}
