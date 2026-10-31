# 🦁 API REST de gestión de zoológicos

API REST para administrar zoológicos y sus animales, con registro de usuarios, inicio de sesión con **JWT** y documentación interactiva con **Swagger**.

**Frontend que la consume:** [zoo-web-app](https://github.com/Karen24Her/zoo-web-app)

## Funcionalidades

- Registro e inicio de sesión de usuarios con contraseñas cifradas (bcrypt) y token JWT.
- Cambio y restablecimiento de contraseña.
- CRUD de zoológicos y de animales, protegido con autenticación.
- Consulta de los animales de un zoológico.
- Documentación de todos los endpoints con Swagger en `/api-docs`.

## Tecnologías

Node.js · Express · MongoDB (Mongoose) · JWT · bcryptjs · Swagger

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/users` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión y obtener el token |
| GET / POST | `/api/zoos` | Listar o crear zoológicos 🔒 |
| GET / PUT / DELETE | `/api/zoos/:id` | Consultar, editar o eliminar un zoológico 🔒 |
| POST | `/api/animals` | Crear un animal 🔒 |
| GET | `/api/animals/zoo/:zooId` | Animales de un zoológico 🔒 |
| GET / PUT / DELETE | `/api/animals/:id` | Consultar, editar o eliminar un animal 🔒 |

🔒 Requiere el encabezado `Authorization: Bearer <token>`.

## Cómo ejecutarla

```bash
git clone https://github.com/Karen24Her/Taller-API-RESTFul.git
cd Taller-API-RESTFul
npm install
cp .env.example .env   # completa DB_CONNECTION y JWT_SECRET
npm start
```

Abre `http://localhost:3000/api-docs` para probar los endpoints.

## Estructura

```
controllers/   lógica de cada recurso
middlewares/   verificación del token JWT
models/        esquemas de Mongoose (usuario, zoológico, animal)
routes/        definición de endpoints
swagger.js     configuración de la documentación
```

## Autora

Karen Hernández — [LinkedIn](https://www.linkedin.com/in/karen-julieth-hernandez-chaparro-242432356/)
