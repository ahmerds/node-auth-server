import { Request, Response, NextFunction } from "express";
import { validate } from "joi";
import * as schema from "../utils/schema";
import logger from "../utils/logger";


export default function validator(req: Request, res: Response, next: NextFunction) {
    const result = validate(req.body, schema.UserSchema);

    if(result.error !== null) {
        logger.debug(result.error);
        return res.status(400).json({
            error: true,
            message: "Please make sure all field conditions are satisfied"
        });
    }

    next();
}