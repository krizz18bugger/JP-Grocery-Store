import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: String,
    },
    purpose: {
      type: String,
    },
    availability: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Coming Soon'],
      default: 'In Stock',
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true 
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
