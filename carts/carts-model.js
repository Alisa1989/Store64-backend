let db = require("../data/config");

function getCarts(query = {}) {
  const { page = 1, limit = 100, sortBy = "customerID", sortDir = "asc" } = query;
  const offset = limit * (page - 1);

  return db("carts")
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset)
    .select();
}

function getCartByCustomerId(id) {
  return db("carts as ca")
  .join("customers as cu", "cu.id", "ca.customerID")
  .join("products as pr", "pr.id", "ca.productID")
  .join("sellers as se", "se.id", "ca.sellerID")
  .where("customerID", id )
  .select("cu.firstName as customerFN", "cu.lastName as customerLN", 
  "pr.id as id", "pr.title as title", "pr.image as image", 
  "ca.quantity as quantity", "pr.price as price", "se.companyName as seller")
}

async function getCartEntry(custID, prodID) {
  // return db("carts").where({customerID: custID, productID: prodID});
  return db("carts").where("customerID", custID).andWhere("productID", prodID);

}

async function createCartEntry(data){
  console.log("data", data);
  const [customerID, productID] = await db("carts").insert(data);
  return getCartEntry(customerID, productID);
}

async function updateCartEntryQuantity(customerID, productID, changes) {
  await db("carts").where("customerID", customerID).andWhere("productID", productID).update(changes);

  return getCartByCustomerById(customerID);
}

function deleteCartEntry(customerID, productID) {
  return db("carts").where("customerID", customerID).andWhere("productID", productID).del();
}

function deleteCart(customerID) {
  return db("carts").where("customerID", customerID).del();
}

module.exports = {
  getCarts,
  getCartByCustomerId,
  getCartEntry,
  createCartEntry,
  updateCartEntryQuantity,
  deleteCartEntry,
};
