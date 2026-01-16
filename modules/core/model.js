export default (model) => {
  return {
    find: async (query, params) => {
      const data = await model.find(query).limit(params.limit);
      return data;
    },
    create: async (data) => {
      const response = await model.create(data);
      return response;
    },
    update: async (id, data) => {
      const response = await model.findByIdAndUpdate(id, data, {new: true});
      return response;
    },
    delete: async (id) => {
      const response = await model.findByIdAndDelete(id);
      return response;
    }
  }
}