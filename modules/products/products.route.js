import routes from '../core/routes.js';
import products_model from './product.model.js';
import products_permissions from './products.permissions.js';

export default (app) => {
const instance_route = routes(app, '/products', products_model, products_permissions);
instance_route.setup({
    get: true, 
    create: true, 
    update: true, 
    delete: true 
  });
};
