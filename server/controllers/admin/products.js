import { v4 as uuidv4 } from 'uuid';
import Product from "../../models/Product.js";
import { mapProductResponse } from "../../helpers/product-mapper.js";

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      label,
      description,
      sku,
      price,
      currency,
      stockQuantity,
      isActive,
    } = req.body

    const productModel = {
      uuid: uuidv4(),
      name,
      label,
      description,
      sku,
      price,
      currency,
      stockQuantity,
      isActive,
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
      uuid,
      name,
      label,
      description,
      price,
      currency,
      stockQuantity,
      isActive,
    } = req.body

    const productModel = {
      name,
      label,
      description,
      price,
      currency,
      stockQuantity,
      isActive,
    }

    const product = await Product.findOne(
      { uuid },
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
    const { uuid } = req.body
    await Product.findOneAndDelete({ uuid })
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