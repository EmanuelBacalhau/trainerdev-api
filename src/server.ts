import express from 'express'
import { env } from './env'

const app = express()

const { PORT } = env

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
