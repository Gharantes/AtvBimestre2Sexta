import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Produto from "../../components/Produto/Produto";
import { BASE_PATH } from "../../consts/base-path";
import './style.css';
import type { IProduto } from "../../types/IProduto";


export default function PageListaProdutos() {
  const [listaProduto, setListaProduto] = useState<IProduto[]>([])  
  
  const navigate = useNavigate()
    
  useEffect(() => {
    getData()
  }, [])

  function getData(){
    axios.get(`${BASE_PATH}/listar-produtos`).then((response) => {
      setListaProduto(response.data)
    })
  }
  function addToCart(id:number){
    axios.put(`${BASE_PATH}/add-to-cart/${id}`).then(() => {
      getData();
    })
  }
  function remove(id: number) {
    axios.delete(`${BASE_PATH}/delete-produto/${id}`).then(() => {
      getData();
    })
  }



 
  
  function renderList(){
    return listaProduto.map((item) => 
      <Produto
        key={item.id}
        iproduto={item}
        onRemove={() => remove(item.id)} 
        onClick={() => addToCart(item.id)}
        onEdit={() => navigate(`/produto/${item.id}`) }
      />
    )
  }

  return (
    <div id="list-container">
      {renderList()}
    </div>
  );
}
