import type { Categoria } from "../../types";
import "./categorias.css";

type Props = {
  categorias: Categoria[];
  categoriaAtiva: number | null;
  onSelecionar?: (id: number | null) => void;
};

export default function CategoriaFiltro({
  categorias,
  categoriaAtiva,
  onSelecionar,
}: Props) {
  return (
    <div className="categorias">
      <select
        className="categorias-select"
        aria-label="Selecionar categoria"
        value={categoriaAtiva ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          onSelecionar?.(value ? Number(value) : null);
        }}
      >
        <option value="">Todos os drinks</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
