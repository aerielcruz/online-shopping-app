import { mapUserResponse } from "../helpers/user-mapper.js"

const login = async (req, res) => {
  const user = { ...req.user.toJSON() }
  delete user.password
  res.json({ data: mapUserResponse(user) })
}

const logout = async (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.status(204).end()
  });
}

export default {
  login,
  logout
}