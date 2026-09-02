import useClima from '../hooks/useClima';
import WeatherIcon from './WeatherIcon';

const Resultado = () => {
  const { resultado } = useClima();

  if (!resultado) return null;

  const { nombre, pais, temp, sensacion, tempMin, tempMax, humedad, viento, descripcion, icono } =
    resultado;

  return (
    <article className="contenedor tarjeta-clima" key={`${nombre}-${pais}`}>
      <p className="tarjeta-clima__lugar">
        {nombre}
        {pais ? `, ${pais}` : ''}
      </p>

      <div className="tarjeta-clima__principal">
        <WeatherIcon icono={icono} />
        <p className="tarjeta-clima__temp">
          {temp}
          <span>°C</span>
        </p>
      </div>

      {descripcion && <p className="tarjeta-clima__desc">{descripcion}</p>}

      <dl className="tarjeta-clima__detalles">
        <div>
          <dt>Sensación</dt>
          <dd>{sensacion}°</dd>
        </div>
        <div>
          <dt>Mínima</dt>
          <dd>{tempMin}°</dd>
        </div>
        <div>
          <dt>Máxima</dt>
          <dd>{tempMax}°</dd>
        </div>
        <div>
          <dt>Humedad</dt>
          <dd>{humedad}%</dd>
        </div>
        <div>
          <dt>Viento</dt>
          <dd>{viento} km/h</dd>
        </div>
      </dl>
    </article>
  );
};

export default Resultado;
