export default (app, path, model) => {
    return {
        setup: (operation) => {
            if (operation.get === true) {
                app.get(path, async (req, res) => {
                    try {
                        const {limit, ...query} = req.query;
                        const params = limit ? {limit: parseInt(limit)} : {};
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