import { useEffect, useState } from "react";
import type { Categoria } from "../../types";
import"./categorias.css"
import { buscarCategorias } from "../../api/categoria";
export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregar() {
      const data = await buscarCategorias();
      setCategorias(data);
    }

    carregar();
  }, []);

  return (
    <div>
      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>{cat.nome}</li>
        ))}
      </ul>
    </div>
  );
}