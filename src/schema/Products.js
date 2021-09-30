import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  timestamp: String,
  images: { type: String, required: true },
  reviewsCount: { type: Number, required: false },
  reviews: { type: String, required: false },
  orderPerUser: { type: Number, required: true },
  category: { type: String, required: true },
  offer: { type: String, required: false },
});

module.exports = mongoose?.models?.products || mongoose.model('products', productSchema);
