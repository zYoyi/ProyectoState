import { EstadoAC } from './states/estado-ac.interface';
import { EstadoAhorroEnergia } from './states/estado-ahorro-energia';
import { EstadoApagado } from './states/estado-apagado';
import { EstadoDetectandoTemperatura } from './states/estado-detectando-temperatura';
import { EstadoEncendido } from './states/estado-encendido';
import { EstadoEnfriando } from './states/estado-enfriando';
import { EstadoErrorSensor } from './states/estado-error-sensor';
import { EstadoMantenimiento } from './states/estado-mantenimiento';
import { EstadoSleep } from './states/estado-sleep';
import { EstadoTemperaturaAlcanzada } from './states/estado-temperatura-alcanzada';
import { EstadoVentilando } from './states/estado-ventilando';

export type NombreEstado =
  | 'Apagado'
  | 'Encendido'
  | 'DetectandoTemperatura'
  | 'Enfriando'
  | 'TemperaturaAlcanzada'
  | 'Ventilando'
  | 'ModoSleep'
  | 'ModoAhorroEnergia'
  | 'ErrorSensor'
  | 'ModoMantenimiento';

export interface HistorialEstado {
  estado: string;
  descripcion: string;
  fecha: string;
}

export interface EstadoRespuesta {
  estadoActual: string;
  descripcion: string;
  temperaturaActual: number;
  temperaturaObjetivo: number;
  mensaje: string;
  historial: HistorialEstado[];
}

export class AireAcondicionado {
  estadoActual: EstadoAC;
  temperaturaActual = 27;
  temperaturaObjetivo = 22;
  sensorConFalla = false;
  ciclosEnfriando = 0;
  ciclosEstable = 0;
  ciclosSleep = 0;
  ciclosAhorro = 0;
  ciclosError = 0;
  ciclosMantenimiento = 0;
  ciclosSimulacion = 0;
  private ultimoMensaje = 'Sistema inicializado en estado apagado.';
  private readonly historial: HistorialEstado[] = [];

  constructor() {
    this.estadoActual = this.crearEstado('Apagado');
    this.registrarEstado();
  }

  // El contexto no decide el comportamiento: delega cada accion al estado actual.
  encender() {
    return this.estadoActual.encender(this);
  }

  apagar() {
    return this.estadoActual.apagar(this);
  }

  detectarTemperatura() {
    return this.estadoActual.detectarTemperatura(this);
  }

  enfriar() {
    return this.estadoActual.enfriar(this);
  }

  ventilar() {
    return this.estadoActual.ventilar(this);
  }

  activarSleep() {
    return this.estadoActual.activarSleep(this);
  }

  activarAhorroEnergia() {
    return this.estadoActual.activarAhorroEnergia(this);
  }

  manejarError() {
    this.sensorConFalla = true;
    return this.estadoActual.manejarError(this);
  }

  mantenimiento() {
    return this.estadoActual.mantenimiento(this);
  }

  reiniciar() {
    return this.estadoActual.reiniciar(this);
  }

  simular() {
    this.ciclosSimulacion += 1;
    const resultado = this.estadoActual.simular(this);
    this.ultimoMensaje = resultado.mensaje;
    return resultado;
  }

  cambiarTemperatura(temperatura: number) {
    this.temperaturaActual = temperatura;
  }

  cambiarTemperaturaObjetivo(delta: number) {
    this.temperaturaObjetivo = Math.min(30, Math.max(16, this.temperaturaObjetivo + delta));
  }

  cambiarEstado(nuevoEstado: EstadoAC) {
    this.estadoActual = nuevoEstado;
    this.registrarEstado();
  }

  debeFallarSensor(): boolean {
    const debeFallar = this.ciclosSimulacion > 0 && this.ciclosSimulacion % 18 === 0;
    this.sensorConFalla = debeFallar;
    return debeFallar;
  }

  crearEstado(nombre: NombreEstado): EstadoAC {
    const estados: Record<NombreEstado, () => EstadoAC> = {
      Apagado: () => new EstadoApagado(),
      Encendido: () => new EstadoEncendido(),
      DetectandoTemperatura: () => new EstadoDetectandoTemperatura(),
      Enfriando: () => new EstadoEnfriando(),
      TemperaturaAlcanzada: () => new EstadoTemperaturaAlcanzada(),
      Ventilando: () => new EstadoVentilando(),
      ModoSleep: () => new EstadoSleep(),
      ModoAhorroEnergia: () => new EstadoAhorroEnergia(),
      ErrorSensor: () => new EstadoErrorSensor(),
      ModoMantenimiento: () => new EstadoMantenimiento(),
    };

    return estados[nombre]();
  }

  obtenerRespuesta(mensaje: string): EstadoRespuesta {
    this.ultimoMensaje = mensaje;

    return {
      estadoActual: this.estadoActual.obtenerNombreEstado(),
      descripcion: this.estadoActual.obtenerDescripcion(),
      temperaturaActual: this.temperaturaActual,
      temperaturaObjetivo: this.temperaturaObjetivo,
      mensaje,
      historial: [...this.historial].reverse(),
    };
  }

  obtenerRespuestaActual(): EstadoRespuesta {
    return this.obtenerRespuesta(this.ultimoMensaje);
  }

  private registrarEstado() {
    this.historial.push({
      estado: this.estadoActual.obtenerNombreEstado(),
      descripcion: this.estadoActual.obtenerDescripcion(),
      fecha: new Date().toISOString(),
    });
  }
}
