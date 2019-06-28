"use strict";
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./utils/logger"));
const passport_1 = __importDefault(require("passport"));
const authController = __importStar(require("./controllers/authorization"));
const linkController = __importStar(require("./controllers/links"));
const authorization_1 = require("./middleware/authorization");
const inputValidation_1 = __importDefault(require("./middleware/inputValidation"));
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(passport_1.default.initialize());
// This middleware checks to see if the incoming input is valid
// app.use("/login", authMiddleware.user);
require("./middleware/authorization");
require("./middleware/verifier");
app.post("/login", authorization_1.loginMiddleware, authController.loginUser);
app.post("/register", inputValidation_1.default, passport_1.default.authenticate("signup", { session: false }), authController.registerUser);
app.get("/secure", passport_1.default.authenticate("jwt", { session: false }), linkController.secure);
app.all("*", (req, res) => {
    res.sendStatus(404);
});
const port = process.env.PORT || 3003;
app.listen(port, () => {
    logger_1.default.debug("Auth server listening on Port: " + port);
});
//# sourceMappingURL=index.js.map