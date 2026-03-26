import { useEffect, useState } from "react";
import { buscarDrinksPorCategoria } from "../../api/drinks";
import "./drinks.css";
import type { Categoria, Drink } from "../../types";

interface Props {
  categorias: Categoria[];
  categoriaAtiva: number | null;
  onAdicionarAoCarrinho: (drink: Drink) => void;
}

export function DrinkList({
  categorias,
  categoriaAtiva,
  onAdicionarAoCarrinho,
}: Props) {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarDrinks() {
    try {
      setLoading(true);
      const drinksPorCategoria = await Promise.all(
        categorias.map((categoria) => buscarDrinksPorCategoria(categoria.id)),
      );
      setDrinks(drinksPorCategoria.flat());
    } catch (error) {
      console.error("Erro ao buscar drinks:", error);
      setDrinks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categorias.length === 0) {
      setDrinks([]);
      setLoading(false);
      return;
    }

    carregarDrinks();
  }, [categorias]);

  const categoriasOrdenadas = categorias
    .map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      lista: drinks.filter((drink) => drink.categoria_id === categoria.id),
    }))
    .filter((categoria) =>
      categoriaAtiva === null ? true : categoria.id === categoriaAtiva,
    )
    .filter((categoria) => categoria.lista.length > 0);

  return (
    <div className="drinks-lista">
      {loading && <p>Carregando drinks...</p>}

      {!loading &&
        categoriasOrdenadas.map((categoria) => {
          return (
            <div
              key={categoria.id}
              data-categoria={categoria.id}
              className="categoria"
            >
              <h6 className="categoria-titulo">{categoria.nome}</h6>

              {categoria.lista.map((drink) => (
                <div key={drink.id} className="drink-card">
                  <div className="drink-info">
                    <h3>{drink.nome}</h3>
                    <p>{drink.descricao}</p>
                    <strong>R$ {Number(drink.preco).toFixed(2)}</strong>
                    <button
                      type="button"
                      onClick={() => onAdicionarAoCarrinho(drink)}
                      aria-label={`Adicionar ${drink.nome} ao carrinho`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}
