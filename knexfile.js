// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefualt: true,
    connection: {
      filename: './data/store64.db3'
    }
  },
};
