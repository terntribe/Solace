const { errorResponse } = require("../utils/responses");
const { isTokenValid } = require("../utils/userAuth");
const { StatusCodes } = require("http-status-codes");

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Authorization header is required.'));
    }

    if (!authHeader.startsWith('Bearer ')) {
        return next(errorResponse(res, StatusCodes.FORBIDDEN, 'Invalid authorization header format.'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = isTokenValid(token);
        req.user = { userId: payload.id };
        next(); 
    } catch (error) {
        return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Authentication failed: Invalid token.'));
    }
};

module.exports = {isLoggedIn};       