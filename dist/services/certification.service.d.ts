interface CertificationData {
    title: string;
    issues: string;
    date: Date;
    credentialId: string;
    skills: string[];
    logo: string;
}
export declare function getAllCertification(): Promise<{
    id: number;
    title: string;
    issues: string;
    date: Date;
    credentialId: string;
    skills: string[];
    logo: string;
}[]>;
export declare function createCertification(data: CertificationData): Promise<{
    id: number;
    title: string;
    issues: string;
    date: Date;
    credentialId: string;
    skills: string[];
    logo: string;
}>;
export declare function updateCertification(id: number, data: Partial<CertificationData>): Promise<{
    id: number;
    title: string;
    issues: string;
    date: Date;
    credentialId: string;
    skills: string[];
    logo: string;
}>;
export declare function deleteCertification(id: number): Promise<{
    id: number;
    title: string;
    issues: string;
    date: Date;
    credentialId: string;
    skills: string[];
    logo: string;
}>;
export {};
//# sourceMappingURL=certification.service.d.ts.map