import User from "../models/User.js";
import Product from "../models/Product.js";
import { mapProductResponse } from "../helpers/product-mapper.js";

const getCart = async (req, res, next) => {
  try {
    const productIds = req.user.cart.map(item => item.productId)
    const filter = { referenceId: { $in: productIds } }
    const selectQuery = '-_id referenceId name label description price currency imageUrl'

    const products = await Product.find(filter).select(selectQuery).lean()
    const cartWithQuantity = products.map(product => {
      const cartItem = req.user.cart.find(item => item.productId === product.referenceId);
      return {
        ...mapProductResponse(product),
        quantity: cartItem ? cartItem.quantity : 1, // default to 1 if not found
      };
    });

    res.status(200).send({ data: cartWithQuantity })
  } catch (err) {
    next(err)
  }
}

const updateCart = async (req, res, next) => {
  try {
    const { productId } = req.body

    const cart = [...(req.user.cart || [])];
    const existingProduct = cart.find(item => item.productId === productId)
    if (!existingProduct) {
      cart.push({ productId, quantity: 1 });
    }

    const userModel = {
      cart
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: userModel },
      { new: true }
    )

    const updatedCart = user.cart || []

    const products = await Product.find({ referenceId: { $in: updatedCart.map(item => item.productId) } }).lean()
    const cartWithQuantity = products.map(product => {
      const cartItem = cart.find(item => item.productId === product.referenceId);
      return {
        ...mapProductResponse(product),
        quantity: cartItem ? cartItem.quantity : 1, // default to 1 if not found
      };
    })

    res.status(201).send({ data: cartWithQuantity })
  } catch (err) {
    next(err)
  }
}

const deleteCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // Remove the product from the user's cart
    const cart = (req.user.cart || []).filter(item => item.productId !== productId);

    // Update the user's cart in the database
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { cart } },
      { new: true }
    );

    // Get updated cart products
    const updatedCart = user.cart || [];
    const products = await Product.find({ referenceId: { $in: updatedCart.map(item => item.productId) } }).lean();
    const cartWithQuantity = products.map(product => {
      const cartItem = updatedCart.find(item => item.productId === product.referenceId);
      return {
        ...mapProductResponse(product),
        quantity: cartItem ? cartItem.quantity : 1,
      };
    });

    res.status(200).send({ data: cartWithQuantity });
  } catch (err) {
    next(err);
  }
};

export default {
  getCart,
  updateCart,
  deleteCart
}