import routes from '../core/routes.js';
import Client from './client.model.js';

export default (app) => {
const model = {
  find: async (query, params) => {
    const clients = await Client.find(query).limit(params.limit);
    return clients;
  },
  create: async (data) => {
    const client = await Client.create(data);
    return client;
  },
  update: async (id, data) => {
    const client = await Client.findByIdAndUpdate(id, data, {new: true});
    return client;
  },
  delete: async (id) => {
    const client = await Client.findByIdAndDelete(id);
    return client;
  }
};
routes(app, '/clients', model);
};
