import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../config/cloudinary.js";
const uploadRoute = Router();
uploadRoute.post('/', authMiddleware, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    res.status(201).json({ message: 'Upload bem-sucedido', imageUrl: req.file.path });
});
export { uploadRoute };
//# sourceMappingURL=upload.route.js.map