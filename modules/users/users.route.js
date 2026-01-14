import routes from '../core/routes.js';
import User from './user.model.js';

export default (app) => {
const model = {
  find: async (query, params) => {
    const users = await User.find(query).limit(params.limit);
    return users;
  }
};
routes(app, '/users', model);
};
