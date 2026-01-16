import mongoose from 'mongoose';
import model from '../core/model.js';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const mongoose_model = mongoose.model('Product', productSchema);
const product_model = model(mongoose_model)

export default product_model;
