import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
// import { userCreateSchema } from '@app/schemas'
import { appRouter, connectToDb, createContext } from '@app/routes'

const PORT = process.env.PORT ?? 3500

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

app.use('/', express.static('dist/apps/server/public'))
app.use('/', express.static('dist/apps/client'))

app.use(
  '/api',
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

// app.get('/api', (req, res) => {
//   res.send('Hello api!')
// })

const server = app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
  connectToDb()
})

server.on('error', console.error)
