import type { NextFunction, Request, Response } from "express"
import Jwt, { type JwtPayload } from "jsonwebtoken"
import { prisma } from "../prisma/prisma.js"

// Função helper para obter o JWT secret
function getJwtSecret(): string {
    const secret = process.env.JWT_ACCESS_SECRET
    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET não configurado')
    }
    return secret
}

export interface authRequest extends Request {
    userId?: string;
}

export async function authMiddleware(req: authRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de acesso não fornecido ou mal formatado' })
    }

    const token = authHeader.split(' ')[1]

    try {
        let JWT_SECRET: string
        try {
            JWT_SECRET = getJwtSecret()
        } catch {
            return res.status(500).json({ error: 'Configuração do servidor inválida' })
        }

        const decoded = Jwt.verify(token as string, JWT_SECRET as string) as JwtPayload

        if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
            return res.status(401).json({ error: 'Token inválido' })
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        })

        if (!user) {
            return res.status(401).json({ error: 'Usuario do token não encontrado' })
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token de acesso invalido ou expirado' })
    }
}