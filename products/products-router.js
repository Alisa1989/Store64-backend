const express = require("express");
const db = require("./products-model");
const { checkCompleteBody, checkProductID } = require("../middleware/product");

const router = express.Router();

router.get("/products", async (req, res, next) => {
    try {
        const products = await db.getProducts()
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
        const product = await db.createProduct(req.body)
        res.status(201).json(product);
    }
    catch(err) {
        next(err)
    }
});

router.put("/products/:id", checkCompleteBody(), checkProductID(), async (req, res, next) => {
    try {
        const product = await db.updateProduct(req.params.id, req.body)
        res.json(product);
    }
    catch(err) {
        next(err)
    }
});

router.delete("/products/:id", checkProductID(), async (req, res, next) => {
    try {
        await db.deleteProduct(req.params.id)
        res.status(200).json({
          message: "Product has been deleted",
        });
    }
    catch(err) {
        next(err)
    }
});

module.exports = router;
