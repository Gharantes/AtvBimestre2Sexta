const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')


router.delete('/remove-from-carrinho/:id', (req, res) => {
    const id = Number(req.params.id)
    deleteFromCartByIdProduto(id);
    res.send();
})
function deleteFromCartByIdProduto(id) {
    const query = `
        DELETE FROM cart 
        WHERE 
            id = (
                SELECT MAX(id) FROM CART WHERE id_produto = ?
            )    
        `
    const stmt = database.prepare(query)
    const result = stmt.run(id)
}


module.exports = router