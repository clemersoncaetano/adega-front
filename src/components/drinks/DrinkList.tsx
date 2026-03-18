import { useEffect, useState } from "react";
import { api } from "../../api/api";
import"./drinks.css"


interface Drink {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria_id: number;
}

interface Props {
  categoriaSelecionada: number | null;
}

export function DrinkList({ categoriaSelecionada }: Props) {

  const [drinks, setDrinks] = useState<Drink[]>([]);

  async function carregarDrinks() {

    const response = await api.get("/drinks");

    setDrinks(response.data);

  }

  useEffect(() => {
    carregarDrinks();
  }, []);

  const filtrados = categoriaSelecionada
    ? drinks.filter(d => d.categoria_id === categoriaSelecionada)
    : drinks;
  return (
   


    <div className="drinks-lista">

      {filtrados.map((drink) => (

        <div key={drink.id} className="drink-card">
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
  );
}