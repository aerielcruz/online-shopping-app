import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  uuid: { type: String },
  name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String },
  sku: { type: String, required: true, index: { unique: true, sparse: true } },
  price: { type: Number, required: true },
  currency: { type: String, default: 'NZD' },
  stockQuantity: { type: Number, default: 0, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)