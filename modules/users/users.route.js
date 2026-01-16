import routes from '../core/routes.js';
import users_model from './user.model.js';


export default (app) => {
routes(app, '/users', users_model);
};
