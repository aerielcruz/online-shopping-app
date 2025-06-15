export const permission = ({ allowedRoles = [] } = {}) => {
  return (req, res, next) => {
    if (allowedRoles.length) {
      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).send('Invalid Access')
      }
    }
    next()
  }
}