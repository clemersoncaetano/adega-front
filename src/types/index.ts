
export interface Categoria {
  id: number;
  nome: string;
}

export interface Drink {
  toFixed(arg0: number): import("react").ReactNode;
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria_id: number;
}
export interface Drink {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

export interface ItemPedido {
  id: string;
  quantidade: number;
}

export type FormaPagamento = "pix" | "credito" | "debito" | "dinheiro";

export type StatusPagamento = "pendente" | "aprovado" | "recusado" | "cancelado";

export interface PagamentoPedido {
  forma: FormaPagamento;
  status: StatusPagamento;
  valor: number;
  trocoPara?: number;
  codigoPix?: string;
  transacaoId?: string;
}

export interface Pedido {
  id: string;
  itens: ItemPedido[];
  pagamento: PagamentoPedido;
  total: number;
  status: string;
  criadoEm: Date;
}
