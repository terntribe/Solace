const {Router} = require("express");
const { isLoggedIn } = require("../middleware/authToken");
const { createReminder, getAllReminders, getUpcomingReminders } = require("../controllers/reminders.controllers");

const reminderRouter = Router();
reminderRouter.get("/", isLoggedIn, getAllReminders);
reminderRouter.post("/", isLoggedIn, createReminder)
reminderRouter.get("/upcoming" , isLoggedIn, getUpcomingReminders)



module.exports = reminderRouter;