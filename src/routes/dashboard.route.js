const { Router } = require("express");
const { isLoggedIn } = require("../middleware/authToken");
const { getDashboardData } = require("../controllers/dashboard.controllers");



const dashboardRouter = Router()
dashboardtRouter.post("/", isLoggedIn, getDashboardData);

module.exports = dashboardRouter;