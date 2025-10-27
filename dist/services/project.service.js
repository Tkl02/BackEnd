import { prisma } from '../prisma/prisma.js';
export async function getAllProjects() {
    return prisma.project.findMany();
}
export async function createProject(data) {
    return prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            image: data.image,
            technologies: data.technologies,
            repoUrl: data.repoUrl,
            featured: data.featured
        }
    });
}
export async function updateProject(id, data) {
    return prisma.project.update({
        where: { id },
        data
    });
}
export async function delleteProject(id) {
    return prisma.project.delete({
        where: { id }
    });
}
//# sourceMappingURL=project.service.js.map