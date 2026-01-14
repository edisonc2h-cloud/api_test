export default (app, path, model) => {
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
};