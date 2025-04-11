const { Router } = require("express");
const { loginAccount, createAccount, logoutAccount, createGuestAccount } = require("../controllers/userAuthControlller");
const { signUpValidation } = require("../middleware/userAuthValidations");
const { isLoggedIn } = require("../middleware/authToken");
const { saveMood, getRecentMood } = require("../controllers/moodController");
const authRouter = require("./auth.route");


const moodRouter = Router()
authRouter.post("/", isLoggedIn, saveMood);
authRouter.get("/", isLoggedIn, getRecentMood);

module.exports = moodRouter;