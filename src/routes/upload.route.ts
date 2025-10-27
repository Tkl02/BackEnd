import { Router, type Request, type Response } from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { upload } from "../config/cloudinary.js"

const uploadRoute = Router()

interface MulterRequest extends Request {
    file?: any
}

uploadRoute.post('/', authMiddleware, upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" })
    }

    res.status(201).json({ message: 'Upload bem-sucedido', imageUrl: req.file.path })
})

export { uploadRoute }