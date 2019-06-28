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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
/**
 *
 * @param req - Request from API Client
 * @param res - Response from API Client
 *
 * Endpoint for user registration
 */
exports.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(req.user);
});
/**
 *
 * @param req - Request from API Client
 * @param res - Response from API Client
 *
 * Endpoint for user login
 */
exports.loginUser = (req, res) => {
    res.json({
        token: req.user.token
    });
};
/**
 *
 * @param req - Request from API Client
 * @param res - Response from API Client
 *
 * Endpoint for checking if user is authorized
 */
exports.getAuthorization = (req, res) => {
    if (!req.app.locals.user) {
        res.status(403).json({
            error: true,
            message: "You are not authorized to carry out this action"
        });
        return false;
    }
    logger_1.default.debug("Authorized");
    return true;
};
exports.postAuthorization = (req, res) => {
    if (!req.app.locals.user) {
        return res.status(403).json({
            error: true,
            message: "You are not authorized to carry out this action"
        });
    }
    req.oauth.authorize();
};
//# sourceMappingURL=authorization.js.map