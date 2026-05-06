import { useEffect, useState } from 'react';
import { Gauge, Target } from 'lucide-react';
import { acService } from '../services/acService';
import { EstadoACResponse } from '../types/ac';
import { ControlButtons } from './ControlButtons';
import { EstadoCard } from './EstadoCard';
import { HistorialEstados } from './HistorialEstados';

export function ACPanel() {
  const [estado, setEstado] = useState<EstadoACResponse | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargarEstado = async () => {
    const data = await acService.obtenerEstado();
    setEstado(data);
  };

  useEffect(() => {
    cargarEstado().catch(() => setError('No fue posible conectar con el backend en http://localhost:3000.'));

    const intervalo = window.setInterval(() => {
      cargarEstado().catch(() => setError('No fue posible actualizar el estado automatico.'));
    }, 1500);

    return () => window.clearInterval(intervalo);
  }, []);

  const ejecutar = async (accion: () => Promise<void>) => {
    setCargando(true);
    setError('');
    try {
      await accion();
    } catch {
      setError('La accion no pudo completarse. Revisa que el backend este ejecutandose.');
    } finally {
      setCargando(false);
    }
  };

  if (!estado) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070c] p-6">
        <div className="hud-panel rounded-lg p-6 text-slate-200">Cargando simulador...</div>
      </main>
    );
  }

  const acciones = {
    encender: async () => setEstado(await acService.encender()),
    apagar: async () => setEstado(await acService.apagar()),
    subirObjetivo: async () => setEstado(await acService.cambiarTemperaturaObjetivo(1)),
    bajarObjetivo: async () => setEstado(await acService.cambiarTemperaturaObjetivo(-1)),
  };

  return (
    <main className="min-h-screen bg-[#05070c] p-4 sm:p-6 lg:p-8">
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Patron State</p>
            <h1 className="mt-2 text-4xl font-black tracking-normal text-slate-50 sm:text-5xl">Aire Acondicionado</h1>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <EstadoCard key={estado.estadoActual} estado={estado} />

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="hud-panel rounded-lg p-5">
                <div className="flex items-center gap-2 text-cyan-200">
                  <Gauge size={20} />
                  <span className="text-sm font-semibold uppercase tracking-wide">Temperatura actual</span>
                </div>
                <p className="hud-readout mt-3 text-5xl font-black text-slate-50">{estado.temperaturaActual}°C</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.65)]" style={{ width: `${Math.min(100, Math.max(0, estado.temperaturaActual * 3))}%` }} />
                </div>
              </div>
              <div className="hud-panel rounded-lg p-5">
                <div className="flex items-center gap-2 text-violet-200">
                  <Target size={20} />
                  <span className="text-sm font-semibold uppercase tracking-wide">Temperatura objetivo</span>
                </div>
                <p className="hud-readout mt-3 text-5xl font-black text-slate-50">{estado.temperaturaObjetivo}°C</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-violet-300 shadow-[0_0_22px_rgba(196,181,253,0.65)]" style={{ width: `${Math.min(100, Math.max(0, estado.temperaturaObjetivo * 3))}%` }} />
                </div>
              </div>
            </section>

            <ControlButtons cargando={cargando} ejecutar={ejecutar} acciones={acciones} />

            {error && <div className="rounded-lg border border-red-900 bg-red-950 p-4 text-sm font-medium text-red-200">{error}</div>}
          </div>

          <HistorialEstados historial={estado.historial} />
        </div>
      </div>
    </main>
  );
}
