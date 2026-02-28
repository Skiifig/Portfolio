import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoType: string;
}

const projects = [
  { 
    id: 1, 
    title: 'Score-Tracker', 
    category: 'Web', 
    description: 'Application de suivi de résultats sportifs et e-sport (Foot, Rugby, LoL).', 
    tech: ['React', 'API', 'Frontend'],
    demoType: 'iframe',
  },
  { 
    id: 2, 
    title: 'scop', 
    category: 'Graphisme', 
    description: 'Moteur de rendu 3D avec gestion de la caméra et des shaders.', 
    tech: ['C', 'OpenGL', 'Shaders'],
    demoType: 'wasm'
  },
  { 
    id: 3, 
    title: 'Singlefind', 
    category: 'Web', 
    description: 'Site de rencontre minimaliste avec gestion de base de données relationnelle.', 
    tech: ['Python', 'Flask', 'SQL'],
    demoType: 'iframe'
  },
  { 
    id: 4, 
    title: 'avaj-launcher', 
    category: 'Logiciel', 
    description: 'Simulation de véhicules aériens utilisant les design patterns.', 
    tech: ['Java', 'Design Patterns', 'OOP'],
    demoType: 'terminal'
  },
  { 
    id: 5, 
    title: 'ft_vox', 
    category: 'Graphisme', 
    description: 'Moteur de rendu voxel implémentant la génération procédurale.', 
    tech: ['C', 'Génération Proc.', 'Voxel'],
    demoType: 'wasm'
  },
  { 
    id: 6, 
    title: 'malloc', 
    category: 'Système', 
    description: 'Réécriture complète de l\'allocateur de mémoire de la librairie C standard.', 
    tech: ['C', 'Architecture OS', 'Pointeurs'],
    demoType: 'terminal'
  },
];

export default function ProjectGallery() {
  const [filter, setFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['Tous', 'Web', 'Graphisme', 'Logiciel', 'Système'];
  const filteredProjects = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  const closeModal = () => setSelectedProject(null);

  return (
    <div id="projets" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-slate-50">Sélection de projets</h2>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              filter === cat 
                ? 'bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-emerald-500 transition-all flex flex-col h-full group"
          >
            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
              {project.tech.map(tag => (
                <span key={tag} className="text-xs font-semibold text-slate-300 bg-slate-900/50 px-2.5 py-1 rounded-md border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h3 className="text-2xl font-bold text-slate-50">{selectedProject.title}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors p-2">
                ✕
              </button>
            </div>

            <div className="p-6 flex-grow flex flex-col gap-6">
              <p className="text-slate-300 text-lg">{selectedProject.description}</p>
              
              <div className="w-full aspect-video bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <p className="text-slate-500 font-mono text-sm">
                  [ Espace réservé pour la démo interactive : {selectedProject.demoType} ]
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <a href="#" className="bg-slate-800 hover:bg-slate-700 text-slate-100 px-6 py-2 rounded-lg font-medium transition-colors border border-slate-700">
                  Voir le code source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}