import { FaRegTrashAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";


import './style.css'
import type { ProdutoProps } from "../../types/ProdutoProps";

export default function Produto({
  iproduto,
  onClick, 
  onRemove,
  onEdit
}: ProdutoProps) {
  return (
    <div id="produto-container">
      <div className="label block1">
        <b>{ iproduto.nome }</b>
      </div>

      <div className="row col-gap-10 block2">
        <div className="label">
          <b>Valor:</b>
          R$ { iproduto.valor }
        </div>

        <div className="label">
          <b>Qtd. em Estoque:</b>
          { iproduto.estoque }
        </div>
      </div>

      <div className="block3">
        <button className="add-to-cart" onClick={onClick} disabled={iproduto.estoque <= 0}>
          <FaCartPlus></FaCartPlus>
        </button>

        <button className="delete-produto" onClick={onRemove}>
          <FaRegTrashAlt></FaRegTrashAlt>
        </button>

        <button className="edit-produto" onClick={onEdit}>
          <FaPen></FaPen>
        </button>
      </div>
    </div>
  );
}
