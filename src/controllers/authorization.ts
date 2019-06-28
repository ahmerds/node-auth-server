import { Request, Response } from "express";

import logger from "../utils/logger";

/**
 * 
 * @param req - Request from API Client
 * @param res - Response from API Client 
 * 
 * Endpoint for user registration
 */
export let registerUser = async (req: Request, res: Response) => {
    res.json(
        req.user
    );
};

/**
 * 
 * @param req - Request from API Client
 * @param res - Response from API Client
 * 
 * Endpoint for user login
 */
export let loginUser = (req: Request, res: Response) => {
    res.json({
        token: req.user.token
    });
}

/**
 * 
 * @param req - Request from API Client
 * @param res - Response from API Client
 * 
 * Endpoint for checking if user is authorized
 */
export let getAuthorization = (req: any, res: Response) => {
    if(!req.app.locals.user) {
        res.status(403).json({
            error: true,
            message: "You are not authorized to carry out this action"
        })
        return false;
    }

    logger.debug("Authorized");
    return true;
}

export let postAuthorization = (req: any, res: Response) => {
    if(!req.app.locals.user) {
        return res.status(403).json({
            error: true,
            message: "You are not authorized to carry out this action"
        })
    }

    req.oauth.authorize();
}
