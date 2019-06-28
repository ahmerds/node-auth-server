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
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../utils/logger"));
const uuid_1 = require("uuid");
function encryptPass(plainPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcrypt_1.default.hash(plainPass, 10);
        return hash;
    });
}
function checkPass(pass, encryptedPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const valid = bcrypt_1.default.compare(pass, encryptedPass);
        return valid;
    });
}
exports.create = (data) => __awaiter(this, void 0, void 0, function* () {
    const uid = uuid_1.v1();
    const encPassword = yield encryptPass(data.password);
    const values = {
        uid,
        username: data.username,
        password: encPassword,
        email: data.email
    };
    try {
        yield db_1.default("users").insert(values);
    }
    catch (err) {
        if (err) {
            logger_1.default.error("Error creating User: " + err);
            throw new Error(err);
        }
    }
    delete values.password;
    return values;
});
exports.check = (username, password) => __awaiter(this, void 0, void 0, function* () {
    const result = yield db_1.default("users").where({
        username
    });
    if (result.length < 1)
        return null;
    const user = result[0];
    const isPasswordValid = yield checkPass(password, user.password);
    return isPasswordValid ? user : false;
});
//# sourceMappingURL=User.js.map