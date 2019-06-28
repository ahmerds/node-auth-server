"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knex = knex_1.default({
    dialect: "sqlite3",
    connection: {
        filename: "./data.sqlite3"
    }
});
exports.default = knex;
//# sourceMappingURL=db.js.map