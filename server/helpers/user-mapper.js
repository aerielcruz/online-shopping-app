export const mapUserResponse = (user) => {
  return {
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    suffix: user.suffix,
    cart: user.cart,
  }
}