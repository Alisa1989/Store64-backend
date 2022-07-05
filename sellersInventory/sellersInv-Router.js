const express = require("express");
const db = require("./sellersInv-model");
const p_db = require("../products/products-model");

const router = express.Router();

//get sellersInventory entries
router.get("/sellersInventory", async (req, res, next) => {
    try {
        const entries = await db.getSellersInventoryEntries()
        res.json(entries);
    }
    catch(err) {
        next(err)
    }
});

//get sellersInventory entry
router.get("/sellersInventory/sellers/:id/products/:pid", async (req, res, next) => {
    try {
        const entries = await db.getSellersInventoryEntry(req.params.id, req.params.pid)
        res.json(entries);
    }
    catch(err) {
        next(err)
    }
});

//create sellersInventory entry with existing product
router.post("/sellersInventory/sellers/:id/products/:pid", async (req, res, next) => {
    try {
        const SIEntry = await db.createSellersInventoryEntry(req.params.id, req.params.pid)
        if (SIEntry.length == 0 ) {
            res.status(404).json({
                message: "seller has no such inventory"
            });
        } 
        res.json(SIEntry);
    }
    catch(err) {
        next(err)
    }
})

//create sellersInventory entry with new product
router.post("/sellersInventory/sellers/:id/products", async (req, res, next) => {
    try {
        const product = await p_db.createProduct(req.body)    
        console.log("pid", product.id)
        const SIEntry = await db.createSellersInventoryEntry(req.params.id, product.id)
        if (SIEntry.length == 0 ) {
            res.status(404).json({
                message: "seller has no such inventory"
            });
        } 
        res.json(SIEntry);
    }
    catch(err) {
        next(err)
    }
})

//update sellersInventory entry
//delete sellersInventory entry

module.exports = router;