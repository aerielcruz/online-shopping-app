import User from "../models/User.js";
import { mapUserResponse } from "../helpers/user-mapper.js";

const getUser = async (req, res, next) => {
  try {
    res.status(200).json({ data: mapUserResponse(req.user) })
  } catch (err) {
    next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      middleName,
      lastName,
      suffix,
    } = req.body

    const userModel = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      suffix,
      addresses: [],
      cart: []
    }

    const user = await User.create(userModel)

    res.status(200).send({ data: mapUserResponse(user) })
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      middleName,
      lastName,
      suffix,
      addresses,
      cart
    } = req.body

    const userModel = {
      email,
      firstName,
      middleName,
      lastName,
      suffix,
      addresses,
      cart
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: userModel },
      { new: true }
    )

    res.status(201).send({ data: mapUserResponse(user) })
  } catch (err) {
    next(err)
  }
}

export default {
  getUser,
  createUser,
  updateUser,
}