export const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "E-commerce API",
      description: "API for Backend APP E-commerce",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};
