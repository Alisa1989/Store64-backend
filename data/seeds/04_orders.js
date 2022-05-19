exports.seed = async function (knex) {
    await knex("orders").insert([
        {
            customerID: 1,
            productID: 19,
            sellerID: 1,
            quantity: 2
        },
        {
            customerID: 1,
            productID: 18,
            sellerID: 2,
            quantity: 6
        },
        {
            customerID: 2,
            productID: 7,
            sellerID: 1,
            quantity: 1,
        },
    ]);
};