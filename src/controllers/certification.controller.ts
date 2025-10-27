import type { Request, Response } from "express"
import * as certificationserice from "../services/certification.service.js"

export async function handleGetAllCertification(req: Request, res: Response) {
    try {
        const certification = await certificationserice.getAllCertification()
        res.status(200).json(certification)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar certificações', error })
    }
}

export async function handleCreateCertification(req: Request, res: Response) {
    try {
        const { title, issues, date, credentialId, skills, logo } = req.body
        if (!title || !issues || !date || !credentialId || !skills) {
            return res.status(400).json({ error: 'Campos obrigatorios' })
        }
        const dateObject = new Date(date)

        const newCertification = await certificationserice.createCertification({
            title, issues, date: dateObject, credentialId, skills, logo
        })
        res.status(201).json(newCertification)

    } catch (error) {
        res.status(500).json({ error: 'Erro na criação de uma nova certification' })
    }
}

export async function handleUpdateCertification(req: Request, res: Response) {
    try {
        const { id } = req.params
        const certification = await certificationserice.updateCertification(Number(id), req.body)
        res.status(200).json(certification)
    } catch (error) {
        res.status(404).json({ error: 'Certification não encontrada' })
    }
}

export async function handleDeleteCertification(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleteCertification = await certificationserice.deleteCertification(Number(id))
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ error: 'Certificação não encontrada.' })
    }
}