import { Navigate, useNavigate } from 'react-router';
import './style.css'


export default function Sidebar() {
  const navigate = useNavigate();
    
  return (
    <div id='sidebar'>
        <p onClick={() => navigate('/')}>Lista de Produtos</p>
        
        <p onClick={() => navigate('/produto')}>Criar Produto</p>

        <p onClick={() => navigate('/carrinho')}>Carrinho</p>

    </div>
  );
}