import Formulario from './Formulario';
import Resultado from './Resultado';
import Loading from './Loading';
import EstadoVacio from './EstadoVacio';
import useClima from '../hooks/useClima';

const AppClima = () => {
  const { estado, error } = useClima();

  return (
    <main className="dos-columnas">
      <Formulario />

      <section className="panel-resultado" aria-live="polite" aria-busy={estado === 'cargando'}>
        {estado === 'cargando' && <Loading />}
        {estado === 'exito' && <Resultado />}
        {estado === 'error' && <EstadoVacio tipo="error" mensaje={error} />}
        {estado === 'inicial' && <EstadoVacio tipo="inicial" />}
      </section>
    </main>
  );
};

export default AppClima;
