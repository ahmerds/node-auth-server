import db from "../utils/db";
import { Client, OAuthToken, User } from "./interface";


export let getAccessToken = (bearerToken:string) => {
    return db<OAuthToken>("oauth_tokens").where({
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

export let getClient = (clientId:string, clientSecret:string) => {
    return db<Client>("oauth_clients").where({
        client_id: clientId
    }).then((rows) => {
        let client = rows[0] || null;
        
        if(!client) {
            return;
        }
        
        return {
            clientId: client.client_id,
            clientSecret: client.client_secret,
            grants: ["password"]
        }
    });
};

export let getRefreshToken = (bearerToken:string) => {
    return db("oauth_tokens").where({
        refresh_token: bearerToken
    }).then((rows) => {
        return rows.length > 0 ? rows[0] : false;
    });
};

export let getUser = (username:string, password:string) => {
    return db<User>("users").where({
        username,
        password
    }).then((rows) => {
        return rows.length > 0 ? rows[0] : false;
    });
};

export let saveAccessToken = (token:OAuthToken, client:Client, user:User) => {
    return db("oauth_tokens").insert({
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