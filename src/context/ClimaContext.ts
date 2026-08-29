import { createContext } from 'react';

export interface Busqueda {
  ciudad: string;
  pais: string;
}

export interface Clima {
  name?: string;
  main?: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
}

export interface ClimaContextValue {
  busqueda: Busqueda;
  datosBusqueda: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  consultarClima: (datos: Busqueda) => Promise<void>;
  resultado: Clima;
  cargando: boolean;
  noResultado: string | boolean;
}

const ClimaContext = createContext<ClimaContextValue | undefined>(undefined);

export default ClimaContext;
