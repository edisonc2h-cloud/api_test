import routes from '../core/routes.js';
import Product from './product.model.js';

export default (app) => {
const model = {
    find: async (query, params) => {
    const products = await Product.find(query).limit(params.limit).skip(params.skip);
    return products;
  },
  create: async (data) => {
    const product = await Product.create(data);
    return product;
  }
};
routes(app, '/products', model);
};
