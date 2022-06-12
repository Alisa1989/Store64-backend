let db = require("../data/config");
const { getProductById } = require("../products/products-model");

//get all sellers
function getSellers(query = {}) {
  const { page = 1, limit = 100, sortBy = "id", sortDir = "asc" } = query;
  const offset = limit * (page - 1);

  return db("sellers")
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset)
    .select();
}

//get seller by id
function getSellerByID(id) {
    return db("sellers").where({ id }).first();
}

//create seller
async function createSeller(data) {
    const[id] = await db("sellers").inser(data);
    return getSellerByID(id);
}

//update seller
async function updateSeller(id) {
    await db("sellers").where({ id }).update(changes);

    return getProductById(id);
}

//delete seller
function deleteSeller(id) {
    return db("sellers").where({ id }).del();
}

module.exports = {
    getSellers,
    getSellerByID,
    createSeller,
    updateSeller,
    deleteSeller
}