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

//get seller by a filter
function getSellerByFilter( filter ) {
    return db("sellers").where( filter );
}

//get seller by id
function getSellerByID(id) {
    return db("sellers").where( {id} ).first();
}

//create seller
async function createSeller(data) {
    const[id] = await db("sellers").insert(data);
    return getSellerByID(id);
}

//update seller
async function updateSeller(id, changes) {
    await db("sellers").where({ id }).update(changes);

    return getSellerById(id);
}

//delete seller
function deleteSeller(id) {
    return db("sellers").where({ id }).del();
}

module.exports = {
    getSellers,
    getSellerByID,
    getSellerByFilter,
    createSeller,
    updateSeller,
    deleteSeller
}