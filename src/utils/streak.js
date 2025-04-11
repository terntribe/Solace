const User = require("../models/userModel")

async function updateStreak(userId) {
    const currentUser = await User.findById(userId)
    let streak = currentUser.streak || 0
    let lastLogin = currentUser.lastLogin || Date.now()
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const lastCheckIn = new Date(lastLogin);
    lastCheckIn.setHours(0, 0, 0, 0);
  
    const yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24))
    yesterday.setHours(0,0,0,0);

    if (lastCheckIn.getTime() === today.getTime()) {
        // No change to streak since it's already today
        return;
      }
    
      // If last check-in was not yesterday, reset streak to 1
      if (lastCheckIn.getTime() !== yesterday.getTime()) {
        streak = 1;
      } else {
        // If last check-in was yesterday, increment streak
        streak += 1;
      }


    
    await User.findByIdAndUpdate(userId, {
        streak: streak,
        lastLogin: Date.now()
    })
  }
  
  module.exports = { updateStreak };
  