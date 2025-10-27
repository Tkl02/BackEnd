import { prisma } from '../prisma/prisma.js';
export async function getAllCertification() {
    return prisma.certification.findMany();
}
export async function createCertification(data) {
    return prisma.certification.create({
        data: {
            title: data.title,
            issues: data.issues,
            date: data.date,
            credentialId: data.credentialId,
            skills: data.skills,
            logo: data.logo
        }
    });
}
export async function updateCertification(id, data) {
    return prisma.certification.update({
        where: { id },
        data
    });
}
export async function deleteCertification(id) {
    return prisma.certification.delete({
        where: { id }
    });
}
//# sourceMappingURL=certification.service.js.map