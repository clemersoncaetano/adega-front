import { useState } from "react";
import "./pagamento.css";
import type { CartItem, FormaPagamento } from "../../types";

interface Props {
  itens: CartItem[];
  onVoltar: () => void;
}

const OPCOES_PAGAMENTO: Array<{
  valor: FormaPagamento;
  titulo: string;
  descricao: string;
}> = [
  {
    valor: "pix",
    titulo: "Pix",
    descricao: "Aprovacao rapida e envio do comprovante na hora.",
  },
  {
    valor: "credito",
    titulo: "Cartao de credito",
    descricao: "Pague no credito na retirada ou entrega.",
  },
  {
    valor: "debito",
    titulo: "Cartao de debito",
    descricao: "Pagamento direto no debito.",
  },
  {
    valor: "dinheiro",
    titulo: "Dinheiro",
    descricao: "Leve troco se precisar pagar em especie.",
  },
];

export function PagamentoPage({ itens, onVoltar }: Props) {
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("pix");

  const total = itens.reduce(
    (acc, item) => acc + Number(item.preco) * item.quantidade,
    0,
  );

  const quantidadeItens = itens.reduce(
    (acc, item) => acc + item.quantidade,
    0,
  );

  return (
    <section className="pagamento-pagina" aria-label="Pagamento">
      <div className="pagamento-topo">
        <button type="button" className="pagamento-voltar" onClick={onVoltar}>
          Voltar ao carrinho
        </button>
        <h2 className="pagamento-titulo">Pagamento</h2>
        <p className="pagamento-subtitulo">
          Confira seu pedido e escolha como deseja pagar.
        </p>
      </div>

      <div className="pagamento-grid">
        <div className="pagamento-bloco">
          <h3>Formas de pagamento</h3>
          <div className="pagamento-opcoes">
            {OPCOES_PAGAMENTO.map((opcao) => (
              <label key={opcao.valor} className="pagamento-opcao">
                <input
                  type="radio"
                  name="forma-pagamento"
                  value={opcao.valor}
                  checked={formaPagamento === opcao.valor}
                  onChange={() => setFormaPagamento(opcao.valor)}
                />
                <div>
                  <strong>{opcao.titulo}</strong>
                  <p>{opcao.descricao}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pagamento-bloco pagamento-resumo">
          <h3>Resumo do pedido</h3>
          <p>{quantidadeItens} itens selecionados</p>

          <div className="pagamento-lista">
            {itens.map((item) => (
              <div key={item.id} className="pagamento-item">
                <span>
                  {item.quantidade}x {item.nome}
                </span>
                <strong>
                  R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <div className="pagamento-total">
            <span>Total atual</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>

          <button type="button" className="pagamento-finalizar">
            Confirmar pedido com {OPCOES_PAGAMENTO.find((opcao) => opcao.valor === formaPagamento)?.titulo}
          </button>
        </div>
      </div>
    </section>
  );
}
