import { useState, useEffect } from 'react';

interface ResultadoFetch<T> {
  data: T | null;
  cargando: boolean;
  error: string | null;
}

function useFetch<T>(url: string): ResultadoFetch<T> {
  const [data, setData] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((respuesta) => {
        setData(respuesta);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [url]);

  return { data, cargando, error };
}

export default useFetch;
