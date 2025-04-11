const Session = require("../models/session.model");
const Mood = require("../models/mood.model")
const { errorResponse, successResponse } = require("../utils/responses.utils");
const { StatusCodes } = require('http-status-codes');



const saveMood = async (req, res, next)=>{
    if(req.guest){
        return successResponse(res, StatusCodes.FORBIDDEN, "Guest account won't store info")
    }

    try {
        const newMood = await Mood.create({
            userId: req.user.id ,
            moodLevel: req.body.moodLevel
        })
        console.log(newMood)
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

        const recentMood = await Mood.findOne({ userId: req.user.id })
            

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