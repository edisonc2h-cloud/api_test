import routes from '../core/routes.js';
import products_model from './product.model.js';

export default (app) => {
const instance_route = routes(app, '/products', products_model);
instance_route.setup({
    get: true, 
    create: true, 
    update: true, 
    delete: true 
  });
};
