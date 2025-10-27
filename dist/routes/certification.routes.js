import { Router } from "express";
import { handleCreateCertification, handleDeleteCertification, handleGetAllCertification, handleUpdateCertification } from "../controllers/certification.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const certificationRouter = Router();
certificationRouter.get('/', handleGetAllCertification);
certificationRouter.post('/', authMiddleware, handleCreateCertification);
certificationRouter.put('/:id', authMiddleware, handleUpdateCertification);
certificationRouter.delete('/:id', authMiddleware, handleDeleteCertification);
export { certificationRouter };
//# sourceMappingURL=certification.routes.js.map