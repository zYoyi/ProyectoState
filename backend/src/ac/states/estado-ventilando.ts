import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoVentilando extends EstadoBase {
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return ac.detectarTemperatura();
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'El aire acondicionado fue apagado desde ventilacion.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.temperaturaActual += 1;
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return { mensaje: 'Se revisa la temperatura despues de ventilar.' };
  }

  obtenerNombreEstado(): string {
    return 'Ventilando';
  }

  obtenerDescripcion(): string {
    return 'El sistema mantiene el flujo de aire.';
  }
}
