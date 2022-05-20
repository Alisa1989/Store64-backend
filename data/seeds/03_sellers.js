exports.seed = async function (knex) {
    await knex("sellers").insert([
        {
            companyName: "sell4less",
        },
        {
            companyName: "JoyOfSelling",
        },
    ]);
};