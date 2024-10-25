import express from 'express'
import { env } from './env'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use('/api', router)

app.use(errorHandlerMiddleware)

const { PORT } = env

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/api`)
})
