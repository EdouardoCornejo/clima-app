interface WeatherIconProps {
  /** Código de icono de OpenWeather, p. ej. "10d" o "01n". */
  icono: string;
  size?: number;
}

const Sol = () => (
  <g className="ic-sol">
    <circle cx="32" cy="32" r="11" fill="var(--sol)" />
    <g stroke="var(--sol)" strokeWidth="3" strokeLinecap="round">
      <line x1="32" y1="8" x2="32" y2="15" />
      <line x1="32" y1="49" x2="32" y2="56" />
      <line x1="8" y1="32" x2="15" y2="32" />
      <line x1="49" y1="32" x2="56" y2="32" />
      <line x1="15" y1="15" x2="20" y2="20" />
      <line x1="44" y1="44" x2="49" y2="49" />
      <line x1="49" y1="15" x2="44" y2="20" />
      <line x1="20" y1="44" x2="15" y2="49" />
    </g>
  </g>
);

const Luna = () => (
  <path className="ic-sol" d="M40 12a20 20 0 1 0 12 36 16 16 0 0 1-12-36z" fill="var(--sol)" />
);

const Nube = ({ y = 0 }: { y?: number }) => (
  <path
    transform={`translate(0 ${y})`}
    d="M22 44a11 11 0 0 1-1-21.9A15 15 0 0 1 49 26a9 9 0 0 1-1 18z"
    fill="var(--nube)"
    stroke="var(--nube-borde)"
    strokeWidth="1.5"
  />
);

const Lluvia = () => (
  <g className="ic-lluvia" stroke="var(--primario)" strokeWidth="3" strokeLinecap="round">
    <line x1="24" y1="48" x2="21" y2="56" />
    <line x1="34" y1="48" x2="31" y2="56" />
    <line x1="44" y1="48" x2="41" y2="56" />
  </g>
);

const Rayo = () => (
  <polygon className="ic-rayo" points="33,42 27,54 33,54 30,62 41,50 34,50" fill="var(--rayo)" />
);

const Nieve = () => (
  <g className="ic-nieve" fill="var(--texto-suave)">
    <circle cx="24" cy="52" r="2.5" />
    <circle cx="34" cy="56" r="2.5" />
    <circle cx="44" cy="52" r="2.5" />
  </g>
);

const Bruma = () => (
  <g stroke="var(--texto-suave)" strokeWidth="3" strokeLinecap="round" className="ic-bruma">
    <line x1="14" y1="26" x2="46" y2="26" />
    <line x1="18" y1="34" x2="50" y2="34" />
    <line x1="14" y1="42" x2="44" y2="42" />
  </g>
);

const contenido = (icono: string) => {
  const grupo = icono.slice(0, 2);
  const esNoche = icono.endsWith('n');

  switch (grupo) {
    case '01':
      return esNoche ? <Luna /> : <Sol />;
    case '02':
      return (
        <>
          {esNoche ? <Luna /> : <Sol />}
          <Nube y={6} />
        </>
      );
    case '03':
    case '04':
      return <Nube />;
    case '09':
    case '10':
      return (
        <>
          <Nube />
          <Lluvia />
        </>
      );
    case '11':
      return (
        <>
          <Nube />
          <Rayo />
        </>
      );
    case '13':
      return (
        <>
          <Nube />
          <Nieve />
        </>
      );
    case '50':
      return <Bruma />;
    default:
      return <Nube />;
  }
};

const WeatherIcon = ({ icono, size = 112 }: WeatherIconProps) => (
  <svg
    className="icono-clima"
    width={size}
    height={size}
    viewBox="0 0 64 64"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    {contenido(icono)}
  </svg>
);

export default WeatherIcon;
