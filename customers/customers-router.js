const express = require("express");
const db = require("./customers-model");
const { checkCompleteCustomerBody, checkCustomerID } = require("../middleware/customer");

const router = express.Router();

router.get("/customers", async (req, res, next) => {
    try {
        const customers = await db.getCustomers()
        res.json(customers);
    }
    catch(err) {
        next(err)
    }
});

router.get("/customers/:id", checkCustomerID(), async (req, res, next) => {
    try {
        res.json(req.customer);
    }
    catch(err) {
        next(err)
    }
});

router.post("/customers", checkCompleteCustomerBody(), async (req, res, next) => {
    try {
        const customer = await db.createCustomer(req.body)
        res.status(201).json(customer);
    }
    catch(err) {
        next(err)
    }
});

router.put("/customers/:id", checkCompleteCustomerBody(), checkCustomerID(), async (req, res, next) => {
    try {
        const customer = await db.updateCustomer(req.params.id, req.body)
        res.json(customer);
    }
    catch(err) {
        next(err)
    }
});

router.delete("/customers/:id", checkCustomerID(), async (req, res, next) => {
    res.status(500).json({
        message: "Customers cannot be deleted",
    });
});

module.exports = router;
