import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_PATH } from "../../consts/base-path"
import './style.css'


export default function PageCriarEditarProduto(){
    const [nomeProduto, setNomeProduto] = useState('')
    const [valorProduto, setValorProduto] = useState(0)
    const [estoqueProduto, setEstoqueProduto] = useState(0)

    const navigate = useNavigate()
    const params = useParams()
    
    useEffect(() => {
      if(params.id){
        getProduto()
      }
    }, [])
    

    function getProduto(){
        axios.get(`${BASE_PATH}/produto/${params.id}`).then((response) => {
            setNomeProduto(response.data.nome)
            setValorProduto(response.data.valor)
            setEstoqueProduto(response.data.estoque)
        });
    }

    function buildParams() {
        return {
            nome:nomeProduto, 
            valor:valorProduto,
            estoque:estoqueProduto
        }
    }
    function updateProduto(){
        axios.put(`${BASE_PATH}/update-produto/${params.id}`, buildParams()).then(() => {
            navigate('/')
        }).catch((error) => {
            if (error.response && error.response.status == 400) {
                alert(error.response.data);
            }
        })
    }

    function createProduto(){
        axios.post(`${BASE_PATH}/create-produto`, buildParams()).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    function cancel() {
        navigate('/')
    }
    function save() {
        if(params.id){
            updateProduto()
        } else {
            createProduto()
        }
    }
    return(
        <div id="form-container">
            <div className="input-container">
                <label>Nome do Produto:</label>
                <input 
                    value={nomeProduto} 
                    onChange={(event) => setNomeProduto(event.currentTarget.value)}
                    placeholder="Digite o nome do produto"    
                ></input>
            </div>

            <div className="input-container">
                <label>Valor do Produto:</label>
                <input 
                    value={valorProduto} 
                    type="number"
                    onChange={(event) => setValorProduto(Number(event.currentTarget.value))}
                    placeholder="Digite o valor do produto"    
                ></input>                
            </div>

            <div className="input-container">
                <label>Estoque do Produto:</label>
                <input 
                    value={estoqueProduto} 
                    type="number"
                    onChange={(event) => setEstoqueProduto(Number(event.currentTarget.value))}
                    placeholder="Digite o estoque disponível do produto"    
                ></input>
            </div>

            <div id="button-container">
                <button className="cancel-btn" onClick={() => cancel()}>Cancelar</button>
                <button className="save-btn" onClick={() => save()}>Salvar</button>
            </div>
        </div>
    )
}