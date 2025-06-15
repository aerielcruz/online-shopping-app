import Category from "../../models/Category.js";
import { mapCategoryResponse } from "../../helpers/category-mapper.js";

const createCategory = async (req, res, next) => {
  try {
    const {
      name,
      label,
      description,
      isActive,
    } = req.body

    const categoryModel = {
      name,
      label,
      description,
      isActive,
    }

    const category = await Category.create(categoryModel)

    res.status(200).send({ data: mapCategoryResponse(category) })
  } catch (err) {
    next(err)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const {
      uuid,
      name,
      label,
      description,
      isActive,
    } = req.body

    const categoryModel = {
      name,
      label,
      description,
      isActive,
    }

    const category = await Category.findOne(
      { uuid },
      { $set: categoryModel },
      { new: true }
    )

    res.status(201).send({ data: mapCategoryResponse(category) })
  } catch (err) {
    next(err)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { uuid } = req.body
    await Category.findOneAndDelete({ uuid })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

export default {
  createCategory,
  updateCategory,
  deleteCategory
}