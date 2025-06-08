import axios from "axios";
import { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { BASE_PATH } from "../../consts/base-path";
import type { ICart } from "../../types/ICart";
import './style.css';


export default function PageCarrinho() {
  const [total, setTotal] = useState<number>(0)  
  const [listaCarrinho, setListaCarrinho] = useState<ICart[]>([])  
  
  const navigate = useNavigate()
    
  useEffect(() => { 
    getData()
  }, [])

  function getData(){
    axios.get(`${BASE_PATH}/listar-carrinho`).then((response) => {
      setListaCarrinho(response.data)
      getTotal()
    })
  }
  function getTotal() {
    axios.get(`${BASE_PATH}/total-carrinho`).then((response) => {
      setTotal(response.data)
      if (total == null) {
        setTotal(0)
      }
    })
  }
  function removeFromCarrinho(idProduto: number) {
    axios.delete(`${BASE_PATH}/remove-from-carrinho/${idProduto}`).then(() => {
      getData()
    })
  }
  function finalizar() { 
    axios.post(`${BASE_PATH}/finalizar-compra`).then(() => {
      navigate('/')
    })
  }


  function renderList(){
    return listaCarrinho.map((item) => 
      <div className="row column-gap-10" key={item.id_produto}>
        <div className="col">
          <div><b>{item.nome}</b></div>
          <div>{item.qtd} x R$ {item.valor} = R$ {item.valor_total}</div>
        </div>
        <div className="row cart-btn-container m-l-auto">
          <button className="remove-from-cart-btn" onClick={() => removeFromCarrinho(item.id_produto)}>
            <FaMinus></FaMinus>
          </button>
        </div>
      </div>
    )
  }
  return (
    <div id="list-container">
      {renderList()}


      <div id="page-carrinho-button-container">
        <div><b>R$ {total}</b></div>
        <button 
          className="finalizar-btn" 
          onClick={() => finalizar()}
          disabled={listaCarrinho.length == 0}
        >Finalizar compra</button>
      </div>
    </div>
  );
}
