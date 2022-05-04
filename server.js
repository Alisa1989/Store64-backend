const express = require("express")
const db = require("./database")
const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({message: "Hello, World"})
})

server.get("products", (req, res) => {
    const products = db.getProducts()
    res.json(products)
})

server.get("/prioducts/:id", (req, res) => {
    const id = req.params.id
    const product = db.getProductById(id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            message: "Product not found"
        })
    }
})

server.post("products", (req, res) => {
    const newProduct = db.createProduct({
        //TODO
    })
    res.status(201).json(newProduct)
})

server.put("/product/:id", (req,res) => {
    const id = req.params.id
    const product =db.getProductById(id)
    
    if (product) {
        const updatedProduct = db.updateProduct(id, {
            //TODO    
        })
        res.json(updatedProduct)
    }else{
        res.status(404).json({
            message: "Product not found",
        })
    }
})

server.delete ("/product/:id", (req,res) => {
    const id = req.params.id
    const product =db.getProductById(id)
    
    if (product) {
        db.deleteProduct(id)
        res.status(204).end()
    }else{
        res.status(404).json({
            message: "Product not found",
        })
    }
})

server.listen(8080, () => {
    console.log("server started")
})

