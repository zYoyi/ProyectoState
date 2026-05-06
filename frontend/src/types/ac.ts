export interface HistorialEstado {
  estado: string;
  descripcion: string;
  fecha: string;
}

export interface EstadoACResponse {
  estadoActual: string;
  descripcion: string;
  temperaturaActual: number;
  temperaturaObjetivo: number;
  mensaje: string;
  historial: HistorialEstado[];
}
