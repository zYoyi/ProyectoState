import { AireAcondicionado } from '../aire-acondicionado';
import { EstadoAC, ResultadoAccion } from './estado-ac.interface';

export abstract class EstadoBase implements EstadoAC {
  encender(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'La accion encender no esta permitida en este estado.' };
  }

  apagar(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'La accion apagar no esta permitida en este estado.' };
  }

  detectarTemperatura(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'No se puede detectar temperatura en este estado.' };
  }

  enfriar(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'No se puede enfriar desde este estado.' };
  }

  ventilar(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'No se puede ventilar desde este estado.' };
  }

  activarSleep(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'No se puede activar modo sleep desde este estado.' };
  }

  activarAhorroEnergia(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'No se puede activar ahorro de energia desde este estado.' };
  }

  manejarError(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('ErrorSensor'));
    return { mensaje: 'Se reporto una falla en el sensor de temperatura.' };
  }

  mantenimiento(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'Solo se puede solicitar mantenimiento desde error de sensor.' };
  }

  reiniciar(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'No se puede reiniciar desde este estado.' };
  }

  simular(_ac: AireAcondicionado): ResultadoAccion {
    return { mensaje: 'La simulacion no realiza cambios en este estado.' };
  }

  abstract obtenerNombreEstado(): string;
  abstract obtenerDescripcion(): string;
}
