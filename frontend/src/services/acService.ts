import axios from 'axios';
import { EstadoACResponse } from '../types/ac';

const api = axios.create({
  baseURL: 'http://localhost:3000/ac',
});

export const acService = {
  obtenerEstado: async () => (await api.get<EstadoACResponse>('/estado')).data,
  encender: async () => (await api.post<EstadoACResponse>('/encender')).data,
  apagar: async () => (await api.post<EstadoACResponse>('/apagar')).data,
  detectarTemperatura: async () => (await api.post<EstadoACResponse>('/detectar-temperatura')).data,
  cambiarTemperatura: async (delta: number) =>
    (await api.post<EstadoACResponse>('/cambiar-temperatura', { delta })).data,
  cambiarTemperaturaObjetivo: async (delta: number) =>
    (await api.post<EstadoACResponse>('/cambiar-temperatura-objetivo', { delta })).data,
  activarSleep: async () => (await api.post<EstadoACResponse>('/activar-sleep')).data,
  activarAhorro: async () => (await api.post<EstadoACResponse>('/activar-ahorro')).data,
  reportarError: async () => (await api.post<EstadoACResponse>('/reportar-error')).data,
  mantenimiento: async () => (await api.post<EstadoACResponse>('/mantenimiento')).data,
  reiniciar: async () => (await api.post<EstadoACResponse>('/reiniciar')).data,
};
