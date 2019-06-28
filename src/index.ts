import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import logger from "./utils/logger";
import passport from "passport";

import * as authController from "./controllers/authorization";
import * as linkController from "./controllers/links";
import {loginMiddleware} from "./middleware/authorization";
import validator from "./middleware/inputValidation"

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(passport.initialize());

// This middleware checks to see if the incoming input is valid
// app.use("/login", authMiddleware.user);

require("./middleware/authorization");
require("./middleware/verifier");

app.post(
    "/login",
    loginMiddleware,
    authController.loginUser
);
app.post(
    "/register",
    validator,
    passport.authenticate("signup", {session: false}),
    authController.registerUser
);

app.get(
    "/secure",
    passport.authenticate("jwt", {session: false}),
    linkController.secure
)

app.all("*", (req, res) => {
    res.sendStatus(404);
})

const port = process.env.PORT || 3003;

app.listen(port, () => {
    logger.debug("Auth server listening on Port: " + port);
});