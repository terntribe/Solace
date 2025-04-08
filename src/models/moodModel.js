const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    moodLevel: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

}, {timestamps: true})

const Mood = mongoose.model("Mood" , moodSchema);
module.exports = Mood;