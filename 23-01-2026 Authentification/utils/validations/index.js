const { z } = require('zod');

const Validation =  (schema) => {
    try {

        const valid_data = schema.parse(req.body);
        return {
            isValid: true,
            data: valid_data
        };
    } catch (error) {

        if (error instanceof z.ZodError) {

            const errors = JSON.parse(error.message);
            return {
                isValid: false,
                error: {
                    path: errors.map(err => ({
                        field: err.path[0],
                        message: err.message
                    })),
                    message: "Error in your form, please verify !!!"
                }
            };
        }
    }
}

module.exports = Validation;