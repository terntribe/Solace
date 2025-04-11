const mongoose = require('mongoose');


const reminderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  activity: { 
    type: String,
    enum: ["Meditation", "Exercise", "Journaling", "Breathing", "Reading"],
    required: true
  },
  time: { 
    type: Date,
    required: true 
  },
  repeat: {
    type: [String],
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    default: []
  },
  status: {
    type: String,
    enum: ["active", "snoozed", "completed"],
    default: "active"
  }
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;