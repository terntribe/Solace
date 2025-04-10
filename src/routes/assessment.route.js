const { Router } = require("express");
const { isLoggedIn } = require("../middleware/authToken");
const { createAssessment, getAssessments, getMostRecentAssessment } = require("../controllers/assessments.controllers");



const assessmentRouter = Router()
assessmentRouter.post("/self-assessment", isLoggedIn, createAssessment);
assessmentRouter.get("/self-assessment", isLoggedIn, getAssessments);
assessmentRouter.get("self-assessment/me", isLoggedIn, getMostRecentAssessment)

module.exports = assessmentRouter;