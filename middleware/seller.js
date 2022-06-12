const sellerModel = require("../sellers/sellers-model");
const bcrypt = require("bcryptjs");

function checkSellerID(passedID) {
  return async (req, res, next) => {
    try {
      const seller = await sellerModel.getSellerByID(passedID || req.params.id);
      if (seller) {
        req.seller = seller;
        next();
      } else {
        res.status(404).json({
          message: "Seller not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error retrieving the Seller",
      });
    }
  };
}

function checkCompleteSellerBody() {
  return (req, res, next) => {
    if (!req.body.email || !req.body.companyName) {
      return res.status(400).json({
        message: "Missing Fields",
      });
    }
    next();
  };
}

function restrictSeller() {
  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.seller) {
        return res.status(403).json({
          message: "You don't have access",
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  checkSellerID,
  checkCompleteSellerBody,
  restrictSeller,
};
