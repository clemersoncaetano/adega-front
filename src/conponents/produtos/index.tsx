import { useEffect, useState } from "react";;
import "./produtos.css";
import { api } from "../../api/api";

interface Categoria {
  id: number;
  nome: string;
}

interface Drink {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  categoria_id: number;
}

export function Produtos() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<number | null>(null);

  /* Buscar categorias */
  async function carregarCategorias() {
    const res = await api.get("/categorias");
    setCategorias(res.data);
  }

  /* Buscar drinks */
  async function carregarDrinks() {
    const res = await api.get("/drinks");
    setDrinks(res.data);
  }

  useEffect(() => {
    carregarCategorias();
    carregarDrinks();
  }, []);

  /* Filtro */
  const drinksFiltrados = categoriaAtiva
    ? drinks.filter((d) => d.categoria_id === categoriaAtiva)
    : drinks;

  return (
    <div className="produtos-container">

      {/* CATEGORIAS */}
      <div className="categorias-bar">

        <button
          className={!categoriaAtiva ? "ativo" : ""}
          onClick={() => setCategoriaAtiva(null)}
        >
          Todos
        </button>

        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={categoriaAtiva === cat.id ? "ativo" : ""}
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      {/* DRINKS */}
      <div className="lista-produtos">

        {drinksFiltrados.map((drink) => (
          <div key={drink.id} className="card-produto">

            <div className="info">
              <h3>{drink.nome}</h3>
              <p>{drink.descricao}</p>
              <strong>R$ {drink.preco.toFixed(2)}</strong>
            </div>

            <div className="imagem">
              <img
                src={drink.imagem || "/sem-imagem.png"}
                alt={drink.nome}
              />
            </div>

            <button className="btn-add">+</button>

          </div>
        ))}

      </div>

    </div>
  );
}