interface EstadoVacioProps {
  tipo: 'inicial' | 'error';
  mensaje?: string;
}

const EstadoVacio = ({ tipo, mensaje }: EstadoVacioProps) => {
  const esError = tipo === 'error';

  return (
    <div className={`estado-vacio${esError ? ' estado-vacio--error' : ''}`}>
      <svg viewBox="0 0 64 64" width="88" height="88" aria-hidden="true" focusable="false">
        {esError ? (
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <circle cx="32" cy="32" r="20" />
            <line x1="32" y1="22" x2="32" y2="34" />
            <line x1="32" y1="42" x2="32" y2="42" />
          </g>
        ) : (
          <g>
            <path
              d="M22 42a11 11 0 0 1-1-21.9A15 15 0 0 1 49 24a9 9 0 0 1-1 18z"
              fill="var(--nube)"
              stroke="var(--nube-borde)"
              strokeWidth="1.5"
            />
            <circle cx="46" cy="20" r="7" fill="var(--sol)" />
          </g>
        )}
      </svg>
      <p>
        {mensaje ??
          (esError ? 'Algo salió mal.' : 'El clima se mostrará aquí en cuanto hagas una búsqueda.')}
      </p>
    </div>
  );
};

export default EstadoVacio;
