import { AireAcondicionado } from '../aire-acondicionado';

export interface ResultadoAccion {
  mensaje: string;
}

export interface EstadoAC {
  encender(ac: AireAcondicionado): ResultadoAccion;
  apagar(ac: AireAcondicionado): ResultadoAccion;
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion;
  enfriar(ac: AireAcondicionado): ResultadoAccion;
  ventilar(ac: AireAcondicionado): ResultadoAccion;
  activarSleep(ac: AireAcondicionado): ResultadoAccion;
  activarAhorroEnergia(ac: AireAcondicionado): ResultadoAccion;
  manejarError(ac: AireAcondicionado): ResultadoAccion;
  mantenimiento(ac: AireAcondicionado): ResultadoAccion;
  reiniciar(ac: AireAcondicionado): ResultadoAccion;
  simular(ac: AireAcondicionado): ResultadoAccion;
  obtenerNombreEstado(): string;
  obtenerDescripcion(): string;
}
