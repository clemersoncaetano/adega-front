import { useEffect, useState } from "react";
import { buscarCategorias } from "../api/categoria";
import type { Categoria } from "../types";

export function useCategorias() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    buscarCategorias()
      .then(setCategorias)
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  return { categorias, loading };
}