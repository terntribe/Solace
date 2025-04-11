const { Router } = require("express");
const { isLoggedIn } = require("../middleware/authToken");
const { saveMood, getRecentMood } = require("../controllers/mood.controllers");


const moodRouter = Router()
moodRouter.post("/", isLoggedIn, saveMood);
moodRouter.get("/", isLoggedIn, getRecentMood);

module.exports = moodRouter;