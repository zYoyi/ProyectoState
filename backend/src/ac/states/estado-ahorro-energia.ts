import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoAhorroEnergia extends EstadoBase {
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return { mensaje: 'Revision periodica iniciada desde modo ahorro de energia.' };
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'El aire acondicionado fue apagado desde ahorro de energia.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.ciclosAhorro += 1;

    if (ac.ciclosAhorro >= 2) {
      ac.ciclosAhorro = 0;
      ac.temperaturaActual += 1;
      ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
      return { mensaje: 'Revision periodica desde ahorro de energia.' };
    }

    return { mensaje: 'El sistema sigue en bajo consumo.' };
  }

  obtenerNombreEstado(): string {
    return 'ModoAhorroEnergia';
  }

  obtenerDescripcion(): string {
    return 'El sistema trabaja en modo de bajo consumo.';
  }
}
