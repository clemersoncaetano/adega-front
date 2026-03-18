import { useEffect, useState } from "react";
import { buscarDrinks } from "../api/drinks";
import type { Drink } from "../types";
export function useDrinks() {

  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    buscarDrinks()
      .then(setDrinks)
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  return { drinks, loading };
}