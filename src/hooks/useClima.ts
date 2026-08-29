import { useContext } from 'react';
import ClimaContext from '../context/ClimaContext';

const useClima = () => {
  const context = useContext(ClimaContext);

  if (!context) {
    throw new Error('useClima debe usarse dentro de un ClimaProvider');
  }

  return context;
};

export default useClima;
