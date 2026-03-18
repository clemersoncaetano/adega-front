import type { Categoria } from "../types";

export async function buscarCategorias(): Promise<Categoria[]> {
  const res = await fetch("http://localhost:3000/api/categorias");

  if (!res.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return res.json();
}