const PORT = process.env.PORT || 3000;

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Simple Auth API",
        description: "API documentation for Simple Auth",
        version: "1.0.0"
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Local server"
        }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    paths: {
        "/register": {
            post: {
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    first_name: { type: "string" },
                                    last_name: { type: "string" },
                                    email: { type: "string", format: "email" },
                                    password: { type: "string", minLength: 8 },
                                    confirm_password: { type: "string", minLength: 8 }
                                },
                                required: ["first_name", "last_name", "email", "password", "confirm_password"]
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "User registered successfully"
                    },
                    400: {
                        description: "Validation error"
                    },
                    404: {
                        description: "Email already exist !!!"
                    }
                }
            }
        },
        "/me": {
            get: {
                summary: "Get current user information",
                security: [
                    { BearerAuth: [] }
                ],
                responses: {
                    200: {
                        description: "User information retrieved successfully"
                    },
                    401: {
                        description: "Unauthorized"
                    }
                }
            }
        }
    }
};

module.exports = swaggerDocument;
