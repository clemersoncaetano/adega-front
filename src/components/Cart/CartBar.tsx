import type { Drink } from "../../types";
import"./cart.css"
interface Props {
  drinks: Drink[];
}

export function CartBar({ drinks }: Props) {

  const total = drinks.reduce(
    (acc, drink) => acc + Number(drink.preco),
    0
  );

  return (
    <div className="cart-bar">
      Total: R$ {total.toFixed(2)}
    </div>
  );
  
}