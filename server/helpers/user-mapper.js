export const mapUserResponse = (user) => {
  const data = {
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    suffix: user.suffix,
    cart: user.cart,
  }
  if (user.role === 'admin') {
    data.role = user.role
  }
  return data
}