import routes from '../core/routes.js';
import Product from './product.model.js';

export default (app) => {
const model = {
    find: async (query, params) => {
    const products = await Product.find(query).limit(params.limit);
    return products;
  },
  create: async (data) => {
    const product = await Product.create(data);
    return product;
  },
  update: async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, {new: true});
    return product;
  },
  delete: async (id) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
};
routes(app, '/products', model);
};
