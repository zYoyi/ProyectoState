import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoEncendido extends EstadoBase {
  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'El aire acondicionado fue apagado.' };
  }

  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return ac.detectarTemperatura();
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return { mensaje: 'El sistema inicio la deteccion de temperatura.' };
  }

  obtenerNombreEstado(): string {
    return 'Encendido';
  }

  obtenerDescripcion(): string {
    return 'El sistema fue encendido y esta listo para iniciar.';
  }
}
