import"./status.css"
function StatusLoja() {
  const agora = new Date();
  const hora = agora.getHours();

  const aberto = hora >= 0 && hora < 24;

  return (
    <div>
      <h2>Status da loja:</h2>

      {aberto ? (
        <p style={{ color: "green" }}>🟢 Loja aberta</p>
      ) : (
        <p style={{ color: "red" }}>🔴 Loja fechada</p>
      )}
    </div>
  );
}

export default StatusLoja;