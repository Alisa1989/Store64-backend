const cartsModel = "../carts/carts-model"

function checkCartEntry() {
    return async (req, res, next) => {
        try{
            const cartEntry = cartsModel.getCartEntry(req.params.customerID, req.params.productID)
            if (cartEntry) {
                req.cartEntry = cartEntry
                next();
            } else {
                res.status(404).json({
                    message: "Cart Entry not found",
                  });
                }
        } catch(err) {
            console.log(error);
            resstatus(500).json({
                message: "Error retrieving the Cart Entry",
            })
        }       
    }
}

function checkCompleteCartBody() {
    return (req, res, next) => {
        if (
            !req.body.customerID ||
            !req.body.productID ||
            !req.body.sellerID 
        ) {
            return res.status(400).json({
                message: "Missing Fields",
            });
        }
        next();
    };
}

module.exports = {
    checkCompleteCartBody,
    checkCartEntry
}