import type { Request, Response, NextFunction } from "express"

export function authCron(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
        console.error('CRON_SECRET não esta configurado no .env')
        return res.status(500).json({ error: 'Configuração do servidor incompleta.' })
    }

    if (authHeader === `Bearer ${cronSecret}`) {
        next()
    } else {
        return res.status(401).json({ error: 'Não autorizado' })
    }
}