import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Accept requests from any origin for now
app.use(express.json()); // Parse incoming JSON requests

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('JP Integrated Farm API is running...');
});

// Keep-awake ping route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is awake!' });
});

// Product Routes
app.use('/api/products', productRoutes);

// Auth Routes
app.use('/api/auth', authRoutes);

// Upload Routes
app.use('/api/upload', uploadRoutes);

// Review Routes
app.use('/api/reviews', reviewRoutes);

// Database Connection & Server Initialization
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  });
