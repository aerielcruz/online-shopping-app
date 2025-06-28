import { v4 as uuidv4 } from 'uuid';
import Product from "../../models/Product.js";
import { mapProductResponse } from "../../helpers/product-mapper.js";
import { generateImageUrl } from "../../utils/generate-image-url.js";

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      label,
      description,
      price,
      currency,
    } = req.body

    const productModel = {
      referenceId: uuidv4(),
      name,
      label,
      description,
      price,
      currency,
      imageUrl: generateImageUrl(name),
    }

    const product = await Product.create(productModel)
    res.status(200).send({ data: mapProductResponse(product) })
  } catch (err) {
    next(err)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const {
      referenceId,
      name,
      label,
      description,
      price,
      currency,
    } = req.body

    const productModel = {
      name,
      label,
      description,
      price,
      currency,
    }

    const product = await Product.findOneAndUpdate(
      { referenceId },
      { $set: productModel },
      { new: true }
    )
    res.status(200).send({ data: mapProductResponse(product) })
  } catch (err) {
    next(err)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { referenceId } = req.body
    await Product.findOneAndDelete({ referenceId })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

export default {
  createProduct,
  updateProduct,
  deleteProduct,
}