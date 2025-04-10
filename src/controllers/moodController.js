const Session = require("../models/sessionModel");
const Mood = require("../models/moodModel")
const { errorResponse, successResponse } = require("../utils/responses.utils");
const { StatusCodes } = require('http-status-codes');



const saveMood = async (req, res, next)=>{
    const moodObject = req.body;
    if(req.guest){
        return successResponse(res, StatusCodes.FORBIDDEN, "Guest account won't store info")
    }

    const accessToken = req.cookies.accessToken;
    const sessionId = req.cookies.sessionId;

    if (!accessToken) {
        return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Access token is required.'));
    }
    let session;
    try {
        session = await Session.findById(sessionId);
        if (!session) {
            return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Login required.'));
        }

        const newMood = await Mood.create({
            userId: session.userId ,
            moodlevel: moodObject.moodLevel
        })

        if(newMood){
           return successResponse(res, StatusCodes.OK, 'mood entry saved successfully')
        }
    } catch (error) {
      console.log("Error thrown from saveMood middleware", error)
      return next(errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred.'));
    }
}


const getRecentMood = async (req, res, next) => {
    if(req.guest) {
        return successResponse(res, StatusCodes.FORBIDDEN, "No mood data for guests");
    }

    const sessionId = req.cookies.sessionId;
    
    try {
        const session = await Session.findById(sessionId);
        if(!session) {
            return next(errorResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid session'));
        }

        const recentMood = await Mood.findOne({ userId: session.userId })
            .sort({ createdAt: -1 })
            .select('moodlevel createdAt')
            .lean();

        if(!recentMood) {
            return successResponse(res, StatusCodes.OK, 'No mood entries found');
        }

        successResponse(res, StatusCodes.OK, 'Most recent mood fetched', recentMood);

    } catch (error) {
        console.error("Error fetching recent mood:", error);
        next(errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch mood data'));
    }
};

module.exports = {
    saveMood,
    getRecentMood
}