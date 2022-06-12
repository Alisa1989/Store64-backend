exports.seed = async function (knex) {
    await knex("sellers").insert([
        {
            companyName: "sell4less",
            email: "info@sell4less.com",
            rating: 4.7,
            numberReviews: 1426
        },
        {
            companyName: "JoyOfSelling",
            email: "JoyOfSelling@outlook.com"
        },
    ]);
};