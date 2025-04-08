const { StatusCodes } = require('http-status-codes');
const Assessment = require('../models/assessment.models');
const { errorResponse, successResponse } = require('../utils/responses.utils');
const getUserBySessionId = require('../utils/sessions.utils');


const createAssessment = async (req, res) => {
  try {

    if(req.guest){
      return errorResponse(res, StatusCodes.FORBIDDEN, "Can't store guest's data")
    }

    const sessionId = req.cookies.sessionId
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return errorResponse(res,StatusCodes.BAD_REQUEST, 'invalid responses')
    }

    
    const totalScore = responses.reduce((acc, response) => {
      return acc + (response.score || 0);
    }, 0);

    const user = await getUserBySessionId(sessionId)
    if(!user){
      return errorResponse(res, StatusCodes.UNAUTHORIZED, 'valid SessionId required')
    }
    
    const assessment = await Assessment.create({
      userId : user.id,
      responses,
      totalScore
    });

  

    successResponse(res, StatusCodes.OK, 'assessment stored successfully');
    
  } catch (error) {
    console.error('Assessment creation error:', error);
    errorResponse(res, StatusCodes.BAD_REQUEST, "Couldn't store assessment entry")
  }
};



const getAssessments = async (req, res) => {
  if(req.guest){
    return errorResponse(res, StatusCodes.FORBIDDEN, "No data for guests")
  }
  try {
    const user = await getUserBySessionId(req.cookies.sessionId)
    const assessments = await Assessment.find({ userId: user.id })
      .sort('-timestamp')
      .lean()

    successResponse(res, StatusCodes.OK, 'Successfully fetched assessments', assessments)
  } catch (error) {
    console.error('Get assessments error:', error);
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Couldnt get assessments")
  }
};




const getMostRecentAssessment = async (req,res,next)=>{
  if(req.guest){
    return errorResponse(res, StatusCodes.FORBIDDEN, "No data for guests")
  }

  try {
    const sessionId = req.cookies.sessionId;
    const user = await getUserBySessionId(sessionId);
    
    if (!user) {
      return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid session');
    }

    const assessment = await Assessment.findOne({ userId: user.id })
      .sort({ timestamp: -1 })
      .select('totalScore responses timestamp')
      .lean();

    if (!assessment) {
      return successResponse(res, StatusCodes.OK, 'No assessments found', {});
    }


    successResponse(res, StatusCodes.OK, 'Most recent assessment fetched', assessment);
    
  } catch (error) {
    console.error('Get recent assessment error:', error);
    errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch recent assessment");
  }
};

module.exports = {
  createAssessment,
  getAssessments,
  getMostRecentAssessment
};
