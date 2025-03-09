const { Router } = require("express");
const { loginAccount, createAccount, logoutAccount } = require("../controllers/userAuthControlller");
const { signUpValidation } = require("../middleware/userAuthValidations");
const { isLoggedIn } = require("../middleware/authToken");


const authRouter = Router()
authRouter.post("/sign-up", signUpValidation, createAccount);
authRouter.post("/login", loginAccount);
authRouter.get("/logout",isLoggedIn ,logoutAccount);
module.exports = authRouter;