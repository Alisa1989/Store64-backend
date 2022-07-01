const express = require("express");
const db = require("./sellers-model");
const bcrypt = require("bcryptjs");
const { checkCompleteSellerBody, checkSellerID, restrictSeller } = require("../middleware/seller");

const router = express.Router();

//login seller
router.post("/sellers/login"), async ( req, res, next ) => {
    try {
        const { email, password } = req.body
        const seller = await db.getSellerBy({ email}).first()

        const passwordValid = await bcrypt.compare(password, seller ? seller.password : "")

        if (!seller || !passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

        // creates a new session and sends it back to the client
		req.session.seller = seller

        res.json({
			message: `Welcome ${seller.companyName}!`,
            seller
		})
    }
    catch( err ) {
        next( err )
    }
}

//logout seller
router.get("/sellers/logout", async (req, res, next) => {
	try {
		// deletes the session on the server-side, so the seller is no longer authenticated
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

//get sellers
router.get("/sellers", async ( req, res, next ) => {
    try {
        const sellers = await db.getSellers()
        res.json( sellers )
    } 
    catch( err ) {
        next( err )
    }
})

//get seller
router.get("/sellers/:id", checkSellerID(), async ( req, res, next ) => {
    try {
        res.json( req.seller )
    }
    catch {
        next( err )
    }
})

//get sellers products
router.get("/sellers/:id/products", checkSellerID(), async ( req, res, next ) => {
    try {
        console.log("seller", req.seller)
        const products = await db.getSellersProducts(req.seller.id)
        res.json(products)
    }
    catch {
        next(err)
    }
})

//create seller
router.post("/sellers", checkCompleteSellerBody(), async( req, res, next ) => {
    try {
        const { email, password } = req.body 
        const exists = await db.getSellerByFilter({email}).first()

        if ( exists ) {
            return res.statues(409).json({
                message: "An account with this email already exists"
            })
        }

        const seller = await db.createSeller({
            ...req.body,
            password: await bcrypt.hash(password, 12),
        })

        res.status(201).json( seller )
    }
    catch( err ) {
        next( err )
    }
})

//add product to sellersInventory


//update seller
router.put("/sellers/:id", checkCompleteSellerBody(), checkSellerID(), async (req, res, next) => {
    try {
        const seller = await db.updateSeller( req.params.id, req.body )
        res.json(seller);
    }
    catch( err ) {
        next( err )
    }
})

//delete seller
router.delete("/sellers/:id", async ( req, res, next)=> {
    res.status(500).json({
        message: "Sellers cannot be deleted",
    });
} )

module.exports = router;
