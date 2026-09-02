import { createContext } from 'react';
import type { ChangeEvent } from 'react';

export interface Busqueda {
  ciudad: string;
  pais: string;
}

/** Estados posibles del panel de resultado (máquina de estados simple). */
export type EstadoClima = 'inicial' | 'cargando' | 'exito' | 'error';

/** Datos de clima ya normalizados para la UI (unidades métricas). */
export interface Clima {
  nombre: string;
  pais: string;
  temp: number;
  sensacion: number;
  tempMin: number;
  tempMax: number;
  humedad: number;
  viento: number;
  descripcion: string;
  /** Código de icono de OpenWeather, p. ej. "10d". */
  icono: string;
}

export interface ClimaContextValue {
  busqueda: Busqueda;
  datosBusqueda: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  consultarClima: (datos: Busqueda) => Promise<void>;
  reiniciar: () => void;
  resultado: Clima | null;
  estado: EstadoClima;
  error: string;
}

const ClimaContext = createContext<ClimaContextValue | undefined>(undefined);

export default ClimaContext;
