const express = require("express");
const productsRouter = require("./products/products-router")

const server = express();

server.use(express.json())
server.use(productsRouter)

server.get("/", (req, res) => {
    res.json({message: "Store64 API"})
})

module.exports = server
