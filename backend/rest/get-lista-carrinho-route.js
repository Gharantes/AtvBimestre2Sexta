const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.get('/listar-carrinho', (req, res) => {
    const query = `
        SELECT 
            c.id_produto,
            p.nome, 
            p.valor, 
            COUNT(c.id_produto) as qtd,
            SUM(p.valor) as valor_total
        FROM cart c 
        INNER JOIN produto p ON c.id_produto = p.id 
        GROUP by c.id_produto, p.nome, p.valor 
    `
    const stmt = database.prepare(query)
    const result = stmt.all()
    res.status(200).send(result)
})


module.exports = router