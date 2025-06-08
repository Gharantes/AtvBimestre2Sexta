import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PageListaProdutos from './pages/PageListaProdutos/PageListaProdutos'
import Appbar from './components/Appbar/Appbar'
import Sidebar from './components/Sidebar/Sidebar'
import PageCriarEditarProduto from './pages/PageCriarEditarProduto/PageCriarEditarProduto'
import PageCarrinho from './pages/PageCarrinho/PageCarrinho'

function App() {
  return (
    <BrowserRouter>
      <div id='container'>
        <Appbar></Appbar>
        <div id='sec-container'>
          <Sidebar></Sidebar>
          <Routes>
            <Route path='/' element={<PageListaProdutos />}/>
            <Route path='/produto' element={<PageCriarEditarProduto />}/>
            <Route path='/produto/:id' element={<PageCriarEditarProduto />}/>
            <Route path='/carrinho' element={<PageCarrinho />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
