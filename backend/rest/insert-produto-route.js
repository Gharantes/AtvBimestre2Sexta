const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.post('/create-produto', (req, res) => {
    const { nome, valor, estoque } = req.body
    const query = `INSERT INTO produto (nome, valor, estoque) VALUES (?, ?, ?)`
    const stmt = database.prepare(query)
    const result = stmt.run(nome, valor, estoque)
    res.status(200).send()
})


module.exports = router