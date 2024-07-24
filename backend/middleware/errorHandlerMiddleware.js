import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong, try again later';
    res.status(statusCode).json({ msg: message });
};

export default errorHandlerMiddleware;
