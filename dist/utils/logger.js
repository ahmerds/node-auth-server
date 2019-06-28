"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.simple(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new (winston_1.default.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston_1.default.transports.File)({ filename: "debug.log", level: "debug" })
    ]
});
if (process.env.NODE_ENV !== "production") {
    logger.debug("Initialized debug level logger");
}
exports.default = logger;
//# sourceMappingURL=logger.js.map