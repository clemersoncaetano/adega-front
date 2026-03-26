import { useEffect, useState } from "react";
import { CartBar } from "./components/Cart/CartBar";
import { DrinkList } from "./components/drinks/DrinkList";
import { PagamentoPage } from "./components/pagamento/PagamentoPage";
import CategoriaFiltro from "./components/categorias/CategoriaFiltro";
import "../style.css";
import { Header } from "./components/Header/Header";
import StatusLoja from "./components/status/StatusLoja";
import { useCategorias } from "./hooks/useCategoria";
import type { CartItem, Drink } from "./types";

type Pagina = "cardapio" | "carrinho" | "pagamento";

const ORDEM_CATEGORIAS = [
  "whiskies",
  "energeticos",
  "vodka",
  "gin",
  "cervejas",
  "refrigerantes",
  "sucos",
  "aguas",
];

function normalizarCategoria(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<number | null>(null);
  const [itensCarrinho, setItensCarrinho] = useState<CartItem[]>([]);
  const [paginaAtiva, setPaginaAtiva] = useState<Pagina>(() => {
    if (window.location.hash === "#/pagamento") return "pagamento";
    if (window.location.hash === "#/carrinho") return "carrinho";
    return "cardapio";
  });
  const { categorias } = useCategorias();
  const categoriasOrdenadas = [...categorias].sort((a, b) => {
    const indiceA = ORDEM_CATEGORIAS.indexOf(normalizarCategoria(a.nome));
    const indiceB = ORDEM_CATEGORIAS.indexOf(normalizarCategoria(b.nome));
    const ordemA = indiceA === -1 ? Number.MAX_SAFE_INTEGER : indiceA;
    const ordemB = indiceB === -1 ? Number.MAX_SAFE_INTEGER : indiceB;

    if (ordemA !== ordemB) {
      return ordemA - ordemB;
    }

    return a.nome.localeCompare(b.nome, "pt-BR");
  });

  function adicionarAoCarrinho(drink: Drink) {
    setItensCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === drink.id);

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.id === drink.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...itensAtuais, { ...drink, quantidade: 1 }];
    });
  }

  useEffect(() => {
    function atualizarPagina() {
      if (window.location.hash === "#/pagamento") {
        setPaginaAtiva("pagamento");
        return;
      }

      if (window.location.hash === "#/carrinho") {
        setPaginaAtiva("carrinho");
        return;
      }

      setPaginaAtiva("cardapio");
    }

    window.addEventListener("hashchange", atualizarPagina);
    return () => window.removeEventListener("hashchange", atualizarPagina);
  }, []);

  function aumentarQuantidade(drinkId: number) {
    setItensCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === drinkId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function removerDoCarrinho(drinkId: number) {
    setItensCarrinho((itensAtuais) =>
      itensAtuais
        .map((item) =>
          item.id === drinkId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function irParaCarrinho() {
    window.location.hash = "/carrinho";
  }

  function voltarParaCardapio() {
    window.location.hash = "/";
  }

  function irParaPagamento() {
    if (itensCarrinho.length === 0) return;
    window.location.hash = "/pagamento";
  }

  function voltarParaCarrinho() {
    window.location.hash = "/carrinho";
  }

  const totalItensCarrinho = itensCarrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0,
  );

  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        {paginaAtiva === "cardapio" ? (
          <>
            <StatusLoja />
            <div className="app-toolbar">
              <CategoriaFiltro
                categorias={categoriasOrdenadas}
                categoriaAtiva={categoriaAtiva}
                onSelecionar={setCategoriaAtiva}
              />

              <button
                type="button"
                className="app-cart-button"
                onClick={irParaCarrinho}
              >
                Ver carrinho
                <span className="app-cart-badge">{totalItensCarrinho}</span>
              </button>
            </div>

            <DrinkList
              categorias={categoriasOrdenadas}
              categoriaAtiva={categoriaAtiva}
              onAdicionarAoCarrinho={adicionarAoCarrinho}
            />
          </>
        ) : (
          <>
            {paginaAtiva === "carrinho" ? (
              <CartBar
                itens={itensCarrinho}
                onAdicionar={aumentarQuantidade}
                onRemover={removerDoCarrinho}
                onVoltar={voltarParaCardapio}
                onFazerPedido={irParaPagamento}
              />
            ) : (
              <PagamentoPage
                itens={itensCarrinho}
                onVoltar={voltarParaCarrinho}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
