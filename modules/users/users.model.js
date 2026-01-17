import mongoose from 'mongoose';
import model from '../core/model.js';
import user_validator from './users.validator.js';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  active: String
});

const mongoose_model = mongoose.model('User', userSchema);
const users_model = model(mongoose_model, user_validator);

export default users_model;
