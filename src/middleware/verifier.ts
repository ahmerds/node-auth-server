import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

passport.use(new Strategy({
    secretOrKey: process.env.SECRET_HASHING_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: process.env.APP_NAME,
    algorithms: ["HS256"]
}, (token: any, done: any) => {
    try {
        return done(null, token.user);
    } catch(err) {
        done(err)
    }
}));
