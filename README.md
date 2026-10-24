# Buscador de Clima

Aplicación para **consultar el clima actual de cualquier ciudad** hecha con **React + TypeScript + Vite** y la API de **OpenWeather**. El usuario elige ciudad y país, la app la **geolocaliza** y muestra temperatura, sensación térmica, mínima, máxima, humedad y viento con **iconos SVG propios** y **tema claro/oscuro**.

**Demo:** [clima-app-green-two.vercel.app](https://clima-app-green-two.vercel.app)

![Tech](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tech](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Tech](https://img.shields.io/badge/Vite-3-646CFF?logo=vite)
![Tech](https://img.shields.io/badge/OpenWeather-API-EB6E4B)
![Tech](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint)
![Tech](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier)

---

## Tabla de contenidos

- [Buscador de Clima](#buscador-de-clima)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Requisitos](#requisitos)
    - [Instalación](#instalación)
    - [Variables de entorno](#variables-de-entorno)
    - [Scripts](#scripts)
  - [Uso](#uso)
  - [Cómo funciona](#cómo-funciona)
    - [1. `context/ClimaProvider.tsx`](#1-contextclimaprovidertsx)
    - [2. `hooks/`](#2-hooks)
    - [3. `components/`](#3-components)
    - [4. `index.html` e `index.css`](#4-indexhtml-e-indexcss)
    - [Flujo de la aplicación](#flujo-de-la-aplicación)
  - [Calidad y CI](#calidad-y-ci)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Búsqueda por ciudad y país** (Estados Unidos, México, Argentina, Colombia, Costa Rica, España y Perú).
- **Geocodificación** de la ciudad con la Geocoding API de OpenWeather antes de pedir el clima.
- **Clima actual en unidades métricas y en español**: temperatura, sensación, mínima, máxima, humedad y viento (convertido de m/s a km/h).
- **Iconos SVG animados** según el código de icono de OpenWeather (sol, luna, nubes, lluvia, tormenta, nieve, bruma), distinguiendo día y noche.
- **Estados de la interfaz**: inicial, cargando, éxito y error, con mensajes específicos para "ciudad no encontrada" y errores de red.
- **Cancelación de peticiones**: si se lanza una búsqueda nueva, la anterior se aborta con `AbortController`.
- **Tema claro/oscuro** persistido en `localStorage` y aplicado antes del primer render para evitar parpadeos.
- **Accesibilidad**: `aria-live`, `aria-busy`, `role="switch"` en el selector de tema y soporte de `prefers-reduced-motion`.

---

## Cómo ejecutar el proyecto

### Requisitos

- **Node.js 22 o superior** (`engines` en `package.json`).
- **Yarn** (el repo incluye `yarn.lock` y los hooks de Husky usan `yarn`).
- Una **API key gratuita de [OpenWeather](https://openweathermap.org/api)**.

### Instalación

```bash
yarn install
```

### Variables de entorno

Copia `.env.example` a `.env` y pon tu clave:

```bash
VITE_API_KEY=API KEY
```

| Variable       | Descripción                                                    |
| -------------- | -------------------------------------------------------------- |
| `VITE_API_KEY` | API key de OpenWeather, enviada como `appid` en cada petición. |

> Al ser una variable `VITE_*`, la clave se incluye en el bundle del navegador: usa una clave sin privilegios especiales.

### Scripts

| Comando             | Descripción                                          |
| ------------------- | ---------------------------------------------------- |
| `yarn dev`          | Servidor de desarrollo de Vite.                      |
| `yarn build`        | Compila TypeScript (`tsc -b`) y genera `dist/`.      |
| `yarn preview`      | Sirve localmente el build de producción.             |
| `yarn lint`         | ESLint con 0 warnings permitidos.                    |
| `yarn format:check` | Comprueba el formato con Prettier.                   |
| `yarn format:fix`   | Formatea todo el proyecto con Prettier.              |

---

## Uso

1. Escribe una **ciudad** (por ejemplo, `Buenos Aires`).
2. Elige el **país** en el desplegable.
3. Pulsa **Consultar clima**: el botón se deshabilita hasta que ambos campos estén completos y mientras la consulta está en curso.
4. Usa el **interruptor de la cabecera** para alternar entre tema claro y oscuro.

---

## Cómo funciona

### 1. `context/ClimaProvider.tsx`

Concentra el estado y el acceso a la API:

- **`datosBusqueda`** — actualiza `busqueda` (`ciudad`, `pais`) desde los campos del formulario.
- **`consultarClima`** — aborta la petición previa, llama a `/geo/1.0/direct` para obtener `lat`/`lon` y después a `/data/2.5/weather?units=metric&lang=es`. Si no hay resultados lanza `CiudadNoEncontrada`.
- **`normalizar`** — transforma la respuesta de OpenWeather en el tipo `Clima` (redondea temperaturas, pasa el viento a km/h y capitaliza la descripción).
- **`reiniciar`** — vuelve al estado inicial.
- `estado` es una pequeña máquina de estados: `'inicial' | 'cargando' | 'exito' | 'error'`.

Los tipos (`Busqueda`, `Clima`, `EstadoClima`, `ClimaContextValue`) viven en `context/ClimaContext.ts`.

### 2. `hooks/`

- **`useClima`** — consume `ClimaContext` y lanza un error si se usa fuera de `ClimaProvider`.
- **`useTheme`** — calcula el tema inicial (localStorage o `prefers-color-scheme`), lo sincroniza con `<html data-tema>` y expone `alternarTema`.

### 3. `components/`

- **`AppClima`** — layout de dos columnas; decide qué mostrar en el panel según `estado`.
- **`Formulario`** — campos de ciudad y país (`PAISES`) y botón con spinner.
- **`Resultado`** — tarjeta con el lugar, temperatura y detalles.
- **`WeatherIcon`** — elige el dibujo SVG según los dos primeros caracteres del código (`01`, `02`, `03`/`04`, `09`/`10`, `11`, `13`, `50`) y el sufijo `d`/`n`.
- **`EstadoVacio`**, **`Loading`**, **`ThemeToggle`** — estado inicial/error, indicador de carga y selector de tema.

### 4. `index.html` e `index.css`

`index.html` incluye un pequeño script que lee `clima-tema` y fija `data-tema` antes de que React monte. `index.css` define los _tokens_ de diseño (colores, sombras, radios) como variables CSS para ambos temas.

### Flujo de la aplicación

```
App
 └─ ClimaProvider
      ├─ ThemeToggle → useTheme() → data-tema + localStorage
      └─ AppClima
           ├─ Formulario → datosBusqueda() → submit → consultarClima()
           │                                   ├─ estado = 'cargando'  → <Loading />
           │                                   ├─ GET /geo/1.0/direct  → lat, lon
           │                                   ├─ GET /data/2.5/weather → normalizar()
           │                                   ├─ estado = 'exito'     → <Resultado />
           │                                   └─ estado = 'error'     → <EstadoVacio tipo="error" />
           └─ estado = 'inicial' → <EstadoVacio tipo="inicial" />
```

---

## Calidad y CI

- **Husky + lint-staged**: el _pre-commit_ ejecuta ESLint y Prettier sobre los archivos modificados y después `yarn build`.
- **GitHub Actions** (`.github/workflows/ci.yml`): en cada push o PR a `main` instala dependencias con Node 24 y ejecuta `format:check`, `lint` y `build`.
- `vercel.json` desactiva los despliegues automáticos de Vercel desde Git.

---

## Tecnologías

- **React 18** + **TypeScript** — UI y tipado.
- **Vite** — servidor de desarrollo y build.
- **Fetch API** + **AbortController** — peticiones a OpenWeather.
- **CSS con variables** — temas claro/oscuro, sin framework de estilos.
- **modern-normalize** y **Google Fonts** (Hubballi, Inter) vía CDN.
- **ESLint**, **Prettier**, **Husky**, **lint-staged** — calidad de código.

---

## Estructura del proyecto

```
clima-app/
├── .github/workflows/ci.yml
├── .husky/pre-commit
├── public/
├── src/
│   ├── components/
│   │   ├── AppClima.tsx
│   │   ├── EstadoVacio.tsx
│   │   ├── Formulario.tsx
│   │   ├── Loading.tsx
│   │   ├── Resultado.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WeatherIcon.tsx
│   ├── context/
│   │   ├── ClimaContext.ts      # Tipos + contexto
│   │   └── ClimaProvider.tsx    # Estado y llamadas a OpenWeather
│   ├── hooks/
│   │   ├── useClima.ts
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── index.css                # Tokens de diseño y estilos
│   └── main.tsx
├── .env.example
├── index.html
├── vercel.json
├── vite.config.ts
└── package.json
```

---

## Personalización

| Qué                       | Dónde                                   | Por defecto                     |
| ------------------------- | --------------------------------------- | ------------------------------- |
| Países disponibles        | `PAISES` en `Formulario.tsx`            | 7 países                        |
| URL base de la API        | `API` en `ClimaProvider.tsx`            | `https://api.openweathermap.org` |
| Unidades e idioma         | Query de `climaUrl` (`units`, `lang`)   | `metric`, `es`                  |
| Clave del tema guardado   | `STORAGE_KEY` en `useTheme.ts`          | `clima-tema`                    |
| Colores de cada tema      | Variables CSS en `index.css`            | Azul cielo (`--primario`)       |

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
