import { Router, type Request, type Response } from "express"
import { authCron } from "../middlewares/cron.middleware.js"
import { cleanupExpiredTokens } from "../services/auth.service.js"

const cronRouter = Router()

cronRouter.get(
    '/cleanup-tokens', authCron,
    async (req: Request, res: Response) => {
        try {
            const count = await cleanupExpiredTokens()

            res.status(200).json({
                message: 'Limpeza de tokens expirados concluida',
                deleteCount: count
            })

        } catch (error) {
            res.status(500).json({ error: 'Falha na limpeza de tokens' })
        }
    }
)
export { cronRouter }