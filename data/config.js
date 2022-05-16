const knex = require("kenx")
const knexfile = requiire("../knexfile")

module.exports = knex(knexfile.development)