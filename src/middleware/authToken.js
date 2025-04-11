const guestSession = require("../models/guestSessionModel");
const Session = require("../models/sessionModel");
const { errorResponse } = require("../utils/responses");
const { updateStreak } = require("../utils/streak");
const { isTokenValid, createAccessToken } = require("../utils/userAuth");
const { StatusCodes } = require("http-status-codes");

const isLoggedIn = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const sessionId = req.cookies.sessionId;


    if (!accessToken) {
      return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Access token is required.'));
    }
    
    let session;
    try {
      session = await Session.findById(sessionId);
      if (!session) {
        session = await guestSession.findById(sessionId)
        if(session){
          req.guest = true;
        }else{
          return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Login required.'));
        }
      }
      // Proceed with token validation...
    } catch (error) {
      return next(errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred.'));
    }
    

    try {
        const payload = isTokenValid(accessToken);
        await updateStreak(session.userId)
        return next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
          //refresh token logic'
          try {
            const payload = isTokenValid(session.refreshToken);
            const newAccessToken = createAccessToken(session.userId);
            session.accessToken = newAccessToken;
            await session.save();
            res.cookie("accessToken",newAccessToken,{
              httpOnly: true, 
              secure: true, 
              sameSite: 'Strict'
            })

          } catch (error) {
            if (error.name === 'TokenExpiredError') {
              await session.deleteOne();
              return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Auth message: Session expired, please log in again')
            }
          }
          
          await updateStreak(session.userId)
          return next();

        }else{
          return errorResponse(res, StatusCodes.UNAUTHORIZED, 'invalid access token.');
        }
    }
      
};

module.exports = {isLoggedIn};       