import express from 'express'
import { env } from './env'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use('/api', router)

const { PORT } = env

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/api`)
})
