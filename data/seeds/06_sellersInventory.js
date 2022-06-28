exports.seed = async function (knex) {
    await knex("sellersInventory").insert([
        {
            sellerID: 1,
            productID: 4,
            quantity: 20
        },
        {
            sellerID: 1,
            productID: 16,
            quantity: 15
        }
    ]);
};