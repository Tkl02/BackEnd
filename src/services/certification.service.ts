import { prisma } from '../prisma/prisma.js'

interface CertificationData {
    title: string
    issues: string
    date: Date
    credentialId: string
    skills: string[]
    logo: string
}

export async function getAllCertification() {
    return prisma.certification.findMany()
}

export async function createCertification(data: CertificationData) {
    return prisma.certification.create({
        data: {
            title: data.title,
            issues: data.issues,
            date: data.date,
            credentialId: data.credentialId,
            skills: data.skills,
            logo: data.logo
        }
    })
}

export async function updateCertification(id: number, data: Partial<CertificationData>) {
    return prisma.certification.update({
        where: { id },
        data
    })
}

export async function deleteCertification(id: number) {
    return prisma.certification.delete({
        where: { id }
    })
}