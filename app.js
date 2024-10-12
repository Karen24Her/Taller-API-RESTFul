const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { swaggerUi, swaggerDocs } = require('./swagger');
const zooRoutes = require('./routes/zooRoutes');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/auth');

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta raíz (ruta principal de tu aplicación)
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del Zoológico');
});

// Rutas protegidas con JWT
app.use('/api/zoos', authMiddleware, zooRoutes);
app.use('/api/animals', authMiddleware, animalRoutes);
app.use('/api', authRoutes);
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to DB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

connectDB();

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
