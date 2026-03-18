export async function buscarDrinks() {
  const res = await fetch("http://localhost:3000/api/drinks");

  if (!res.ok) {
    throw new Error("Erro ao buscar drinks");
  }

  return res.json();
}