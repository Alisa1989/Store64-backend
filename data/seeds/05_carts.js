exports.seed = async function (knex) {
    await knex("carts").insert([
        {
            customerID: 1,
            sellerID: 1,
            productID: 4,
            quantity: 2
        },
        {
            customerID: 1,
            sellerID: 1,
            productID: 16,
            quantity: 1
        },
        {
            customerID: 1,
            sellerID: 2,
            productID: 11,
            quantity: 1
        },
        {
            customerID: 2,
            sellerID: 1,
            productID: 3,
            quantity: 2
        },
        {
            customerID: 2,
            sellerID: 1,
            productID: 7,
            quantity: 1
        },
        {
            customerID: 2,
            sellerID: 2,
            productID: 8,
            quantity: 2
        },
    ]);
};