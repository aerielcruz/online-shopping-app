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
    } = req.body

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error("Please provide a valid email address.");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email address is already registered.");
    }

    // Name validation (letters, spaces, hyphens, apostrophes, min 2 chars)
    const nameRegex = /^[A-Za-z\s'-]{2,}$/;
    if (!firstName || !nameRegex.test(firstName)) {
      throw new Error("Please provide a valid first name (at least 2 letters).");
    }
    if (middleName && !nameRegex.test(middleName)) {
      throw new Error("Please provide a valid middle name (at least 2 letters or leave blank).");
    }
    if (!lastName || !nameRegex.test(lastName)) {
      throw new Error("Please provide a valid last name (at least 2 letters).");
    }

    // Password validation
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
    }

    const userModel = {
      email,
      password,
      firstName,
      middleName,
      lastName,
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
      cart
    } = req.body

    const userModel = {
      email,
      firstName,
      middleName,
      lastName,
      suffix,
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