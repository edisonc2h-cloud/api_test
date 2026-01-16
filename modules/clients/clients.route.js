import routes from '../core/routes.js';
import clients_model from './client.model.js';

export default (app) => {
routes(app, '/clients', clients_model);
};
