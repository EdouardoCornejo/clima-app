import { useCallback, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import ClimaContext from './ClimaContext';
import type { Busqueda, Clima, EstadoClima } from './ClimaContext';

const API = 'https://api.openweathermap.org';
const APP_ID = import.meta.env.VITE_API_KEY;

const BUSQUEDA_INICIAL: Busqueda = { ciudad: '', pais: '' };

interface GeoResultado {
  lat: number;
  lon: number;
}

interface RespuestaClima {
  name: string;
  weather: { id: number; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number };
  sys: { country: string };
}

/** Error de dominio para distinguir "ciudad no encontrada" del resto. */
class CiudadNoEncontrada extends Error {}

const capitalizar = (texto: string) => texto.charAt(0).toLocaleUpperCase('es') + texto.slice(1);

const normalizar = (data: RespuestaClima): Clima => ({
  nombre: data.name,
  pais: data.sys.country,
  temp: Math.round(data.main.temp),
  sensacion: Math.round(data.main.feels_like),
  tempMin: Math.round(data.main.temp_min),
  tempMax: Math.round(data.main.temp_max),
  humedad: data.main.humidity,
  // La API entrega m/s; lo mostramos en km/h.
  viento: Math.round(data.wind.speed * 3.6),
  descripcion: capitalizar(data.weather[0]?.description ?? ''),
  icono: data.weather[0]?.icon ?? '01d',
});

interface ClimaProviderProps {
  children: ReactNode;
}

const ClimaProvider = ({ children }: ClimaProviderProps) => {
  const [busqueda, setBusqueda] = useState<Busqueda>(BUSQUEDA_INICIAL);
  const [estado, setEstado] = useState<EstadoClima>('inicial');
  const [resultado, setResultado] = useState<Clima | null>(null);
  const [error, setError] = useState('');

  // Permite cancelar una consulta anterior si el usuario dispara otra.
  const peticionRef = useRef<AbortController | null>(null);

  const datosBusqueda = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBusqueda((prev) => ({ ...prev, [name]: value }));
  }, []);

  const consultarClima = useCallback(async (datos: Busqueda) => {
    peticionRef.current?.abort();
    const controlador = new AbortController();
    peticionRef.current = controlador;

    setEstado('cargando');
    setError('');
    setResultado(null);

    try {
      const ciudad = encodeURIComponent(datos.ciudad.trim());
      const geoUrl = `${API}/geo/1.0/direct?q=${ciudad},${datos.pais}&limit=1&appid=${APP_ID}`;
      const geoRes = await fetch(geoUrl, { signal: controlador.signal });
      if (!geoRes.ok) throw new Error('Error de red al geolocalizar');

      const geo = (await geoRes.json()) as GeoResultado[];
      if (geo.length === 0) throw new CiudadNoEncontrada();
      const { lat, lon } = geo[0];

      const climaUrl = `${API}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${APP_ID}`;
      const climaRes = await fetch(climaUrl, { signal: controlador.signal });
      if (!climaRes.ok) throw new Error('Error de red al consultar el clima');

      const data = (await climaRes.json()) as RespuestaClima;
      setResultado(normalizar(data));
      setEstado('exito');
    } catch (err) {
      // Una consulta cancelada no es un error para el usuario.
      if (err instanceof DOMException && err.name === 'AbortError') return;

      setError(
        err instanceof CiudadNoEncontrada
          ? 'No encontramos esa ciudad. Revisa el nombre e intenta de nuevo.'
          : 'No pudimos consultar el clima. Vuelve a intentarlo en unos minutos.',
      );
      setEstado('error');
    }
  }, []);

  const reiniciar = useCallback(() => {
    peticionRef.current?.abort();
    setBusqueda(BUSQUEDA_INICIAL);
    setResultado(null);
    setError('');
    setEstado('inicial');
  }, []);

  const value = useMemo(
    () => ({ busqueda, datosBusqueda, consultarClima, reiniciar, resultado, estado, error }),
    [busqueda, datosBusqueda, consultarClima, reiniciar, resultado, estado, error],
  );

  return <ClimaContext.Provider value={value}>{children}</ClimaContext.Provider>;
};

export { ClimaProvider };
