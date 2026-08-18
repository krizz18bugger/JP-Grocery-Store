import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Create new review
// @route   POST /api/reviews/:productId
// @access  Private
export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.productId;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);

    if (product) {
      const alreadyReviewed = await Review.findOne({
        product: productId,
        user: userId,
      });

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = new Review({
        product: productId,
        user: userId,
        rating: Number(rating),
        comment,
      });

      await review.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error adding review', error: error.message });
  }
};

// @desc    Get product reviews
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  const productId = req.params.productId;

  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching reviews', error: error.message });
  }
};
