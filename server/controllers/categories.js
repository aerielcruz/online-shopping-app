import Category from "../models/Category.js";

const getCategories = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin'

    let selectQuery = '-_id uuid name label description'
    if (isAdmin) {
      selectQuery += ' isActive'
    }

    const categories = await Category.find().select(selectQuery)
    res.status(200).send({ data: categories })
  } catch (err) {
    next()
  }
}

export default {
  getCategories
}