import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  isVerified: { type: Boolean, default: false },
  password: String,
  isBlocked: { type: Boolean, default: false },
  timestamp: String,
});

module.exports = mongoose.models.userAccounts || mongoose.model('userAccounts', userSchema);
