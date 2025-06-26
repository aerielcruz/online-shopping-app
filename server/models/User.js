import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  referenceId: { type: String },
  email: { type: String, require: true, index: { unique: true, sparse: true } },
  password: { type: String, required: true, select: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  suffix: { type: String },
  cart: [
    {
      productId: { type: String, required: true, },
      quantity: { type: Number, default: 1, required: true },
    }
  ],
  role: { type: String, enum: ['customer', 'admin'], default: 'customer', required: true }
}, {
  timestamps: true
})

UserSchema.pre('save', function (next) {
  const user = this

  user.email = user.email?.toLowerCase()

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

export default mongoose.models.User || mongoose.model('User', UserSchema)