import type { Request, Response } from "express";
import { loginUser, registerAdmin, refreshUserToken } from "../services/auth.service.js";

export async function handleRegisterAdmin(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha obrigatorios' })
        }
        const newUser = await registerAdmin(email, password)
        res.status(201).json(newUser)
    } catch (error: any) {
        if (error.message.includes('Usuario ja existe')) {
            return res.status(409).json({ error: error.message })
        }
        res.status(500).json({ error: 'Erro ao criar usuario' })
    }
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e Senha Obrigatorios!!' })
        }

        const { accessToken, refreshToken } = await loginUser(email, password)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24
        })
        res.status(200).json({ accessToken })
    }
    catch (error: any) {
        if (error.message.includes('Credenciais Invalidas')) {
            return res.status(401).json({ error: error.message })
        }
        res.status(500).json({ error: 'Erro ao efetuar login' })
    }
}

export async function handleRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token não encontrado nos cookies' })
    }

    try {
        const newAccessToken = await refreshUserToken(refreshToken)
        res.status(200).json({ accessToken: newAccessToken })
    } catch (error: any) {
        res.status(403).json({ error: error.message })
    }
}