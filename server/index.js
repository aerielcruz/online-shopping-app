import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDatabase } from './middlewares/connect-database.js'
import { session } from './middlewares/session.js'
import { passport } from './middlewares/passport.js'
import { errorHandler } from './middlewares/error-handler.js'
import routes from './routes/index.js'

const app = express()
const port = 3000

// Must be set before using any routes or middlewares that require CORS
// This is only for development purposes, in production you should set CORS headers properly
if (process.env.NODE_ENV === 'development') {
	app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
}

app
	.use(express.json())
	.use(express.text())
	.use(express.urlencoded())
	.use(connectDatabase)
	.use(session)
	.use(passport.initialize())
	.use(passport.session())

app.use(express.static('client/dist'))
app.use('/static', express.static('server/static'))

app.use('/api/v1', routes)

app.use(errorHandler)

app.listen(port, async () => {
	await connectDatabase()
	console.log(`Example app listening on port ${port}`)
})
