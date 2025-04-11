const { Router } = require("express");
const { isLoggedIn } = require("../middleware/authToken");
const { createAssessment, getAssessments, getMostRecentAssessment } = require("../controllers/assessments.controllers");



const assessmentRouter = Router()
assessmentRouter.post("/", isLoggedIn, createAssessment);
assessmentRouter.get("/", isLoggedIn, getAssessments);
assessmentRouter.get("/me", isLoggedIn, getMostRecentAssessment)

module.exports = assessmentRouter;