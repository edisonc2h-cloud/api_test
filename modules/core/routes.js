import permissionsModule from './permissions.js';

export default (app, path, model, permissions) => {

    const permissionsHandler = permissionsModule(permissions || {});
    
    return {
        setup: (operation) => {
            if (operation.get === true) {
                app.get(path, async (req, res) => {
                    try {
                        const {limit, select, ...query} = req.query;
                        let allowedSelect = select;
                        
                        if (Object.keys(query).length > 0) {
                            const queryFields = Object.keys(query);
                            const validation = permissionsHandler.validateFields('get', queryFields);
                            
                            if (!validation.valid) {
                                throw validation.error;
                            }
                        }

                        if (select) {
                            const selectFields = select.split(/\s+/).filter(f => f.trim());
                            const validation = permissionsHandler.validateFields('get', selectFields);
                            
                            if (!validation.valid) {
                                throw validation.error;
                            }
                        }
                        
                        if (permissions && permissions.get) {
                            allowedSelect = select || permissions.get.join(' ');
                        }
                        
                        const params = {limit: parseInt(limit), select: allowedSelect};
                        const data = await model.find(query, params);
                        res.json({data: data, count: data.length, errors: []});
                    } catch (error) {
                        res.json({data: [], count: 0, errors: error.toString()});
                    }
                });
            }

            if (operation.create === true) {
                app.post(path, async (req, res) => {
                    try {
                        const bodyFields = Object.keys(req.body);
                        const validation = permissionsHandler.validateFields('create', bodyFields);
                        
                        if (!validation.valid) {
                            throw validation.error;
                        }
                        
                        const data = await model.create(req.body);
                        res.json({data: data, errors: []});
                    } catch (error) {
                        res.json({data: null, errors: error.toString()});
                    }
                });
            }

            if (operation.update === true) {
                app.put(`${path}/:id`, async (req, res) => {
                    try {
                        const bodyFields = Object.keys(req.body);
                        const validation = permissionsHandler.validateFields('update', bodyFields);
                        
                        if (!validation.valid) {
                            throw validation.error;
                        }
                        
                        const {id} = req.params;
                        const data = await model.update(id, req.body);
                        res.json({data: data, errors: []});
                    } catch (error) {
                        res.json({data: null, errors: error.toString()});
                    }
                });
            }

            if (operation.delete === true) {
                app.delete(`${path}/:id`, async (req, res) => {
                    try {
                        const {id} = req.params;
                        const data = await model.delete(id);
                        res.json({data: data, errors: []});
                    } catch (error) {
                        res.json({data: null, errors: error.toString()});
                    }
                });
            }
        }
    }
  
};