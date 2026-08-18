import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    console.log('🧹 Existing data cleared.');

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@jpfarm.com',
      password: 'admin123', // Will be hashed by the pre-save hook in User model
      role: 'admin',
      phone: '9876543210'
    });

    console.log('👤 Admin user created.');

    // Create Dummy Products (7 categories with Tamil names)
    const dummyProducts = [
      {
        name: 'Turmeric Face Pack',
        category: 'சரும பராமரிப்பு',
        price: 250,
        ingredients: 'Turmeric, Sandalwood',
        purpose: 'Glowing Skin',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Skin+Care',
      },
      {
        name: 'Herbal Hair Oil',
        category: 'கூந்தல் பராமரிப்பு',
        price: 350,
        ingredients: 'Amla, Bhringraj, Coconut Oil',
        purpose: 'Hair Growth',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Hair+Care',
      },
      {
        name: 'Cold Pressed Groundnut Oil',
        category: 'இயற்கை சமையல் எண்ணெய்',
        price: 450,
        ingredients: 'Groundnuts',
        purpose: 'Healthy Cooking',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Cooking+Oil',
      },
      {
        name: 'Multigrain Health Mix',
        category: 'சத்துமாவு',
        price: 300,
        ingredients: 'Ragi, Wheat, Millets, Nuts',
        purpose: 'Nutritious Breakfast',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Health+Mix',
      },
      {
        name: 'Moringa Soup Powder',
        category: 'இயற்கை சூப் பொடி',
        price: 150,
        ingredients: 'Moringa Leaves, Pepper, Cumin',
        purpose: 'Immunity Booster',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Soup+Powder',
      },
      {
        name: 'Organic Country Eggs',
        category: 'நாட்டுக்கோழி, முட்டை',
        price: 180,
        ingredients: 'Free-range Eggs',
        purpose: 'High Protein',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Country+Eggs',
      },
      {
        name: 'Handmade Coconut Oil Soap',
        category: 'தேங்காய் எண்ணெய் சோப்புகள்',
        price: 120,
        ingredients: 'Pure Coconut Oil, Essential Oils',
        purpose: 'Moisturizing',
        availability: 'In Stock',
        imageUrl: 'https://placehold.co/400x400/png?text=Coconut+Soap',
      }
    ];

    await Product.insertMany(dummyProducts);
    console.log('🌱 Dummy products inserted.');

    console.log('🎉 Database Seeding Completed Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error Seeding Database:', error);
    process.exit(1);
  }
};

seedDatabase();
