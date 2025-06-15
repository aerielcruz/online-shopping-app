import Product from "../models/Product.js";
import { mapProductResponse } from "../helpers/product-mapper.js";

const getProducts = async (req, res, next) => {
  try {
    const { id, name } = req.query
    const isAdmin = req.user.role === 'admin'

    if (id) {
      const product = await Product.findOne({ uuid: id })
      return res.status(200).send({ data: mapProductResponse(product) })
    }

    // This query will only return the following properties
    let selectQuery = '-_id uuid name label sku description price currency stockQuantity'
    let filter = {}

    if (isAdmin) {
      selectQuery += ' isActive'
    } else {
      filter.isActive = true
    }
    if (name) {
      filter.name = { $regex: "keyword", $options: "i" }
    }

    const products = await Product.find(filter).select(selectQuery)
    res.status(200).send({ data: products })
  } catch (err) {
    next()
  }
}

export default {
  getProducts
}