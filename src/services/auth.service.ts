import { prisma } from '../prisma/prisma.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { error } from 'console'

function GenerateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '10m' })
}

async function GenerateRefreshToken(userId: string) {
    const expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24)

    const token = crypto.randomBytes(64).toString('hex')

    const newRefreshToken = await prisma.refreshToken.create({
        data: {
            userId,
            expiresAt: expiresIn,
            token: token,
        }
    })
    return newRefreshToken.token
}
// função para efetuar cadastro
export async function registerAdmin(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
        throw new Error('Usuario ja existe')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
        }
    })
    return { id: user.id, email: user.email }
}

// função para efetuar login
export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        throw new Error('Credenciais Invalidas.')
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        throw new Error('Credenciais Invalidas.')
    }

    const accessToken = GenerateAccessToken(user.id)
    const refreshToken = await GenerateRefreshToken(user.id)

    return { accessToken, refreshToken }
}

// função para o refreshtoken
export async function refreshUserToken(token: string) {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: { token },
        include: { user: true }
    })

    if (!refreshToken) {
        throw new Error('Refresh token invalido')
    }
    if (new Date() > refreshToken.expiresAt) {
        await prisma.refreshToken.delete({ where: { token } })
        throw new Error('Refresh token expirado. Faça o login novamente')
    }

    const newAccessToken = GenerateAccessToken(refreshToken.userId)
    return newAccessToken

}