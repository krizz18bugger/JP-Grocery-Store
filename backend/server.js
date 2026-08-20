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

const ALLOWED_ORIGINS = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean);

app.use(cors({ origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : '*', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('JP Integrated Farm API is running...');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is awake!' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

export default app;
