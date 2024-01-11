import { NextFunction, Request, Response } from 'express';
import HTTPError from '../../utils/error/http';
import BadGatewayError from '../../utils/error/bad-gateway';
import BadRequestError from '../../utils/error/bad-request';
import ForbiddenError from '../../utils/error/forbidden';
import InternalServerError from '../../utils/error/internal-server';
import NotFoundError from '../../utils/error/not-found';
import ServiceUnavailableError from '../../utils/error/service-unavailable';
import UnauthorizedError from '../../utils/error/unauthorized';
import logger from '../logger';

export default (err: HTTPError | Error | BadGatewayError | BadRequestError | ForbiddenError | InternalServerError | NotFoundError | ServiceUnavailableError | UnauthorizedError, req: Request, res: Response, next: NextFunction) => {
        switch (true) {
            case err instanceof HTTPError:

                res.status((err as HTTPError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as HTTPError).status,
                    },
                });
                break;
            case err instanceof BadGatewayError:

                res.status((err as BadGatewayError).status).json({
                    error: {
                    message: err.message,
                    status: (err as BadGatewayError).status,
                    },
                });
                break;
            case err instanceof BadRequestError:

                res.status((err as BadRequestError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as BadRequestError).status,
                    },
                });
                break;
            case err instanceof ForbiddenError:

                res.status((err as ForbiddenError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as ForbiddenError).status,
                    },
                });
                break;
            case err instanceof ServiceUnavailableError:

                res.status((err as ServiceUnavailableError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as ServiceUnavailableError).status,
                    },
                });
                break;
            case err instanceof UnauthorizedError:

                res.status((err as UnauthorizedError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as UnauthorizedError).status,
                    },
                });
                break;
            case err instanceof NotFoundError:

                res.status((err as NotFoundError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as NotFoundError).status,
                    },
                });
                break;
            case err instanceof InternalServerError:

                res.status((err as InternalServerError).status || 500).json({
                    error: {
                    message: err.message,
                    status: (err as InternalServerError).status,
                    },
                });
                break;
            default:
            // Handle other types of errors
            logger.error('Unexpected Issue:', err); // Log the error for debugging purposes
            res.status(500).json({
                error: {
                message: 'Internal Server Error',
                status: 500,
                },
            });
            break;
        }
}

export function error404(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({
        message: "Not Found"
    })
}
