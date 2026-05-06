import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoSleep extends EstadoBase {
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    ac.temperaturaObjetivo += 1;
    ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
    return { mensaje: 'Finalizo el temporizador sleep; se revisa la temperatura con menor intensidad.' };
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'El aire acondicionado fue apagado desde modo sleep.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.ciclosSleep += 1;

    if (ac.ciclosSleep >= 2) {
      ac.ciclosSleep = 0;
      ac.cambiarEstado(ac.crearEstado('DetectandoTemperatura'));
      return { mensaje: 'Termino el periodo sleep y se revisa la temperatura.' };
    }

    return { mensaje: 'El modo sleep continua activo.' };
  }

  obtenerNombreEstado(): string {
    return 'ModoSleep';
  }

  obtenerDescripcion(): string {
    return 'El modo sleep esta activo para reducir ruido y consumo.';
  }
}
