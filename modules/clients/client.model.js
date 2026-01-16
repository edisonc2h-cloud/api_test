import mongoose from 'mongoose';
import model from '../core/model.js';

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String
});

const mongoose_model = mongoose.model('Client', clientSchema);
const clients_model = model(mongoose_model);

export default clients_model;
