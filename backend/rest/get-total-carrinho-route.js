const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.get('/total-carrinho', (req, res) => {
    const query = `
        SELECT SUM(p.valor) as total
        FROM cart c 
        INNER JOIN produto p ON c.id_produto = p.id
    `
    const stmt = database.prepare(query)
    const result = stmt.get()

    res.send(result.total ?? 0)
})


module.exports = router