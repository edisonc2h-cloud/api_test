import routes from '../core/routes.js';
import clients_model from './clients.model.js';

export default (app) => {
const instance_route = routes(app, '/clients', clients_model, {});
instance_route.setup({
    get: true, 
    create: true, 
    update: true, 
    delete: true 
  });
};
