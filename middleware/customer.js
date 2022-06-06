const customersModel = require("../customers/customers-model");
const bcrypt = require("bcryptjs")


function checkCustomerID(passedID) {
  return async (req, res, next) => {
      try {
        const customer = await customersModel.getCustomerById(passedID || req.params.id)
        if (customer) {
          req.customer = customer;
          next();
        } else {
          res.status(404).json({
            message: "Customer not found",
          });
        }
    } catch(err) {
        res.status(500).json({
          message: "Error retrieving the customer",
        })
    }        
  };
}

function checkCompleteCustomerBody() {
  return (req, res, next) => {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.dateOfBirth ||
      !req.body.address
    ) {
      return res.status(400).json({
        message: "Missing Fields",
      });
    }
    next();
  };
}

function restrictCustomer() {
	return async (req, res, next) => {
		try{
			if (!req.session || !req.session.customer) {
				return res.status(403).json({
					message: "You don't have access"
				})
			}
			next()

		} catch(err){
			next(err)
		}
	}
};

module.exports = {
  checkCustomerID,
  checkCompleteCustomerBody,
  restrictCustomer
};
