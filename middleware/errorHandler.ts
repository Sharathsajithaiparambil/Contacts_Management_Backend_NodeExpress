import { Request, Response, NextFunction } from 'express';
import { constants } from '../constants';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction): void => {
    const statusCode = err.statusCode || constants.SERVER_ERROR;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No Error, All Good");
    }
};

export default errorHandler;

