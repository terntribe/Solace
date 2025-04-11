const { StatusCodes } = require("http-status-codes");
const { successResponse, errorResponse } = require("../utils/responses.utils");
const Assessment = require("../models/assessment.models");



const getDashboardData = async (req, res, next) => {
    try {
      console.log(req.user)
      const assessments = await Assessment.find({ userId: req.user.id }).sort('-createdAt');
      const totalAssessments = assessments.length;
  
      const dashboardData = {
        username: req.user.username,
        achievements: [
          `You've completed ${totalAssessments} assessment${totalAssessments !== 1 ? 's' : ''}`
        ],
        Streak: req.user.streak,
        lastAssessment: assessments[0] || null
      };
  
      successResponse(res, StatusCodes.OK, 'Successfully retrieved dashboard data', dashboardData)
      
    } catch (error) {
        console.log("error from dashboard.controllers.js", error)
      errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to load dashboard');
    }
  };


module.exports = {getDashboardData}