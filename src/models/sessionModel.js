const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  revoked: { type: Boolean, default: false }
}, { timestamps: true });


const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
