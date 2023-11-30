import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { HttpException } from '@/http/HttpExceptions';
import { ApiResponse } from '@/http/ApiResponse';
import { Header } from '@/interfaces/response.interface';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);


        const header: Header = {
            error: 1,
            errorCode: status,
            errorMessage: message,
        };

        const response = ApiResponse.error(
            header,
        );

        res.status(status).json(response);


    } catch (error) {
        next(error);
    }
};
