const { StatusCodes } = require('http-status-codes');

const { successResponse, errorResponse } = require('../utils/responses.utils');
const Reminder = require('../models/reminders.model');

const createReminder = async (req, res, next) => {
    try {
        const { activity, time, repeat } = req.body;
        const userId = req.user.id; // Assuming user is authenticated

        const newReminder = await Reminder.create({
            userId,
            activity,
            time: new Date(time),
            repeat
        });

        successResponse(res, StatusCodes.CREATED, 'Goal created successfully', newReminder);
    } catch (error) {
        console.error('Create reminder error:', error);
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create reminder');
    }
};

// const deleteGoal = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user.id;

//         const deletedGoal = await Goal.findOneAndDelete({
//             _id: id,
//             userId
//         });

//         if (!deletedGoal) {
//             return errorResponse(res, StatusCodes.NOT_FOUND, 'Goal not found');
//         }

//         successResponse(res, StatusCodes.OK, 'Goal deleted successfully');
//     } catch (error) {
//         console.error('Delete goal error:', error);
//         errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete goal');
//     }
// };

const getAllReminders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reminders = await Reminder.find({ userId })
            .sort({ time: 1 });

        successResponse(res, StatusCodes.OK, 'Reminders retrieved successfully', reminders);
    } catch (error) {
        console.error('Get all reminders error:', error);
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve reminders');
    }
};

const getUpcomingReminders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        
        const upcomingReminders = await Reminder.find({
            userId,
            time: { $gte: now },
            status: 'active'
        })
        .sort({ time: 1 })
        .limit(5);

        successResponse(res, StatusCodes.OK, 'Upcoming reminders retrieved', upcomingReminders);
    } catch (error) {
        console.error('Get upcoming reminders error:', error);
        errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve upcoming reminders');
    }
};

module.exports = {
    createReminder,
    getAllReminders,
    getUpcomingReminders
};