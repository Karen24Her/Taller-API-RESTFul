const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const https = require("node:https");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Zoológico",
      version: "1.0.0",
      description: "Documentación de la API que utiliza JWT para autenticación",
    },
    servers: [
      {
        url:"https://taller-api-restful-izu0.onrender.com", //"http://localhost:3001",  // Cambia esta URL por la de tu API en Render
        description: "API de producción en Render"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
