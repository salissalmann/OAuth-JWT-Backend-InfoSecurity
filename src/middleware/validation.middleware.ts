import { HttpException } from "@/http/HttpExceptions";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

// export const ValidationMiddleware = (type: any, skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const dto = plainToInstance(type, req.body);
//         validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
//             .then(() => {
//                 req.body = dto;
//                 next();
//             })
//             .catch((errors: ValidationError[]) => {
//                 const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//                 // const errorMessages = errors.map((error: ValidationError) => Object.values(error.constraints));

//                 next(new HttpException(400, message));
//             });
//     };
// };

export const ValidationMiddleware = (
    type: any,
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);
        console.dir(dto, { depth: null });
        validateOrReject(dto, {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted,
        })
            .then(() => {
                req.body = dto;
                next();
            })
            .catch((errors: ValidationError[]) => {
                const messages = errors.map((error: ValidationError) => {
                    if (error.constraints) {
                        return Object.values(error.constraints);
                    }
                    return "Validation error";
                });
                const message = messages.join(", ");
                next(new HttpException(400, message));
            });
    };
};
