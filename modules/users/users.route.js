import routes from '../core/routes.js';
import users_model from './user.model.js';


export default (app) => {
  const instance_route = routes(app, '/users', users_model);
  instance_route.setup({
    get: true, 
    create: true, 
    update: true, 
    delete: true
  });
};
