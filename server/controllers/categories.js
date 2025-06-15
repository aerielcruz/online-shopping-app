import Category from "../models/Category.js";

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().select('uuid name label description isActive')
    res.status(200).send({ data: categories })
  } catch (err) {
    next()
  }
}

export default {
  getCategories
}