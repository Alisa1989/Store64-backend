const customersModel = require("../customers/customers-model");

function checkCustomerID() {
  return async (req, res, next) => {
      try {
        const customer = await customersModel.getCustomerById(req.params.id)
        if (customer) {
          req.customer = customer;
          next();
        } else {
          res.status(404).json({
            message: "Customer not found",
          });
        }
    } catch(err) {
        console.log(error);
        resstatus(500).json({
          message: "Error retrieving the customer",
        })
    }        
  };
}

function checkCompleteCustomerBody() {
  return (req, res, next) => {
    if (
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

module.exports = {
  checkCustomerID,
  checkCompleteCustomerBody,
};
