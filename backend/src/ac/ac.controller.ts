import { Body, Controller, Get, Post } from '@nestjs/common';
import { AcService } from './ac.service';
import { CambiarTemperaturaDto } from './dto/cambiar-temperatura.dto';

@Controller('ac')
export class AcController {
  constructor(private readonly acService: AcService) {}

  @Get('estado')
  obtenerEstado() {
    return this.acService.obtenerEstado();
  }

  @Post('encender')
  encender() {
    return this.acService.encender();
  }

  @Post('apagar')
  apagar() {
    return this.acService.apagar();
  }

  @Post('detectar-temperatura')
  detectarTemperatura() {
    return this.acService.detectarTemperatura();
  }

  @Post('cambiar-temperatura')
  cambiarTemperatura(@Body() body: CambiarTemperaturaDto) {
    return this.acService.cambiarTemperatura(body.temperatura, body.delta);
  }

  @Post('cambiar-temperatura-objetivo')
  cambiarTemperaturaObjetivo(@Body() body: CambiarTemperaturaDto) {
    return this.acService.cambiarTemperaturaObjetivo(body.delta ?? 0);
  }

  @Post('activar-sleep')
  activarSleep() {
    return this.acService.activarSleep();
  }

  @Post('activar-ahorro')
  activarAhorro() {
    return this.acService.activarAhorro();
  }

  @Post('reportar-error')
  reportarError() {
    return this.acService.reportarError();
  }

  @Post('mantenimiento')
  mantenimiento() {
    return this.acService.mantenimiento();
  }

  @Post('reiniciar')
  reiniciar() {
    return this.acService.reiniciar();
  }
}
