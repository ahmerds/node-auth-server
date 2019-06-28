import { Request, Response } from "express";

import logger from "../utils/logger";

/**
 * 
 * @param req - Request from API Client
 * @param res - Response from API Client 
 * 
 * Endpoint for checking if secure
 */
export let secure = async (req: Request, res: Response) => {
    res.json({
        message: "This is a secure endpoint",
        user: req.user
    });
};