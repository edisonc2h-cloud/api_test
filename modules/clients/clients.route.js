import routes from '../core/routes.js';
import Client from './client.model.js';

export default (app) => {
const model = {
  find: async (query, params) => {
    const clients = await Client.find(query).limit(params.limit);
    return clients;
  }
};
routes(app, '/clients', model);
};
