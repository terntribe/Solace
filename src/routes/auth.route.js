const { Router } = require("express");
const { loginAccount, createAccount, logoutAccount, createGuestAccount } = require("../controllers/userAuth.controllers");
const { signUpValidation } = require("../middleware/userAuthValidations");
const { isLoggedIn } = require("../middleware/authToken");


const authRouter = Router()
authRouter.post("/sign-up", signUpValidation, createAccount);
authRouter.post("/login", loginAccount);
authRouter.get("/logout",isLoggedIn ,logoutAccount);
authRouter.post("/guest", createGuestAccount);

module.exports = authRouter;