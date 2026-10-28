"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="wrap section directory-page">
      <h1>Não foi possível carregar os dados.</h1>
      <p>
        A consulta está temporariamente indisponível. Tente novamente em
        instantes.
      </p>
      <button type="button" className="button primary" onClick={reset}>
        Tentar novamente
      </button>
    </main>
  );
}
