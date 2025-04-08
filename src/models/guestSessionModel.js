const mongoose = require("mongoose");

const guestSessionSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  revoked: { type: Boolean, default: false }
}, { timestamps: true });


const guestSession = mongoose.model("GuestSession", guestSessionSchema);
module.exports = guestSession;
