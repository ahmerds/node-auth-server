"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const schema = __importStar(require("../utils/schema"));
const logger_1 = __importDefault(require("../utils/logger"));
function validator(req, res, next) {
    const result = joi_1.validate(req.body, schema.UserSchema);
    if (result.error !== null) {
        logger_1.default.debug(result.error);
        return res.status(400).json({
            error: true,
            message: "Please make sure all field conditions are satisfied"
        });
    }
    next();
}
exports.default = validator;
//# sourceMappingURL=inputValidation.js.map