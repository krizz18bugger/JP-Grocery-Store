import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: req.file.secure_url });
  } else {
    res.status(400).json({ message: 'No image file provided' });
  }
});

export default router;
