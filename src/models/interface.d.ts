export interface Client {
    id?: number
    client_id: string;
    client_secret?: string;
}

export interface OAuthToken {
    id?: number;
    access_token: string;
    access_token_expiry: string;
    client_id: string;
    refresh_token: string;
    refresh_token_expiry: string;
    user_id: string
}

export interface User {
    id?: number;
    username: string;
    password: string;
    email?: string;
    uid?: string;
}