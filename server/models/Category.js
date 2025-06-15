import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  uuid: { type: String },
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)