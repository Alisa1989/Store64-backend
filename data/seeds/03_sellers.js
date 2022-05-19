exports.seed = async function (knex) {
    await knex("sellers").insert([
        {
            firstName: "Frank",
            lastName: "Sinatra",
        },
        {
            firstName: "Peter",
            lastName: "Griffin",
        },
    ]);
};