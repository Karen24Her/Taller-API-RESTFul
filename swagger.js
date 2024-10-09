const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir la configuración para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Utiliza la versión 3.0.0 de OpenAPI
    info: {
      title: 'Zoológico API', // Título de tu API
      version: '1.0.0', // Versión de tu API
      description: 'API para la gestión de Zoológicos y Animales', // Descripción
      contact: {
        name: 'Tu Nombre', // Contacto del desarrollador
      },
      servers: [
        {
          url: 'http://localhost:3000', // URL del servidor
        },
      ],
    },
  },
  apis: ['./routes/*.js'], // Rutas de los archivos que contienen tus endpoints
};

// Inicializar Swagger JSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  // Configurar Swagger UI para servir la documentación en /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el usuario
 */
