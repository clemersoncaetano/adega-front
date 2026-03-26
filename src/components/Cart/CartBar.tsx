import type { CartItem } from "../../types";
import "./cart.css";

interface Props {
  itens: CartItem[];
  onAdicionar: (drinkId: number) => void;
  onRemover: (drinkId: number) => void;
  onVoltar: () => void;
  onFazerPedido: () => void;
}

export function CartBar({
  itens,
  onAdicionar,
  onRemover,
  onVoltar,
  onFazerPedido,
}: Props) {
  const total = itens.reduce(
    (acc, item) => acc + Number(item.preco) * item.quantidade,
    0,
  );
  const quantidadeItens = itens.reduce(
    (acc, item) => acc + item.quantidade,
    0,
  );

  return (
    <section className="carrinho-pagina" aria-label="Carrinho">
      <div className="carrinho-topo">
        <button type="button" className="carrinho-voltar" onClick={onVoltar}>
          Voltar ao cardapio
        </button>
        <h2 className="carrinho-titulo">Seu carrinho</h2>
        <p className="carrinho-subtitulo">
          {quantidadeItens} {quantidadeItens === 1 ? "item" : "itens"} no
          pedido
        </p>
      </div>

      <div className="carrinho-resumo">
        <span>Total atual</span>
        <strong>R$ {total.toFixed(2)}</strong>
      </div>

      {itens.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Nenhum drink adicionado ainda.</p>
          <button type="button" className="carrinho-voltar" onClick={onVoltar}>
            Escolher drinks
          </button>
        </div>
      ) : (
        <div className="carrinho-lista">
          {itens.map((item) => (
            <div key={item.id} className="carrinho-item">
              <div className="carrinho-item-info">
                <strong>{item.nome}</strong>
                <span>R$ {Number(item.preco).toFixed(2)}</span>
              </div>

              <div className="carrinho-controles">
                <button
                  type="button"
                  onClick={() => onRemover(item.id)}
                  aria-label={`Remover uma unidade de ${item.nome}`}
                >
                  -
                </button>
                <span>{item.quantidade}</span>
                <button
                  type="button"
                  onClick={() => onAdicionar(item.id)}
                  aria-label={`Adicionar mais uma unidade de ${item.nome}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {itens.length > 0 && (
        <div className="total">
          <div>
            <span>Fazer pedido</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
          <button
            type="button"
            className="carrinho-fechar"
            onClick={onFazerPedido}
          >
            Ir para pagamento
          </button>
        </div>
      )}
    </section>
  );
}
