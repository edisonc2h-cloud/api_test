export default (permissions) => {
    return {
        validateFields: (operation, fields) => {
            if (!permissions[operation]) {
                return { valid: true };
            }
            
            const invalidFields = fields.filter(field => !permissions[operation].includes(field));
            
            if (invalidFields.length > 0) {
                return {
                    valid: false,
                    error: `Campos no permitidos en ${operation}: ${invalidFields.join(', ')}`
                };
            }
            
            return { valid: true };
        },
        
        getAllowedFields: (operation) => {
            return permissions[operation] || [];
        }
    };
};
