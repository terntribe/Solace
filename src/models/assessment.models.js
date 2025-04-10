const mongoose = require('mongoose')


const assessmentSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    timestamp: { 
      type: Date, 
      default: Date.now 
    },
    responses: [{
      step: Number, 
      question: String,
      answer: String, 
      score: Number 
    }],
    totalScore: { 
      type: Number, 
      min: 0, 
      max: 27 
    }
  });

const Assessment = mongoose.model('Assessment', assessmentSchema)
module.exports = Assessment;