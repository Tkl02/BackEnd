interface ProjectData {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    repoUrl: string;
    featured: boolean;
}
export declare function getAllProjects(): Promise<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    repoUrl: string;
    featured: boolean;
}[]>;
export declare function createProject(data: ProjectData): Promise<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    repoUrl: string;
    featured: boolean;
}>;
export declare function updateProject(id: number, data: Partial<ProjectData>): Promise<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    repoUrl: string;
    featured: boolean;
}>;
export declare function delleteProject(id: number): Promise<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    repoUrl: string;
    featured: boolean;
}>;
export {};
//# sourceMappingURL=project.service.d.ts.map