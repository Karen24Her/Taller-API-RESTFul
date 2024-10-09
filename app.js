const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importa cors
const dotenv = require('dotenv');
const swaggerDocs = require('./swagger');
const zooRoutes = require('./routes/zooRoutes');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');  // Importa el modelo del usuario

dotenv.config();

const app = express();
app.use(express.json());

// Habilita CORS para todas las rutas
app.use(cors());

// Swagger documentation
swaggerDocs(app);

// Rutas para zoológicos y animales
app.use('/api/zoos', zooRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api', authRoutes);

// Ruta para la raíz ("/") - Muestra un mensaje o redirige a Swagger
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Zoológicos y Animales');
  // Si prefieres redirigir a Swagger, puedes usar esta línea en su lugar:
   res.redirect('/api-docs');  // Cambia '/api-docs' por la ruta real de tu documentación Swagger
});

// Conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Connected to DB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

async function createDefaultUser() {
  const username = 'karen';  // Define el nombre de usuario deseado
  const password = '$2a$10$Jw6nEENd19izFLMZ2TR9.O9Dp0bh3.hnjyLKs7pPbVUGcgSlyflUO';  // Reemplaza con el hash generado anteriormente

  try {
    // Verifica si el usuario ya existe
    const user = await User.findOne({ username });
    if (user) {
      console.log('El usuario ya existe');
      return;
    }

    // Si el usuario no existe, crea uno nuevo
    const newUser = new User({
      username,
      password,  // Ya está encriptado
    });

    await newUser.save();
    console.log('Usuario creado exitosamente');
  } catch (err) {
    console.error('Error al crear el usuario', err);
  }
}

// Llamar a la función para crear el usuario al iniciar el servidor
createDefaultUser();

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
