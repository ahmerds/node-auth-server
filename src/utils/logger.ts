import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new (winston.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston.transports.File)({ filename: "debug.log", level: "debug"})
    ]
});

if ( process.env.NODE_ENV !== "production" ) {
    logger.debug("Initialized debug level logger");
}

export default logger;