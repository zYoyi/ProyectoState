import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoTemperaturaAlcanzada extends EstadoBase {
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    if (ac.temperaturaActual > ac.temperaturaObjetivo) {
      ac.cambiarEstado(ac.crearEstado('Enfriando'));
      return { mensaje: 'La temperatura subio; se reactiva el enfriamiento.' };
    }

    ac.cambiarEstado(ac.crearEstado('Ventilando'));
    return { mensaje: 'Temperatura estable; el sistema pasa a ventilacion.' };
  }

  ventilar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Ventilando'));
    return { mensaje: 'Se mantiene flujo de aire sin enfriar.' };
  }

  activarSleep(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('ModoSleep'));
    return { mensaje: 'Modo sleep activado con la temperatura objetivo alcanzada.' };
  }

  activarAhorroEnergia(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('ModoAhorroEnergia'));
    return { mensaje: 'Modo ahorro de energia activado.' };
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'El aire acondicionado fue apagado.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.ciclosEstable += 1;

    if (ac.ciclosEstable % 4 === 0) {
      ac.temperaturaActual += 1;
      ac.cambiarEstado(ac.crearEstado('Enfriando'));
      return { mensaje: 'La temperatura subio y se reactivo el enfriamiento.' };
    }

    if (ac.ciclosEstable % 2 === 0) {
      ac.cambiarEstado(ac.crearEstado('ModoAhorroEnergia'));
      return { mensaje: 'Temperatura estable, se activo bajo consumo.' };
    }

    ac.cambiarEstado(ac.crearEstado('Ventilando'));
    return { mensaje: 'El sistema mantiene aire en ventilacion.' };
  }

  obtenerNombreEstado(): string {
    return 'TemperaturaAlcanzada';
  }

  obtenerDescripcion(): string {
    return 'La temperatura objetivo fue alcanzada.';
  }
}
