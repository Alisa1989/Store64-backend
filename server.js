const express = require("express");
const productsRouter = require("./products/products-router")

const server = express();

server.use(express.json())
server.use(productsRouter)

server.get("/", (req, res) => {
    res.json({message: "Store64 API"})
})

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong, please try again later"
    })
})

module.exports = server
