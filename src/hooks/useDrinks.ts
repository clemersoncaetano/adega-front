import { useEffect, useState } from "react";
import { buscarDrinksPorCategoria } from "../api/drinks";
import type { Drink } from "../types";

export function useDrinks(categoriaIds: number[]) {

  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoriaIds.length === 0) {
      setDrinks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all(categoriaIds.map((categoriaId) => buscarDrinksPorCategoria(categoriaId)))
      .then((listas) => setDrinks(listas.flat()))
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [categoriaIds]);

  return { drinks, loading };
}
