const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.post('/finalizar-compra', (req, res) => {
    removeEstoque();
    deleteCart();

    res.send()
})
function removeEstoque() {
    const query = `
        UPDATE produto   
        SET estoque = estoque - (
            SELECT COUNT(1) FROM cart where cart.id_produto = produto.id 
        )
        WHERE produto.id IN (SELECT id_produto FROM cart)
    `
    const smt = database.prepare(query);
    smt.run();
}
function deleteCart() {
    const query = `DELETE FROM cart`
    const smt = database.prepare(query);
    smt.run();
}
module.exports = router