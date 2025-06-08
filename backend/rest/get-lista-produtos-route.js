const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.get('/listar-produtos', (req, res) => {
    const query = `
        SELECT 
            p.id,
            p.nome, 
            p.valor, 
            p.estoque - COUNT(c.id_produto) as estoque
        FROM produto p 
        LEFT JOIN cart c ON c.id_produto = p.id 
        GROUP by p.id, p.nome, p.valor, p.estoque 
    `
    const stmt = database.prepare(query)
    const result = stmt.all()
    res.status(200).send(result)
})


module.exports = router