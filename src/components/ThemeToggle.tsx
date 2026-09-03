import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const { tema, alternarTema } = useTheme();
  const esOscuro = tema === 'dark';

  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={alternarTema}
      role="switch"
      aria-checked={esOscuro}
      aria-label={esOscuro ? 'Activar tema claro' : 'Activar tema oscuro'}
      title={esOscuro ? 'Tema claro' : 'Tema oscuro'}
    >
      <span className="tema-toggle__pista">
        <span className="tema-toggle__perilla" data-oscuro={esOscuro}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
            {esOscuro ? (
              <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            ) : (
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
                <line x1="12" y1="2" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22" y2="12" />
                <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" />
                <line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
                <line x1="19.1" y1="4.9" x2="17.3" y2="6.7" />
                <line x1="6.7" y1="17.3" x2="4.9" y2="19.1" />
              </g>
            )}
          </svg>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
