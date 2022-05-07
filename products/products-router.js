const express = require("express")
const db = require("./products-model")

const router = express.Router()

//Added PROMISE.RESOLVE method to make it act like a promise so 
//that when we link the real database we can just subtract it

router.get("/products", (req, res) => {
    Promise.resolve(db.getProducts())
    .then((products) => {
        res.json(products)
    })
    .catch(() => {
        res.status(404).json({
            message: "Products not found"
        })
    })
})

router.get("/products/:id", (req, res) => {
    Promise.resolve(db.getProductById(req.params.id))
        .then((products) => {
            res.json(products)
        })
        .catch(() => {
            res.status(404).json({
                message: "Product not found"
            })
        })
})

router.post("/products", (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.description || !req.body.category || !req.body.image || !req.body.rating) {
        return res.status(400).json({
            message: "Missing Fields"
        });
    }

    Promise.resolve(db.createProduct(req.body))
        .then((product) => {
            res.status(201).json(product)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
              message: "Error adding the product",
            });
          });
    })

router.put("/products/:id", (req,res) => {
    if (!req.body.title || !req.body.price || !req.body.description || !req.body.category || !req.body.image || !req.body.rating) {
        return res.status(400).json({
            message: "Missing Fields"
        });
    }

    Promise.resolve(db.updateProduct(req.params.id, req.body))
        .then((product) => {
            if (product) {
                res.status(200).json(product);
            }else{
                res.status(404).json({
                    message: "Product not found",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
              message: "Error updating the product",
            });
          });
})

router.delete ("/products/:id", (req,res) => {
    Promise.resolve(db.deleteProduct(req.params.id))
    .then(()=> {
        res.status(204).end()
    })
    .catch(()=>{
        res.status(500).json({
            message: "Error removing product",
        })
    })
})

module.exports = router