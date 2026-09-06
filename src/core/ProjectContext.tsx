import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from './types';

interface ProjectContextType {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextType>({
  activeProject: null,
  setActiveProject: () => {},
});

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
