const express = require('express')
const cors = require('cors')
const {DatabaseSync} = require('node:sqlite')
const { createTables } = require('./functions/create-tables')
const port = 3000

const deleteProdutoRoute = require('./rest/delete-produto-route')
const getListaProdutosRoute = require('./rest/get-lista-produtos-route')
const getListaCarrinhoRoute = require('./rest/get-lista-carrinho-route')
const getProdutoByIdRoute = require('./rest/get-produto-by-id-route')
const insertProdutoRoute = require('./rest/insert-produto-route')
const updateProdutoRoute = require('./rest/update-produto-route')
const addToCartRoute = require('./rest/add-to-cart-route')
const removeFromCarrinhoRoute = require('./rest/remove-from-carrinho-route')
const getTotalCarrinhoRoute = require('./rest/get-total-carrinho-route.js')
const finalizarCompraRoute = require('./rest/finalizar-compra-route.js')

const database = new DatabaseSync('./database.db')

const app = express()

app.use(express.json())
app.use(cors())


app.use(deleteProdutoRoute);
app.use(getListaProdutosRoute);
app.use(getProdutoByIdRoute);
app.use(insertProdutoRoute);
app.use(updateProdutoRoute);
app.use(addToCartRoute);
app.use(getListaCarrinhoRoute);
app.use(removeFromCarrinhoRoute);
app.use(getTotalCarrinhoRoute);
app.use(finalizarCompraRoute);

app.listen(port, () => {
    createTables(database);
})