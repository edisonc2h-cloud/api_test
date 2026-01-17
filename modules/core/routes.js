export default (app, path, model, permissions) => {
    return {
        setup: (operation) => {
            if (operation.get === true) {
                app.get(path, async (req, res) => {
                    try {
                        const {limit, select, ...query} = req.query;
                        let allowedSelect = select;
                        
                        if (permissions.get) {
                            console.log(query)
                            const queryFields = Object.keys(query);
                            const invalidFields = queryFields.filter(field => !permissions.get.includes(field));
                            
                            if (invalidFields.length > 0) {
                                throw (`Campos no permitidos en la consulta: ${invalidFields.join(', ')}`);
                            }

                            if (select) {
                                console.log(select)
                                const selectFields = select.split(/\s+/).filter(f => f.trim());
                                const invalidSelectFields = selectFields.filter(field => !permissions.get.includes(field));
                                
                                if (invalidSelectFields.length > 0) {
                                    throw (`Campos no permitidos en select: ${invalidSelectFields.join(', ')}`);
                                }
                            }
                            
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
                        if (permissions.create) {
                            const bodyFields = Object.keys(req.body);
                            const invalidFields = bodyFields.filter(field => !permissions.create.includes(field));
                            
                            if (invalidFields.length > 0) {
                                throw (`Campos no permitidos en el body: ${invalidFields.join(', ')}`);
                            }
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
                        if (permissions.update) {
                            const bodyFields = Object.keys(req.body);
                            const invalidFields = bodyFields.filter(field => !permissions.update.includes(field));
                            
                            if (invalidFields.length > 0) {
                                throw (`Campos no permitidos en el body: ${invalidFields.join(', ')}`);
                            }
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