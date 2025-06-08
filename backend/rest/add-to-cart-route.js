const express = require('express')
const router = express.Router()

const {DatabaseSync} = require('node:sqlite')
const database = new DatabaseSync('./database.db')


router.put('/add-to-cart/:id', (req, res) => {
    const id = Number(req.params.id)
    addToCart(id);
    res.send();
})

function addToCart(id) {
    const query = `INSERT INTO CART (id_produto) VALUES (?);`
    const stmt = database.prepare(query)
    const result = stmt.run(id)
}


module.exports = router