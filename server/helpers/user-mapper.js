export const mapUserResponse = (user) => {
  return {
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    suffix: user.suffix,
    addresses: user.addresses,
    cart: user.cart,
  }
}