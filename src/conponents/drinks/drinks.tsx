import { useEffect, useState } from "react";
import axios from "axios";
import "./drinks.css";

interface Drink {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  categoria_id: number;
}

export function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);

  async function carregarDrinks() {
    try {
      const response = await axios.get("http://localhost:3333/drinks");

      setDrinks(response.data);

    } catch (error) {
      console.error("Erro ao buscar drinks", error);
    }
  }

  useEffect(() => {
    carregarDrinks();
  }, []);

  // Filtro por categoria
  const drinksFiltrados = categoriaSelecionada
    ? drinks.filter(d => d.categoria_id === categoriaSelecionada)
    : drinks;

  return (
    <div className="drinks-container">

      {/* FILTRO */}
      <div className="filtro-categorias">

        <button onClick={() => setCategoriaSelecionada(null)}>
          Todos
        </button>

        <button onClick={() => setCategoriaSelecionada(1)}>
          Whiskies
        </button>

        <button onClick={() => setCategoriaSelecionada(2)}>
          Energéticos
        </button>

      </div>

      {/* LISTA */}
      <div className="drinks-lista">

        {drinksFiltrados.map((drink) => (

          <div key={drink.id} className="drink-card">

            <img
              src={
                drink.imagem
                  ? drink.imagem
                  : "/sem-imagem.png"
              }
              alt={drink.nome}
            />

            <div className="drink-info">

              <h3>{drink.nome}</h3>

              <p>{drink.descricao}</p>

              <strong>
                R$ {Number(drink.preco).toFixed(2)}
              </strong>

              <button>+</button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}