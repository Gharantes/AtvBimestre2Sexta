const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')


router.delete('/delete-produto/:id', (req, res) => {
    const id = Number(req.params.id)

    deleteProduto(id);
    deleteCartByIdProduto(id);

    res.send();
})

function deleteProduto(id) {
    const query = `
        DELETE FROM produto WHERE id = ?
    `
    const stmt = database.prepare(query)
    const result = stmt.run(id)
}
function deleteCartByIdProduto(id) {
    const query = `
        DELETE FROM cart WHERE id_produto = ?
    `
    const stmt = database.prepare(query)
    const result = stmt.run(id)
}


module.exports = router