

const getDashboardData = async (req, res, next) => {
    try {
      const sessionId = req.cookies.sessionId;
      const user = await getUserBySessionId(sessionId);
      
      if (!user) return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid session');
  
      const assessments = await Assessment.find({ user: user.id }).sort('-createdAt');
      const totalAssessments = assessments.length;
  
      const dashboardData = {
        username: user.username,
        achievements: [
          `You've completed ${totalAssessments} assessment${totalAssessments !== 1 ? 's' : ''}`
        ],
        Streak: user.streak,
        lastAssessment: assessments[0] || null
      };
  
      res.locals.dashboardData = dashboardData;
      next();
      
    } catch (error) {
        console.log("error from dashboard.controllers.js", error)
      errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to load dashboard');
    }
  };


module.exports = {getDashboardData}