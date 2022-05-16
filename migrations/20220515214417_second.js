exports.up = async function (knex) {
  await knex.schema.alterTable("products", (table) => {
    table.boolean("inStock").defaultTo(false);
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("products", (table) => {
    table.dropColumn("inStock");
  });
};
