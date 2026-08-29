import useClima from '../hooks/useClima';

// Grados Kelvin.
const KELVIN = 273.15;

const Resultado = () => {
  const { resultado } = useClima();
  const { name, main } = resultado;

  if (!main) {
    return null;
  }

  return (
    <div className="contenedor clima">
      <h2>El CLima de {name} es: </h2>
      <p>
        {Math.trunc(main.temp - KELVIN)} <span>&#x2103;</span>
      </p>
      <div className="temp_min_max">
        <p>
          Min: {Math.trunc(main.temp_min - KELVIN)} <span>&#x2103;</span>
        </p>
        <p>
          Max: {Math.trunc(main.temp_max - KELVIN)} <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};

export default Resultado;
