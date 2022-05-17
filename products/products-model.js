let db = require("../data/config");

function getProducts(query = {}) {
  const { page = 1, limit = 100, sortBy = "id", sortDir = "asc" } = query;
  const offset = limit * (page - 1);

  return db("products")
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset)
    .select();
}

function getProductById(id) {
  return db("products").where({ id }).first();
}

async function createProduct(data) {
  const [id] = await db("products").insert(data);
  return getProductById(id);
}

async function updateProduct(id, changes) {
  await db("products").where({ id }).update(changes);

  return getProductById(id);
}

function deleteProduct(id) {
  return db("products").where({ id }).del();
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
