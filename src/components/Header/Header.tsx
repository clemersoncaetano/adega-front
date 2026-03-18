import "./header.css";
import { useState } from "react";

export function Header() {
  const [busca, setBusca] = useState("");

  return (
    <header className="header">

    
      <div className="logo">
        Adega City
      </div>

      
      <div className="busca">
        <input
          type="text"
          placeholder="Buscar bebidas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
    </header>
  );
} 