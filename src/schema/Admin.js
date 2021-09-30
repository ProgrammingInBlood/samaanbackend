import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.models.admins || mongoose.model('admins', adminSchema);
