import { useEffect, useState } from "react";
import { api } from "../../api/api";

interface Categoria {
  id: number;
  nome: string;
}

interface Props {
  onSelecionar: (id: number | null) => void;
}

export function CategoriaFiltro({ onSelecionar }: Props) {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<number | null>(null);

  async function carregarCategorias() {
    const response = await api.get("api/categorias");
    setCategorias(response.data);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  function selecionar(id: number | null) {
    setCategoriaAtiva(id);
    onSelecionar(id);
  }

  return (
    <div className="categorias">

      <button
        onClick={() => selecionar(null)}
        className={!categoriaAtiva ? "ativo" : ""}
      >
        Todos
      </button>

      {categorias.map(cat => (

        <button
          key={cat.id}
          onClick={() => selecionar(cat.id)}
          className={categoriaAtiva === cat.id ? "ativo" : ""}
        >
          {cat.nome}
        </button>

      ))}

    </div>
  );
}