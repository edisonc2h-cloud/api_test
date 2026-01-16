import routes from '../core/routes.js';
import products_model from './product.model.js';

export default (app) => {
routes(app, '/products', products_model);
};
