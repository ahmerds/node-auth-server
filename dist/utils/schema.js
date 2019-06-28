"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.ClientSchema = joi_1.default.object().keys({
    "client_id": joi_1.default.string().required()
});
exports.UserSchema = joi_1.default.object().keys({
    "email": joi_1.default.string().email().required(),
    "password": joi_1.default.string().min(5).max(20).required(),
    "username": joi_1.default.string().alphanum().min(3).max(20).required(),
    "client": exports.ClientSchema
});
//# sourceMappingURL=schema.js.map