import 'dotenv/config'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import Product from '../models/Product.js'
import { generateImageUrl } from '../utils/generate-image-url.js'
import { products } from '../data/products.js'

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
    await mongoose.connection.collection('products').deleteMany({})
    console.log('Old products cleared')

    for (const data of products) {
      await createProductFromSeed(data)
      console.log(`Seeded: ${data.label}`)
    }

    console.log('✅ All products seeded.')
    await mongoose.disconnect()
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

seed()