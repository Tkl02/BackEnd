import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.routes.js'
import { projectRouter } from './routes/project.routes.js'
import { certificationRouter } from './routes/certification.routes.js'
import { cronRouter } from './routes/cron.routs.js'
import { uploadRoute } from './routes/upload.route.js'
import cors from 'cors'

dotenv.config()

const app = express()

// consigurando o servidor
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 2. Configure o CORS
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      'https://leonardofaustino.vercel.app',
      /^https:\/\/.*\.vercel\.app$/,
    ]
    
    if (!origin) return callback(null, true)
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin
      }
      return allowed.test(origin)
    })
    
    if (isAllowed) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

// rota de health check
app.get('/', async (req, res) => {
    res.status(200).json({ status: 'UP', timeStamp: new Date().toISOString() })
})

// rotas da aplicação
app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)
app.use('/api/certifications', certificationRouter)
app.use('/api/cronDelete', cronRouter)
app.use('/api/upload', uploadRoute)


export { app }