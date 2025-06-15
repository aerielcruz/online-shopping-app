import Product from "../models/Product.js";
import { mapProductResponse } from "../helpers/product-mapper.js";

const getProducts = async (req, res) => {
  try {
    const { id } = req.query

    if (id) {
      const product = await Product.findOne({ uuid: id })
      return res.status(200).send({ data: mapProductResponse(product) })
    }

    const products = await Product.find().select('name label description price currency stockQuantity isActive')
    res.status(200).send({ data: products })
  } catch (err) {
    next()
  }
}

export default {
  getProducts
}