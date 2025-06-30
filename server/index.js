import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase } from './middlewares/connect-database.js'
import { session } from './middlewares/session.js'
import { passport } from './middlewares/passport.js'
import { errorHandler } from './middlewares/error-handler.js'
import routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT ||3000

// For ES modules: get __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log('__filename', __filename)
console.log('__dirname', __dirname)

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

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/api/v1', routes)

// SPA fallback: serve index.html for any non-API route
app.get('*', (req, res) => {
	// If the request starts with /api, skip to next handler
	if (req.path.startsWith('/api')) return res.status(404).end()
	res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.use(errorHandler)

app.listen(PORT, async () => {
	await connectDatabase()
	console.log(`Example app listening on port ${PORT}`)
})
