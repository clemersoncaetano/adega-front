import { useState } from "react";
import StatusLoja from "./components/status/StatusLoja";
import { Header } from "./components/Header/Header";
import Categorias from "./components/categorias/categorias";
import { CategoriaFiltro } from "./components/categorias/CategoriaFiltro";
import { DrinkList } from "./components/drinks/DrinkList";
function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);

  // adicionar ao carrinho

  return (
    <div className="app">
      <StatusLoja />
      <Header />

      {/* categorias */}
      <Categorias />

      {/* filtro */}
      <CategoriaFiltro onSelecionar={setCategoriaSelecionada} />

      {/* lista de drinks */}
      <DrinkList
        categoriaSelecionada={categoriaSelecionada}
      />
    </div>
  );
}

export default App;