"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const localStrategy = require("passport-local").Strategy;
const User = __importStar(require("../models/User"));
const logger_1 = __importDefault(require("../utils/logger"));
// Strategy for signup
passport_1.default.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // Pass the request object to the callback below
}, (req, username, password, done) => __awaiter(this, void 0, void 0, function* () {
    // Check if email has been taken
    let emailCheck = yield db_1.default("users").where({
        email: req.body.email
    });
    if (emailCheck.length > 0)
        return done(null, { error: true, message: "This email has already been registered" });
    let usernameCheck = yield db_1.default("users").where({
        username
    });
    if (usernameCheck.length > 0)
        return done(null, { error: true, message: "This username has been taken. Try another" });
    try {
        const user = yield User.create({
            username,
            password,
            email: req.body.email
        });
        console.log(user);
        // Return user info to next middleware
        return done(null, { user: Object.assign({}, user), message: "Registration Successful" });
    }
    catch (err) {
        done(err);
    }
})));
// Strategy for login 
passport_1.default.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => __awaiter(this, void 0, void 0, function* () {
    let user = yield User.check(username, password);
    if (!user)
        return done(null, false, { error: true, message: "Incorrect Password" });
    delete user.password;
    return done(null, user, { message: "Log in successful" });
})));
// Middleware for login
exports.loginMiddleware = (req, res, next) => {
    passport_1.default.authenticate('login', (err, user, info) => {
        if (!user || err) {
            return res.status(403).json({
                error: true,
                message: "Invalid login details"
            });
        }
        req.login(user, { session: false }, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                logger_1.default.error(err);
                return res.status(500).json({
                    error: true,
                    message: "Something went wrong while trying to log in"
                });
            }
            const userDetails = {
                uid: user.uid,
                username: user.username
            };
            const token = jsonwebtoken_1.default.sign({ user: Object.assign({}, userDetails) }, process.env.SECRET_HASHING_KEY, {
                expiresIn: 100,
                issuer: process.env.APP_NAME,
            });
            req.user.token = token;
            next();
        }));
    })(req, res, next);
};
//# sourceMappingURL=authorization.js.map