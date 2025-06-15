import expressSession from 'express-session'
import MongoStore from 'connect-mongo'

export const session = (req, res, next) => {
  return expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }, // 1 year
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: req.dbClient,
      stringify: false,
      touchAfter: 24 * 3600,
    })
  })(req, res, next)
}