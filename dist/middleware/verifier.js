"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.SECRET_HASHING_KEY,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: process.env.APP_NAME,
    algorithms: ["HS256"]
}, (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (err) {
        done(err);
    }
}));
//# sourceMappingURL=verifier.js.map