import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  currency: { type: String, default: 'NZD', required: false },
  stockQuantity: { type: Number, default: 0, required: true },
  isActive: { type: Boolean, default: true, required: false }
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)