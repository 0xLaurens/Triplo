import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  Email: String,
  Firstname: String,
  Lastname: String,
  Created: Date,
  DateOfBirth: Date,
  Password: String,
})
