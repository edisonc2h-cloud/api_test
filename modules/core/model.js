import validateData from './validator.js';

export default (model, validator) => {
  return {
    find: async (query, params) => {
      const data = await model.find(query).limit(params.limit).select(params.select);
      return data;
    },
    create: async (data) => {
      validateData(data, validator);
      const response = await model.create(data);
      return response;
    },
    update: async (id, data) => {
      validateData(data, validator);
      const response = await model.findByIdAndUpdate(id, data, {new: true});
      return response;
    },
    delete: async (id) => {
      const response = await model.findByIdAndDelete(id);
      return response;
    }
  }
}