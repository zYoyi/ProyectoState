import {
  AlertTriangle,
  Battery,
  Fan,
  Moon,
  Power,
  Snowflake,
  Thermometer,
  Wrench,
} from 'lucide-react';
import { EstadoACResponse } from '../types/ac';

const estilos: Record<string, { clase: string; icono: JSX.Element }> = {
  Apagado: { clase: 'from-slate-800 via-slate-950 to-zinc-950 shadow-slate-950/60', icono: <Power size={30} /> },
  Encendido: { clase: 'from-emerald-700/70 via-slate-950 to-cyan-900 shadow-emerald-950/40', icono: <Power size={30} /> },
  DetectandoTemperatura: { clase: 'from-cyan-700/70 via-slate-950 to-blue-900 shadow-cyan-950/40', icono: <Thermometer size={30} /> },
  Enfriando: { clase: 'from-sky-700/75 via-slate-950 to-cyan-800 shadow-cyan-950/40', icono: <Snowflake size={30} /> },
  TemperaturaAlcanzada: { clase: 'from-teal-700/75 via-slate-950 to-emerald-800 shadow-teal-950/40', icono: <Thermometer size={30} /> },
  Ventilando: { clase: 'from-indigo-700/75 via-slate-950 to-cyan-900 shadow-indigo-950/40', icono: <Fan size={30} /> },
  ModoSleep: { clase: 'from-violet-700/75 via-slate-950 to-fuchsia-900 shadow-violet-950/40', icono: <Moon size={30} /> },
  ModoAhorroEnergia: { clase: 'from-lime-700/70 via-slate-950 to-teal-900 shadow-lime-950/35', icono: <Battery size={30} /> },
  ErrorSensor: { clase: 'from-red-700/80 via-slate-950 to-rose-900 shadow-red-950/40', icono: <AlertTriangle size={30} /> },
  ModoMantenimiento: { clase: 'from-amber-700/75 via-slate-950 to-orange-900 shadow-amber-950/35', icono: <Wrench size={30} /> },
};

interface Props {
  estado: EstadoACResponse;
}

export function EstadoCard({ estado }: Props) {
  const visual = estilos[estado.estadoActual] ?? estilos.Apagado;

  return (
    <section className={`state-sweep relative overflow-hidden rounded-lg border border-cyan-200/10 bg-gradient-to-br p-6 shadow-2xl transition-colors duration-500 ${visual.clase}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300/60 via-violet-300/40 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-2/3 bg-gradient-to-r from-cyan-300/40 to-transparent" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Estado actual</p>
          <h1 className="hud-readout mt-2 text-4xl font-black tracking-normal text-white">{estado.estadoActual}</h1>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/10 p-3 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.22)]" title={estado.estadoActual}>
          {visual.icono}
        </div>
      </div>
      <p className="relative mt-5 text-base leading-7 text-slate-200">{estado.descripcion}</p>
    </section>
  );
}
