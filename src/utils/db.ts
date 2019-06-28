import Knex from "knex";
const knex = Knex({
    dialect: "sqlite3",
    connection: {
        filename: "./data.sqlite3"
    }
});

export default knex;