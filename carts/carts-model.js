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
  "pr.title as productTitle", "pr.image as productImage", 
  "ca.quantity as quantity", "pr.price as price", "se.companyName as seller")
}

// async function createCustomer(data) {
//   const [id] = await db("customers").insert(data);
//   return getCustomerById(id);
// }

// async function updateCustomer(id, changes) {
//   await db("customers").where({ id }).update(changes);

//   return getCustomerById(id);
// }

// function deleteCustomer(id) {
//   return db("customers").where({ id }).del();
// }

module.exports = {
  getCarts,
  getCartByCustomerId,
//   createCustomer,
//   updateCustomer,
//   deleteCustomer,
};
