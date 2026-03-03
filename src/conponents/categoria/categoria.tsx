import { useEffect, useState } from "react";
import "./categoria.css";
import { api } from "../../api/api";

interface Categoria {
  id: number;
  nome: string;
}

export function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState("");

 
  async function carregarCategorias() {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (err) {
      console.error("Erro ao buscar categorias", err);
    }
  }

 
  async function salvarCategoria(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) return;

    try {
      await api.post("/categorias", { nome });

      setNome("");
      carregarCategorias();
    } catch (err) {
      console.error("Erro ao salvar categoria", err);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="categorias-container">
      <h2>Categorias</h2>

      <form onSubmit={salvarCategoria} className="categorias-form">
        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>

      <ul className="categorias-lista">
        {categorias.map((cat) => (
          <li key={cat.id}>{cat.nome}</li>
        ))}
      </ul>
    </div>
  );
}