import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoEnfriando extends EstadoBase {
  enfriar(ac: AireAcondicionado): ResultadoAccion {
    ac.temperaturaActual = Math.max(ac.temperaturaObjetivo, ac.temperaturaActual - 1);

    if (ac.temperaturaActual <= ac.temperaturaObjetivo) {
      ac.cambiarEstado(ac.crearEstado('TemperaturaAlcanzada'));
      return { mensaje: 'El sistema enfrio la habitacion y alcanzo la temperatura objetivo.' };
    }

    return { mensaje: 'El aire acondicionado redujo la temperatura en 1 grado.' };
  }

  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    return this.enfriar(ac);
  }

  activarSleep(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('ModoSleep'));
    return { mensaje: 'Modo sleep activado mientras el equipo enfriaba.' };
  }

  activarAhorroEnergia(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('ModoAhorroEnergia'));
    return { mensaje: 'Modo ahorro de energia activado mientras el equipo enfriaba.' };
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'El aire acondicionado fue apagado.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    ac.ciclosEnfriando += 1;

    if (ac.ciclosEnfriando > 0 && ac.ciclosEnfriando % 7 === 0) {
      ac.cambiarEstado(ac.crearEstado('ModoSleep'));
      return { mensaje: 'Se activo modo sleep para reducir ruido y consumo.' };
    }

    if (ac.ciclosEnfriando > 0 && ac.ciclosEnfriando % 5 === 0) {
      ac.cambiarEstado(ac.crearEstado('ModoAhorroEnergia'));
      return { mensaje: 'Se activo ahorro de energia durante el enfriamiento.' };
    }

    return this.enfriar(ac);
  }

  obtenerNombreEstado(): string {
    return 'Enfriando';
  }

  obtenerDescripcion(): string {
    return 'El aire acondicionado esta enfriando la habitacion.';
  }
}
