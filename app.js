const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerDocs = require('./swagger');
const zooRoutes = require('./routes/zooRoutes');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Ajusta esto a la URL de tu cliente
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Swagger documentation
swaggerDocs(app);

// Rutas
app.use('/api/zoos', zooRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api', authRoutes);

// ... (resto del código de conexión a la base de datos y creación de usuario por defecto)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));