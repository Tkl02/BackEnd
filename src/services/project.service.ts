import { prisma } from '../prisma/prisma.js'

interface ProjectData {
    title: string
    description: string
    image: string
    technologies: string[]
    repoUrl: string
    featured: boolean
}

export async function getAllProjects() {
    return prisma.project.findMany()
}

export async function createProject(data: ProjectData) {
    return prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            image: data.image,
            technologies: data.technologies,
            repoUrl: data.repoUrl,
            featured: data.featured
        }
    })
}

export async function updateProject(id: number, data: Partial<ProjectData>) {
    return prisma.project.update({
        where: { id },
        data
    })
}

export async function delleteProject(id: number) {
    return prisma.project.delete({
        where: { id }
    })
}