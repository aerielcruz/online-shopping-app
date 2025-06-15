export const mapProductResponse = (product) => {
  return {
    email: product.email,
    firstName: product.firstName,
    middleName: product.middleName,
    lastName: product.lastName,
    suffix: product.suffix,
    addresses: product.addresses,
    cart: product.cart,
  }
}
