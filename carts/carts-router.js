const express = require("express");
const db = require("./carts-model");
const {checkCustomerID, restrictCustomer } = require("../middleware/customer");

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

router.get("/carts/customers/:id", checkCustomerID(), async (req, res, next) => {
    try {
        const cart = await db.getCartByCustomerId(req.customer.id);
        res.json(cart);
    }
    catch(err) {
        next(err)
    }
});
//Create Cart Entry 
router.post("/carts/customers/:id", checkCompleteCartBody(), checkCustomerID(), async (req, res, next) => {
    try {
        const cartEntry = await db.getCartEntry(req.params.customerID, req.params.productID)
        res.status(201).json(cartEntry);
    }
    catch(err) {
        next(err)
    }
});

// router.put("/customers/:id", checkCompleteCustomerBody(), checkCustomerID(), async (req, res, next) => {
//     try {
//         const customer = await db.updateCustomer(req.params.id, req.body)
//         res.json(customer);
//     }
//     catch(err) {
//         next(err)
//     }
// });

// router.delete("/customers/:id", checkCustomerID(), async (req, res, next) => {
//     res.status(500).json({
//         message: "Customers cannot be deleted",
//     });
// });

module.exports = router;
