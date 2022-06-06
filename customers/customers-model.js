let db = require("../data/config");

function getCustomers(query = {}) {
  const { page = 1, limit = 100, sortBy = "id", sortDir = "asc" } = query;
  const offset = limit * (page - 1);

  return db("customers")
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset)
    .select();
}

function getCustomerBy(filter) {
  return db("customers").where(filter)
}

function getCustomerById(id) {
  return db("customers").where({ id }).first();
}

async function createCustomer(data) {
  const [id] = await db("customers").insert(data);
  return getCustomerById(id);
}

async function updateCustomer(id, changes) {
  await db("customers").where({ id }).update(changes);

  return getCustomerById(id);
}

function deleteCustomer(id) {
  return db("customers").where({ id }).del();
}

module.exports = {
  getCustomers,
  getCustomerBy,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
