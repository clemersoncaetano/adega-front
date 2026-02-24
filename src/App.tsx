import { useEffect, useState } from "react";
import "./index.css";
import StatusLoja from "../src/conponents/StatusLoja";


interface Categoria {
  id: number;
  nome: string;
}

interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoriaId: number;
}

export default function App() {

  /* Drinks */
  const drinks: Drink[] = [
    {
      id: 1,
      name: "Mojito",
      description: "Rum, hortelã, limão",
      price: 18.9,
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e",
      categoriaId: 1
    },
    {
      id: 2,
      name: "Suco de Laranja",
      description: "Natural",
      price: 8,
      image: "https://images.unsplash.com/photo-1572441710534-68056d98c6b9",
      categoriaId: 2
    },
    {
      id: 3,
      name: "Gin Tônica",
      description: "Gin + Tônica",
      price: 22,
      image: "https://http2.mlstatic.com/D_Q_NP_852165-MLB74226020637_012024-O.webp",
      categoriaId: 1
    }
  ];

  /* States */
  const [cart, setCart] = useState<Drink[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);

  /* Buscar categorias */
  useEffect(() => {
    fetch("http://localhost:3000/api/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Erro categorias:", err));
  }, []);

  /* Carrinho */
  function addToCart(drink: Drink) {
    setCart([...cart, drink]);
  }

  const total = cart.reduce((s, i) => s + i.price, 0);

  /* Filtro */
  const drinksFiltrados = categoriaSelecionada
    ? drinks.filter(d => d.categoriaId === categoriaSelecionada)
    : drinks;

  return (
    <div className="app">

      {/* Status da loja */}
      <StatusLoja />

      {/* Categorias */}
      <div className="categorias">

        <button
          onClick={() => setCategoriaSelecionada(null)}
          className={!categoriaSelecionada ? "ativo" : ""}
        >
          Todos
        </button>

        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSelecionada(cat.id)}
            className={categoriaSelecionada === cat.id ? "ativo" : ""}
          >
            {cat.nome}
          </button>
        ))}

      </div>

      {/* Lista */}
      <section className="section">

        {drinksFiltrados.map((drink) => (
          <div key={drink.id} className="item">

            <div className="item-info">

              <h3>{drink.name}</h3>
              <p>{drink.description}</p>

              <div className="item-price">

                <strong>R$ {drink.price.toFixed(2)}</strong>

                <button onClick={() => addToCart(drink)}>
                  +
                </button>

              </div>

            </div>

            <img src={drink.image} />

          </div>
        ))}

      </section>

      {/* Carrinho */}
      {cart.length > 0 && (

        <div className="cart-bar">

          <span>🛒 {cart.length} itens</span>

          <strong>R$ {total.toFixed(2)}</strong>

          <button>Ver Carrinho</button>

        </div>
      )}

    </div>
  );
}
