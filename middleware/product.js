const productsModel = require("../products/products-model");

function checkProductID() {
  return async (req, res, next) => {
      try {
        const product = await Promise.resolve(productsModel.getProductById(req.params.id))
        if (product) {
          req.product = product;
          next();
        } else {
          res.status(404).json({
            message: "Product not found",
          });
        }
    } catch(err) {
        console.log(error);
        resstatus(500).json({
          message: "Error retrieving the product",
        })
    }        
  };
}

function checkCompleteBody() {
  return (req, res, next) => {
    if (
      !req.body.title ||
      !req.body.price ||
      !req.body.description ||
      !req.body.category ||
      !req.body.image ||
      !req.body.rating
    ) {
      return res.status(400).json({
        message: "Missing Fields",
      });
    }
    next();
  };
}

module.exports = {
  checkProductID,
  checkCompleteBody,
};
