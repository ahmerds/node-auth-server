import db from "../utils/db";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const localStrategy = require("passport-local").Strategy;

import * as User from "../models/User";
import logger from "../utils/logger";

// Strategy for signup
passport.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // Pass the request object to the callback below
}, async (req: any, username: string, password: string, done: any) => {
    // Check if email has been taken
    let emailCheck = await db("users").where({
        email: req.body.email
    });
    if(emailCheck.length > 0) return done(null, {error: true, message: "This email has already been registered"});

    let usernameCheck = await db("users").where({
        username
    });
    if(usernameCheck.length > 0) return done(null, {error: true, message: "This username has been taken. Try another"});
    
    try {
        const user = await User.create({
            username,
            password,
            email: req.body.email
        });
        console.log(user);
        // Return user info to next middleware
        return done(null, {user: {...user}, message: "Registration Successful"});
    } catch (err) {
        done(err);
    }
}));

// Strategy for login 
passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username: string, password: string, done: any) => {
    let user = await User.check(username, password);

    if(!user) return done(null, false, {error: true, message: "Incorrect Password"});

    delete user.password;
    return done(null, user, {message: "Log in successful"})
}));

// Middleware for login
export let loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', (err, user, info) => {
        if(!user || err) {
            return res.status(403).json({
                error: true,
                message: "Invalid login details"
            });
        }

        req.login(user, {session: false}, async (err) => {
            if(err) {
                logger.error(err);
                return res.status(500).json({
                    error: true,
                    message: "Something went wrong while trying to log in"
                });
            }

            const userDetails = {
                uid: user.uid,
                username: user.username
            }

            const token = jwt.sign(
                {user: {...userDetails}}, 
                process.env.SECRET_HASHING_KEY,
                { 
                    expiresIn: process.env.TOKEN_LIFE,
                    issuer: process.env.APP_NAME,
                });
            req.user.token = token;
            next();
        });
    })(req, res, next);
}