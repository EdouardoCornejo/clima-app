const Loading = () => (
  <div className="loading" role="status" aria-label="Consultando el clima">
    <div className="sk-chase">
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
    </div>
    <p className="loading__texto">Consultando el clima…</p>
  </div>
);

export default Loading;
