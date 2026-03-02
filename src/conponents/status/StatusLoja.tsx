import { useEffect, useState } from "react";

const StatusLoja: React.FC = () => {
  const [aberto, setAberto] = useState<boolean>(false);

  useEffect(() => {
    function verificarHorario(): void {
      const agora: Date = new Date();
      const hora: number = agora.getHours();

      // Horário da loja (ajuste aqui)
      const abre: number = 8;
      const fecha: number = 24;

      if (hora >= abre && hora < fecha) {
        setAberto(true);
      } else {
        setAberto(false);
      }
    }

    verificarHorario();

    // Atualiza a cada 1 minuto
    const timer: number = window.setInterval(verificarHorario, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3
        style={{
          color: aberto ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        ● Loja {aberto ? "Aberta" : "Fechada"}
      </h3>

      {!aberto && (
        <p style={{ color: "red" }}>
          Não é possível concluir o pedido, pois a loja está fechada.
        </p>
      )}
    </div>
  );
};

export default StatusLoja;
