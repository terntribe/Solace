const User = require("../models/user.model")

async function updateStreak(userId) {
    const currentUser = await User.findById(userId)

  if (currentUser.streak === undefined || currentUser.lastStreakUpdate === undefined) {
    currentUser.streak = 1
    currentUser.lastStreakUpdate = Date.now();
    await currentUser.save();
    console.log(currentUser);
  return;
}



    let currentStreak = currentUser.streak 
    let lastStreakUpdate_local = currentUser.lastStreakUpdate


    
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const lastCheckIn = new Date(lastStreakUpdate_local);
    lastCheckIn.setHours(0, 0, 0, 0);
  
    const yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24))
    yesterday.setHours(0,0,0,0);

    if (lastCheckIn.getTime() === today.getTime()) {
        // No change to streak since it's already today
        console.log("streak today")
        return;
      }
    
      // If last check-in was not yesterday, reset streak to 1
      if (lastCheckIn.getTime() !== yesterday.getTime()) {
        currentStreak = 1;
      } else {
        // If last check-in was yesterday, increment streak
        currentStreak += 1;
      }



    
    
    currentUser.streak = currentStreak
    currentUser.lastStreakUpdate = Date.now();
    await currentUser.save();
    console.log(currentUser);
  }
  
  module.exports = { updateStreak };
  