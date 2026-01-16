export default (data, validator) => {
  for (const property in data) {
    if (validator && validator[property]) {
      const validators = validator[property];
      const value = data[property];
      for (const validateFn of validators) {
        validateFn(value);
      }
    }
  }
}