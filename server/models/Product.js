import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  referenceId: { type: String, required: true, index: { unique: true, sparse: true } },
  name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  currency: { type: String, default: 'NZD' },
  imageUrl: { type: String },
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)