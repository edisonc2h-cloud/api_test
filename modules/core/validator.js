export default (data, validator) => {
  for (const property in validator) {
    if (property in data) {
      const validators = validator[property];
      const value = data[property];    
      for (const validateFn of validators) {
        validateFn(value);
      }
    }
  }
}