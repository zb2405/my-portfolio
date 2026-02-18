import React from 'react';
import {
  Github,
  Server,
  Shield,
  Activity,
  Cloud,
  Terminal,
  Cpu } from
'lucide-react';
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  links: {
    github?: string;
  };
}
interface ProjectCardProps {
  project: Project;
  index: number;
}
export function ProjectCard({ project, index }: ProjectCardProps) {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'infrastructure':
        return <Server className="w-4 h-4 text-teal-400" />;
      case 'security':
        return <Shield className="w-4 h-4 text-teal-400" />;
      case 'monitoring':
        return <Activity className="w-4 h-4 text-teal-400" />;
      case 'automation':
        return <Terminal className="w-4 h-4 text-teal-400" />;
      case 'cloud':
        return <Cloud className="w-4 h-4 text-teal-400" />;
      default:
        return <Cpu className="w-4 h-4 text-teal-400" />;
    }
  };
  return (
    <div className="group relative bg-[#0d1117] border border-slate-800 hover:border-teal-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top decorative bar */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-1.5 rounded bg-slate-800/50 border border-slate-700 group-hover:border-teal-500/30 transition-colors">
            {getIcon(project.category)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-teal-500/70">
                0{index + 1}_
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                {project.title}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow border-l-2 border-slate-800 pl-3 group-hover:border-teal-500/30 transition-colors">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) =>
          <span
            key={t}
            className="text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">

              {t}
            </span>
          )}
        </div>

        {/* Actions — GitHub only */}
        {project.links.github &&
        <div className="mt-auto pt-3 border-t border-slate-800/50">
            <a
            href={project.links.github}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group/link">

              <Github className="w-4 h-4" />
              <span className="font-mono group-hover/link:underline decoration-teal-500 underline-offset-4">
                source_code
              </span>
            </a>
          </div>
        }
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-teal-500/0 group-hover:border-teal-500/50 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-teal-500/0 group-hover:border-teal-500/50 transition-all duration-300" />
    </div>);

}