import useClima from '../hooks/useClima';

const PAISES = [
  { codigo: 'US', nombre: 'Estados Unidos' },
  { codigo: 'MX', nombre: 'México' },
  { codigo: 'AR', nombre: 'Argentina' },
  { codigo: 'CO', nombre: 'Colombia' },
  { codigo: 'CR', nombre: 'Costa Rica' },
  { codigo: 'ES', nombre: 'España' },
  { codigo: 'PE', nombre: 'Perú' },
];

const Formulario = () => {
  const { busqueda, datosBusqueda, consultarClima, estado } = useClima();
  const { ciudad, pais } = busqueda;

  const cargando = estado === 'cargando';
  const completo = ciudad.trim() !== '' && pais !== '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!completo || cargando) return;
    void consultarClima(busqueda);
  };

  return (
    <section className="contenedor tarjeta-formulario">
      <form onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            placeholder="Ej. Buenos Aires"
            autoComplete="address-level2"
            value={ciudad}
            onChange={datosBusqueda}
            disabled={cargando}
          />
        </div>

        <div className="campo">
          <label htmlFor="pais">País</label>
          <select id="pais" name="pais" value={pais} onChange={datosBusqueda} disabled={cargando}>
            <option value="">Selecciona un país</option>
            {PAISES.map((p) => (
              <option key={p.codigo} value={p.codigo}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <p className="pista" aria-live="polite">
          {completo ? ' ' : 'Completa la ciudad y el país para consultar el clima.'}
        </p>

        <button type="submit" className="boton-enviar" disabled={!completo || cargando}>
          {cargando ? (
            <>
              <span className="boton-spinner" aria-hidden="true" />
              Consultando…
            </>
          ) : (
            'Consultar clima'
          )}
        </button>
      </form>
    </section>
  );
};

export default Formulario;
