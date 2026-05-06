import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoMantenimiento extends EstadoBase {
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    ac.sensorConFalla = false;
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return ac.detectarTemperatura();
  }

  reiniciar(ac: AireAcondicionado): ResultadoAccion {
    ac.sensorConFalla = false;
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'Sistema reiniciado despues del mantenimiento.' };
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'Sistema apagado desde mantenimiento.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.ciclosMantenimiento += 1;

    if (ac.ciclosMantenimiento >= 2) {
      ac.ciclosMantenimiento = 0;
      ac.sensorConFalla = false;
      ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
      return { mensaje: 'Mantenimiento completado, se reanuda la deteccion.' };
    }

    return { mensaje: 'El sistema continua en revision tecnica.' };
  }

  obtenerNombreEstado(): string {
    return 'ModoMantenimiento';
  }

  obtenerDescripcion(): string {
    return 'El sistema esta en revision o reparacion.';
  }
}
