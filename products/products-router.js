const express = require("express");
const db = require("./products-model");
const { checkCompleteBody, checkProductID } = require("../middleware/product");

const router = express.Router();

//Added PROMISE.RESOLVE method to make it act like a promise so
//that when we link the real database we can just subtract it

router.get("/products", async (req, res, next) => {
    try {
        const products = await Promise.resolve(db.getProducts())
        res.json(products);
    }
    catch(err) {
        next(err)
    }
});

router.get("/products/:id", checkProductID(), async (req, res) => {
    try {
        res.json(req.product);
    }
    catch(err) {
        next(err)
    }
});

router.post("/products", checkCompleteBody(), async (req, res, next) => {
    try {
        const product = await Promise.resolve(db.createProduct(req.body))
        res.status(201).json(product);
    }
    catch(err) {
        next(err)
    }
});

router.put("/products/:id", checkCompleteBody(), checkProductID(), async (req, res, next) => {
    try {
        const product = await Promise.resolve(db.updateProduct(req.params.id, req.body))
        res.json(product);
    }
    catch(err) {
        next(err)
    }
});

router.delete("/products/:id", checkProductID(), async (req, res, next) => {
    try {
        await Promise.resolve(db.deleteProduct(req.params.id))
        res.status(200).json({
          message: "Product has been deleted",
        });
    }
    catch(err) {
        next(err)
    }
});

module.exports = router;
