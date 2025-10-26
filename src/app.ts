import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.routes.js'
import { authMiddleware, type authRequest } from './middlewares/auth.middleware.js'
import { projectRouter } from './routes/project.routes.js'

dotenv.config()

const app = express()

// consigurando o servidor
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// rota de health check
app.get('/api/health', async (req, res) => {
    res.status(200).json({ status: 'UP', timeStamp: new Date().toISOString() })
})

// rotas da aplicação
app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)



export { app }