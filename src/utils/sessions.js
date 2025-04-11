// utils/sessionUtils.js
const Session = require('../models/session.model');
const User = require('../models/user.model');

async function getUserBySessionId(sessionId) {
  try {
    // 1. Find the session document
    const session = await Session.findById(sessionId);
    
    if (!session) {
      console.log('Session not found');
      return null;
    }

    // 2. Get user ID from session
    const userId = session.userId;

    if (!userId) {
      console.log('No user associated with session');
      return null;
    }

    // 3. Find and return the user
    const user = await User.findById(userId);
    return user;

  } catch (error) {
    console.error('Error fetching user from session:', error);
    return null;
  }
}

module.exports = getUserBySessionId