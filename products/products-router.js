const express = require("express");
const db = require("./products-model");
const { checkCompleteBody, checkProductID } = require("../middleware/product");

const router = express.Router();

//Added PROMISE.RESOLVE method to make it act like a promise so
//that when we link the real database we can just subtract it

router.get("/products", (req, res, next) => {
  Promise.resolve(db.getProducts())
    .then((products) => {
      res.json(products);
    })
    .catch(next);
});

router.get("/products/:id", checkProductID(), (req, res) => {
  res.json(req.product);
});

router.post("/products", checkCompleteBody(), (req, res) => {
  Promise.resolve(db.createProduct(req.body))
    .then((product) => {
      res.status(201).json(product);
    })
    .catch(next);
});

router.put("/products/:id", checkCompleteBody(), checkProductID(), (req, res) => {
    Promise.resolve(db.updateProduct(req.params.id, req.body))
      .then((product) => {
        res.json(product);
      })
      .catch(next);
  }
);

router.delete("/products/:id", checkProductID(), (req, res) => {
  Promise.resolve(db.deleteProduct(req.params.id))
    .then(() => {
      res.status(200).json({
        message: "Product has been deleted",
      });
    })
    .catch(next);
});

module.exports = router;
