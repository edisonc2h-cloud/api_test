import routes from '../core/routes.js';
import User from './user.model.js';

export default (app) => {
const model = {
  find: async (query, params) => {
    const users = await User.find(query).limit(params.limit);
    return users;
  },
  create: async (data) => {
    const user = await User.create(data);
    return user;
  },
  update: async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data, {new: true});
    return user;
  },
  delete: async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
};
routes(app, '/users', model);
};
