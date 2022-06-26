const express = require("express");
const db = require("./carts-model");
const {checkCustomerID, restrictCustomer } = require("../middleware/customer");
const { checkCompleteCartBody, checkCartEntry } = require("../middleware/cart");
const { checkProductID} = require("../middleware/product");

const router = express.Router();

router.get("/carts", async (req, res, next) => {
    try {
        const carts = await db.getCarts()
        res.json(carts);
    }
    catch(err) {
        next(err)
    }
});

router.get("/carts/customers/:id", checkCustomerID(), restrictCustomer(), async (req, res, next) => {
    try {
        const cart = await db.getCartByCustomerId(req.customer.id);
        res.json(cart);
    }
    catch(err) {
        next(err)
    }
});
//Get single cart entry
router.get("/carts/customers/:id/products/:pid", checkCustomerID(), checkProductID(), async (req, res, next) => {
    try {
        const cartEntry = await db.getCartEntry(req.customer.id, req.params.pid);
        if (cartEntry.length == 0 ) {
            res.status(404).json({
                message: "Cart entry not found"
            });
        } 
        res.json(cartEntry);
    }
    catch(err) {
        next(err)
    }
});
//Create Cart Entry 
//Does create record but creates an error
router.post("/carts/customers", checkCompleteCartBody(), async (req, res, next) => {
    checkCustomerID(req.body.customerID);

    const {productID, customerID} = req.body
    const exists = await db.getCartEntry(productID, customerID);

    if(exists.length > 0) {
        res.status(409).json({
            message: "An account with those credentials already exists",
        });
    }

    try {
        const cartEntry = await db.createCartEntry(req.body);
        res.status(201).json(cartEntry);
    }
    catch(err) {
        console.log(err)
        next(err)
    }
});
//UPDATE quantity from cart entry
//works but gives back an error
router.put("/carts/customers/:id/products/:pid", checkProductID(), checkCustomerID(), async (req, res, next) => {
    try {
        const cartEntry = await db.updateCartEntryQuantity(req.params.id, req.params.pid, req.body)
        res.json(cartEntry);
    }
    catch(err) {
        console.log(err);
        next(err)
    }
});
//Delete single cart entry
router.delete("/carts/customers/:id/products/:pid", checkCustomerID(), checkProductID(), async (req, res, next) => {
    try {
        await db.deleteCartEntry(req.params.id, req.params.pid)
        res.status(200).json({
          message: "Cart Entry has been deleted",
        });
    }
    catch(err) {
        next(err)
    }
});

//Delete whole cart
router.delete("/carts/customers/:id", checkCustomerID(), async (req, res, next) => {
    try {
        await db.deleteCart(req.params.id)
        res.status(200).json({
          message: "Customer Cart",
        });
    }
    catch(err) {
        next(err)
    }
});
module.exports = router;
