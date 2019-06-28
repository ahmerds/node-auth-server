"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
exports.getAccessToken = (bearerToken) => {
    return db_1.default("oauth_tokens").where({
        access_token: bearerToken
    }).then((rows) => {
        let row = rows[0];
        return {
            accessToken: row.access_token,
            client: { id: row.client_id },
            expires: row.access_token_expiry,
            user: { id: row.user_id }
        };
    });
};
exports.getClient = (clientId, clientSecret) => {
    return db_1.default("oauth_clients").where({
        client_id: clientId
    }).then((rows) => {
        let client = rows[0] || null;
        if (!client) {
            return;
        }
        return {
            clientId: client.client_id,
            clientSecret: client.client_secret,
            grants: ["password"]
        };
    });
};
exports.getRefreshToken = (bearerToken) => {
    return db_1.default("oauth_tokens").where({
        refresh_token: bearerToken
    }).then((rows) => {
        return rows.length > 0 ? rows[0] : false;
    });
};
exports.getUser = (username, password) => {
    return db_1.default("users").where({
        username,
        password
    }).then((rows) => {
        return rows.length > 0 ? rows[0] : false;
    });
};
exports.saveAccessToken = (token, client, user) => {
    return db_1.default("oauth_tokens").insert({
        access_token: token.access_token,
        access_token_expiry: token.access_token_expiry,
        client_id: client.id,
        refresh_token: token.refresh_token,
        refresh_token_expiry: token.refresh_token_expiry,
        user_id: user.uid
    }).then((result) => {
        return result.length > 0 ? result[0] : false; // TODO return object with client: {id: clientId} and user: {id: userId} defined
    });
};
//# sourceMappingURL=Token.js.map