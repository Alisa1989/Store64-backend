
exports.up = async function(knex) {
    await knex.schema.createTable("products", (table) => {
        table.increments("id")
        table.text("title").notNull().unique()
        table.float("price").notNull()
        table.text("description").notNull()
        table.text("category").notNull()
        table.text("image").notNull()
        table.float("rating")
        table.float("numberReviews")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("products")
};
