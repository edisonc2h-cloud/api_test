import routes from '../core/routes.js';
import users_model from './users.model.js';
import users_permissions from './users.permissions.js';


export default (app) => {
  const instance_route = routes(app, '/users', users_model, users_permissions);
  instance_route.setup({
    get: true, 
    create: true, 
    update: true, 
    delete: true
  });
};
