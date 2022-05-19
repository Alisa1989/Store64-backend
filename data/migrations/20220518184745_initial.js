
exports.up = async function(knex) {

    await knex.schema.createTable("products", (table) => {
        table.increments("id")
        table.text("title").notNull().unique()
        table.float("price").notNull()
        table.text("description").notNull()
        table.text("category").notNull()
        table.text("image").notNull()
        table.float("rating").defaultTo(0)
        table.integer("numberReviews").defaultTo(0)
    })

    await knex.schema.createTable("customers", (table) => {
        table.increments("id")
        table.text("firstName").notNull()
        table.text("lastName").notNull()
        table.text("dateOfBirth").notNull()
        table.text("address").notNull()
    })

    await knex.schema.createTable("sellers", (table) => {
        table.increments("id")
        table.text("firstName").notNull()
        table.text("lastName").notNull()
        table.float("rating").defaultTo(0)
        table.integer("numberReviews").defaultTo(0)
    })

    await knex.schema.createTable("orders", (table) => {
        table.increments("id")
        table.integer("customerID").notNull().references("id").inTable("customers")
        table.integer("productID").notNull().references("id").inTable("products")
        table.integer("quantity")
        table.integer("sellerID").notNull().references("id").inTable("sellers")
        table.date("datePlaced").defaultTo(knex.raw("current_date"))
    })

    await knex.schema.createTable("carts", (table) => {
        table.integer("customerID").notNull().references("id").inTable("customers")
        table.integer("productID").notNull().references("id").inTable("products")
        table.integer("quantity")
        table.integer("sellerID").notNull().references("id").inTable("sellers")
        table.primary(["customerID", "productID"])
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("carts")
    await knex.schema.dropTableIfExists("orders")
    await knex.schema.dropTableIfExists("sellers")
    await knex.schema.dropTableIfExists("customers")
    await knex.schema.dropTableIfExists("products")
};
