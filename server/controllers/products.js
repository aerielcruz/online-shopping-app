import Product from "../models/Product.js";
import { mapProductResponse } from "../helpers/product-mapper.js";

const getProducts = async (req, res, next) => {
  try {
    const { ids } = req.query

    // This query will only return the following properties
    let selectQuery = '-_id referenceId name label description price currency imageUrl'
    let filter = {}

    const idArray = ids ? ids.split(',') : []; // Split comma-separated IDs into an array
    if (idArray.length === 1) {
      const product = await Product.findOne({ referenceId: idArray[0] })
      return res.status(200).send({ data: mapProductResponse(product) })
    } else if (idArray.length > 1) {
      filter.referenceId = { $in: idArray };
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