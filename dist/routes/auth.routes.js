import { Router } from "express";
import { handleLogin, handleRefreshToken, handleRegisterAdmin } from "../controllers/auth.controler.js";
const authRouter = Router();
authRouter.post('/login', handleLogin);
authRouter.post('/registrar', handleRegisterAdmin);
authRouter.post('/refreshtoken', handleRefreshToken);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map