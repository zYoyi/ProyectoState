import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { AireAcondicionado, EstadoRespuesta } from './aire-acondicionado';

@Injectable()
export class AcService implements OnModuleDestroy {
  private readonly ac = new AireAcondicionado();
  private readonly intervaloSimulacion: NodeJS.Timeout;

  constructor() {
    // El backend avanza la simulacion solo; cada estado decide su siguiente transicion.
    this.intervaloSimulacion = setInterval(() => {
      this.ac.simular();
    }, 2500);
  }

  onModuleDestroy() {
    clearInterval(this.intervaloSimulacion);
  }

  obtenerEstado(): EstadoRespuesta {
    return this.ac.obtenerRespuestaActual();
  }

  encender(): EstadoRespuesta {
    const resultado = this.ac.encender();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  apagar(): EstadoRespuesta {
    const resultado = this.ac.apagar();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  detectarTemperatura(): EstadoRespuesta {
    const resultado = this.ac.detectarTemperatura();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  cambiarTemperatura(temperatura?: number, delta?: number): EstadoRespuesta {
    if (typeof temperatura === 'number') {
      this.ac.cambiarTemperatura(temperatura);
    }

    if (typeof delta === 'number') {
      this.ac.cambiarTemperatura(this.ac.temperaturaActual + delta);
    }

    return this.ac.obtenerRespuesta('Temperatura actual modificada para la simulacion.');
  }

  cambiarTemperaturaObjetivo(delta: number): EstadoRespuesta {
    this.ac.cambiarTemperaturaObjetivo(delta);
    return this.ac.obtenerRespuesta('Temperatura objetivo actualizada.');
  }

  activarSleep(): EstadoRespuesta {
    const resultado = this.ac.activarSleep();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  activarAhorro(): EstadoRespuesta {
    const resultado = this.ac.activarAhorroEnergia();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  reportarError(): EstadoRespuesta {
    const resultado = this.ac.manejarError();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  mantenimiento(): EstadoRespuesta {
    const resultado = this.ac.mantenimiento();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }

  reiniciar(): EstadoRespuesta {
    const resultado = this.ac.reiniciar();
    return this.ac.obtenerRespuesta(resultado.mensaje);
  }
}
