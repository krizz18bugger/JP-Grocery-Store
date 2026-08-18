import express from 'express';
import { createReview, getProductReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:productId')
  .get(getProductReviews)
  .post(protect, createReview);

export default router;
