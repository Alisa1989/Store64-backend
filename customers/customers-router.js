const express = require("express");
const db = require("./customers-model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { checkCompleteCustomerBody, checkCustomerID, restrictCustomer } = require("../middleware/customer");

const router = express.Router();

router.post("/customers/login", async (req, res, next) => {
    try {
        console.log("starting process");
        const { email, password } = req.body
        const customer = await db.getCustomerBy({ email }).first()

		const passwordValid = await bcrypt.compare(password, customer ? customer.password : "")

        if (!customer || !passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
		
		// creates a new session and sends it back to the client
		req.session.customer = customer;
        console.log("req.sess.cus", req.session.customer)
        // creates a token and sends it back to client
        const token = jwt.sign({
            customerID: customer.id,
            firstName: customer.firstName
    }, process.env.JWT_SECRET)

		res.json({
            token: token,
			message: `Welcome ${customer.firstName}!`,
		})
	} catch(err) {
		next(err)
    }
})

router.get("/customers/logout", async (req, res, next) => {
	try {
		// deletes the session on the server-side, so the customer is no longer authenticated
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(200).json("user succesfully logged out")
			}
		})
	} catch (err) {
		next(err)
	}
})

router.get("/customers", restrictCustomer(), async (req, res, next) => {
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
        // const customer = await db.createCustomer(req.body)
        const {email, password} = req.body
        const exists = await db.getCustomerBy({email}).first()

        if(exists) {
            return res.status(409).json({
                message: "An account with this email already exists",
            })
        }
        
        const customer = await db.createCustomer({
            ...req.body, 
            password: await bcrypt.hash(password, 12),
        })

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
