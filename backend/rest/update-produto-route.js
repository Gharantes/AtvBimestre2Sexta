const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.put('/update-produto/:id', (req, res) => {
    const {nome, valor, estoque} = req.body
    const id = Number(req.params.id)

    const qtdCarrinho = getQtdInCarrinho(id);
    if (qtdCarrinho != null && qtdCarrinho != undefined) {
        if (estoque < qtdCarrinho) {
            return res.status(400).send(
                'Não é permitido atualizar produto com menos estoque que a quantidade em carrinho.'
            )
        }
    }

    const query = `
        UPDATE produto SET 
            nome = ?, 
            valor = ?, 
            estoque = ?
        WHERE 
            id = ?
    `
    const stmt = database.prepare(query)
    const result = stmt.run(nome, valor, estoque, id)
    res.send()
})

function getQtdInCarrinho(idProduto) {
    const query = `
        SELECT COUNT(1) as qtd FROM cart where id_produto = ?
    `
    const stmt = database.prepare(query);
    const result = stmt.get(idProduto);
    return result?.qtd;
}
module.exports = router