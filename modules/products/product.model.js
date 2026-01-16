import mongoose from 'mongoose';
import model from '../core/model.js';
import product_validator from './products.validator.js';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const mongoose_model = mongoose.model('Product', productSchema);
const product_model = model(mongoose_model, product_validator)

export default product_model;
