import type { IProduto } from "./IProduto";

export type ProdutoProps = {
  iproduto: IProduto,
  onRemove: () => void;
  onClick: () => void;
  onEdit: () => void;
};