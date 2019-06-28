import db from "../utils/db";
import { User } from "./interface";
import bcrypt from "bcrypt";
import logger from "../utils/logger";
import { v1 as uuid } from "uuid";

async function encryptPass(plainPass: string): Promise<string> {
    const hash = await bcrypt.hash(plainPass, 10);
    return hash;
}

async function checkPass(pass: string, encryptedPass: string): Promise<boolean> {
    const valid = bcrypt.compare(pass, encryptedPass);
    return valid;
}

export let create = async (data: User) => {
    const uid: string = uuid(); 
    const encPassword = await encryptPass(data.password);
    const values = {
        uid,
        username: data.username,
        password: encPassword,
        email: data.email
    }

    try {
        await db("users").insert(values); 
    } catch(err) {
        if(err) {
            logger.error("Error creating User: " + err);
            throw new Error(err);
        }
    }

    delete values.password;
    return values;
};

export let check = async (username: string, password: string): Promise<any> => {
    const result = await db("users").where({
        username
    });

    if(result.length < 1) return null;

    const user = result[0];
    const isPasswordValid = await checkPass(password, user.password)
    
    return isPasswordValid ? user : false;
};




