import type { Request, Response } from "express"
import * as projectService from '../services/project.service.js'

export async function handleGetAllProject(req: Request, res: Response) {
    try {
        const project = await projectService.getAllProjects()
        res.status(200).json(project)
    } catch (error: any) {
        if (error) {
            res.status(500).json({ message: 'Erro na busca de projetos', error })
        }
    }
}

export async function handleCreateProject(req: Request, res: Response) {
    try {
        const { title, description, image, technologies, repoUrl, featured } = req.body
        if (!title || !description || !image || !technologies || !repoUrl) {
            return res.status(400).json({ error: 'Campos obrigatorios' })
        }
        const newProject = await projectService.createProject({
            title, description, image, technologies, repoUrl, featured: featured || false
        })
        res.status(201).json({ newProject })
    } catch (error) {
        res.status(500).json({ error: 'Erro não criação do projeto' })
    }
}

export async function handleUpdateProject(req: Request, res: Response) {

    try {
        const { id } = req.params
        const project = await projectService.updateProject(Number(id), req.body)
        res.status(200).json(project)
    } catch (error) {
        res.status(404).json({ error: 'Projeto não encontrado.' })
    }
}

export async function handleDeleteProject(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleteProject = await projectService.delleteProject(Number(id))
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ error: 'Projeto não encontrado' })
    }
}