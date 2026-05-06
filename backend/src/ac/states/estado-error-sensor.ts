import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoErrorSensor extends EstadoBase {
  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'Sistema apagado por seguridad debido al error del sensor.' };
  }

  mantenimiento(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('ModoMantenimiento'));
    return { mensaje: 'Se solicito revision tecnica del sensor.' };
  }

  manejarError(): ResultadoAccion {
    return { mensaje: 'El sistema ya se encuentra bloqueado por error de sensor.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.ciclosError += 1;

    if (ac.ciclosError >= 2) {
      ac.ciclosError = 0;
      ac.cambiarEstado(ac.crearEstado('ModoMantenimiento'));
      return { mensaje: 'Se envio el equipo a mantenimiento.' };
    }

    return { mensaje: 'Operaciones bloqueadas por falla del sensor.' };
  }

  obtenerNombreEstado(): string {
    return 'ErrorSensor';
  }

  obtenerDescripcion(): string {
    return 'Existe una falla en el sensor de temperatura.';
  }
}
