import 'dotenv/config'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import User from '../models/User.js'
import Product from '../models/Product.js'
import { generateImageUrl } from '../utils/generate-image-url.js'
import { users } from './data/users.js'
import { products } from './data/products.js'

const createUserFromSeed = (data) => {
  const {
    email,
    password,
    firstName,
    middleName,
    lastName,
    role
  } = data

  const productModel = {
    email,
    password,
    firstName,
    middleName,
    lastName,
    cart: [],
    role: role || 'customer'
  }

  return User.create(productModel)
}

const createProductFromSeed = (data) => {
  const {
    name,
    label,
    description = '',
    price,
    currency = 'NZD',
  } = data

  const productModel = {
    referenceId: uuidv4(),
    name,
    label,
    description,
    price,
    currency,
    imageUrl: generateImageUrl(name),
  }

  return Product.create(productModel)
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log('Connected to MongoDB')

    // Clear old entries
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.collection('products').deleteMany({})
    console.log('Old users and products cleared')

    for (const data of users) {
      await createUserFromSeed(data)
      console.log(`User Seeded: ${data.email}`)
    }
    for (const data of products) {
      await createProductFromSeed(data)
      console.log(`Product Seeded: ${data.label}`)
    }

    console.log('✅ All users and products seeded.')
    await mongoose.disconnect()
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

seed()