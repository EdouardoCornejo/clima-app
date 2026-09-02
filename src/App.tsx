import AppClima from './components/AppClima';
import ThemeToggle from './components/ThemeToggle';
import { ClimaProvider } from './context/ClimaProvider';

function App() {
  return (
    <ClimaProvider>
      <div className="app">
        <header className="cabecera">
          <div className="cabecera__contenido">
            <h1>Buscador de Clima</h1>
            <ThemeToggle />
          </div>
        </header>
        <AppClima />
      </div>
    </ClimaProvider>
  );
}

export default App;
