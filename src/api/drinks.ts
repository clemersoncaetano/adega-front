import { api } from "./api";
import type { Drink } from "../types";

export async function buscarDrinksPorCategoria(
  categoriaId: number,
): Promise<Drink[]> {
  const response = await api.get("/drinks", {
    params: { categoria_id: categoriaId },
  });

  return response.data;
}
