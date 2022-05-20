exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("carts").truncate();
    await knex("orders").truncate();
    await knex("sellers").truncate();
    await knex("customers").truncate();
    await knex("products").truncate();
}