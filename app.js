const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerDocs = require('./swagger');
const zooRoutes = require('./routes/zooRoutes');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');
const authMiddleware = require('./middlewares/auth'); // Ajuste aquí

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
app.use('/api/zoos', authMiddleware, zooRoutes); // Elimina la línea duplicada
app.use('/api/animals', animalRoutes);
app.use('/api', authRoutes);

// Conexión a MongoDB con opciones adicionales
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
