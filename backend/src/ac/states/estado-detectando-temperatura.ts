import { AireAcondicionado } from '../aire-acondicionado';
import { ResultadoAccion } from './estado-ac.interface';
import { EstadoBase } from './estado-base';

export class EstadoDetectandoTemperatura extends EstadoBase {
  detectarTemperatura(ac: AireAcondicionado): ResultadoAccion {
    if (ac.sensorConFalla || ac.debeFallarSensor()) {
      ac.cambiarEstado(ac.crearEstado('ErrorSensor'));
      return { mensaje: 'El sensor fallo durante la lectura de temperatura.' };
    }

    if (ac.temperaturaActual > ac.temperaturaObjetivo) {
      ac.cambiarEstado(ac.crearEstado('Enfriando'));
      return ac.enfriar();
    }

    ac.cambiarEstado(ac.crearEstado('TemperaturaAlcanzada'));
    return { mensaje: 'La temperatura actual ya cumple el objetivo configurado.' };
  }

  apagar(ac: AireAcondicionado): ResultadoAccion {
    ac.cambiarEstado(ac.crearEstado('Apagado'));
    return { mensaje: 'Sistema apagado durante la deteccion.' };
  }

  simular(ac: AireAcondicionado): ResultadoAccion {
    return this.detectarTemperatura(ac);
  }

  obtenerNombreEstado(): string {
    return 'DetectandoTemperatura';
  }

  obtenerDescripcion(): string {
    return 'El sistema esta revisando la temperatura actual.';
  }
}
