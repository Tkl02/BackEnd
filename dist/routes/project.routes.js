import { Router } from "express";
import { handleCreateProject, handleDeleteProject, handleGetAllProject, handleUpdateProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const projectRouter = Router();
projectRouter.get('/', handleGetAllProject);
projectRouter.post('/', authMiddleware, handleCreateProject);
projectRouter.put('/:id', authMiddleware, handleUpdateProject);
projectRouter.delete('/:id', authMiddleware, handleDeleteProject);
export { projectRouter };
//# sourceMappingURL=project.routes.js.map