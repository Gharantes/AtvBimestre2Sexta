const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')

router.get('/produto/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM produto WHERE id = ?`
    const stmt = database.prepare(query)
    const result = stmt.get(id)
    res.send(result)
})


module.exports = router