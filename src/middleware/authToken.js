const guestSession = require("../models/guestSession.model");
const Session = require("../models/session.model");
const { errorResponse } = require("../utils/responses");
const { updateStreak } = require("../utils/streak");
const { isTokenValid, createAccessToken } = require("../utils/userAuth");
const { StatusCodes } = require("http-status-codes");

const isLoggedIn = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const sessionId = req.cookies.sessionId;


    if (!accessToken) {
      return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Access token is required.');
    }
    
    let session;
    try {
      session = await Session.findById(sessionId);

      
      // for guests
      if (!session) {
        session = await guestSession.findById(sessionId)
        if(session){
          req.guest = true;
          return next();
        }else{
        return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Login required.');
      }
      }
      // Proceed with token validation...
    } catch (error) {
      return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred.');
    }
    

    try {
        const payload = isTokenValid(accessToken);
        
        if(!(payload.id == session.userId)){
          return errorResponse('res', StatusCodes.UNAUTHORIZED, "accessCode doesn't match sessionid")
        }
        
        const validatedUser = await getUserBySessionId(sessionId) 
        req.user = validatedUser
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
              secure: false, 
              sameSite: 'Strict'
            })

          } catch (error) {
            if (error.name === 'TokenExpiredError') {
              await session.deleteOne();
              return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Auth message: Session expired, please log in again')
            }
          }
          const validatedUser = await getUserBySessionId(sessionId) 
          req.user = validatedUser
          return next();

        }else{
          return errorResponse(res, StatusCodes.UNAUTHORIZED, 'invalid access token.');
        }
    }
      
};

module.exports = {isLoggedIn};       