import type { NextFunction, Request, Response } from "express";
export interface authRequest extends Request {
    userId?: string;
}
export declare function authMiddleware(req: authRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map