import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoApagado extends EstadoBase {
  encender(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Encendido'));
    return { mensaje: 'El aire acondicionado fue encendido.' };
  }

  simular(): ResultadoAccion {
    return { mensaje: 'El sistema permanece apagado hasta que el usuario lo encienda.' };
  }

  obtenerNombreEstado(): string {
    return 'Apagado';
  }

  obtenerDescripcion(): string {
    return 'El aire acondicionado se encuentra apagado.';
  }
}
