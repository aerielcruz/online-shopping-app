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

app
	.use(express.json())
	.use(express.text())
	.use(express.urlencoded())
	.use(connectDatabase)
	.use(session)
	.use(passport.initialize())
	.use(passport.session())

if (process.env.NODE_ENV === 'development') {
	app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
}

app.use('/api/v1', routes)

app.use(errorHandler)

app.listen(port, async () => {
	await connectDatabase()
	console.log(`Example app listening on port ${port}`)
})
