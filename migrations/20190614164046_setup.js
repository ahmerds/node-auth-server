
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
        table.increments("_id").notNullable().primary();
        table.string("uid").unique().notNullable();
        table.string("username", 30).unique().notNullable();
        table.string("password", 50).notNullable();
        table.string("email").unique().notNullable();
        table.timestamp("joined").defaultTo(knex.fn.now()).notNullable();
    }).createTable("oauth_tokens", (table) => {
        table.increments("_id").notNullable().primary();
        table.string("access_token").notNullable();
        table.timestamp("access_token_expiry").notNullable();
        table.string("client_id").notNullable();
        table.string("refresh_token").notNullable();
        table.timestamp("refresh_token_expiry").notNullable();
        table.string("user_id").references("users.uid").notNullable();
    }).createTable("oauth_clients", (table) => {
        table.increments("_id").notNullable().primary();
        table.string("client_id").notNullable();
        table.string("client_secret");
    })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
            .dropTable('oauth_tokens')
            .dropTable('oauth_clients')
    ])
};
