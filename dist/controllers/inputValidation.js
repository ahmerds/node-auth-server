"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const schema = __importStar(require("../utils/schema"));
function validator(req, res, next) {
    const result = joi_1.validate(req.body, schema);
    if (result.error) {
        return res.status(406).json({
            error: true,
            message: "Please make sure all field conditions are satisfied"
        });
    }
    next();
}
exports.default = validator;
//# sourceMappingURL=inputValidation.js.map