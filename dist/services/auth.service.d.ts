export declare function registerAdmin(email: string, password: string): Promise<{
    id: string;
    email: string;
}>;
export declare function loginUser(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare function refreshUserToken(token: string): Promise<string>;
export declare function cleanupExpiredTokens(): Promise<number>;
//# sourceMappingURL=auth.service.d.ts.map