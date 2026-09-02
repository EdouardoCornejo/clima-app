import { useCallback, useEffect, useState } from 'react';

export type Tema = 'light' | 'dark';

const STORAGE_KEY = 'clima-tema';

const esTema = (valor: unknown): valor is Tema => valor === 'light' || valor === 'dark';

const temaInicial = (): Tema => {
  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    if (esTema(guardado)) return guardado;
  } catch {
    // localStorage puede no estar disponible (modo privado, etc.).
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Maneja el tema claro/oscuro: lo sincroniza con <html data-tema> y localStorage. */
const useTheme = () => {
  const [tema, setTema] = useState<Tema>(temaInicial);

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try {
      window.localStorage.setItem(STORAGE_KEY, tema);
    } catch {
      // Sin persistencia: el tema solo dura la sesión.
    }
  }, [tema]);

  const alternarTema = useCallback(() => {
    setTema((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { tema, alternarTema };
};

export default useTheme;
