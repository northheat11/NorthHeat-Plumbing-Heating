import React, { useState } from 'react';
import { projects } from '../data';
import { Project } from '../types';
import { MapPin, Calendar, ExternalLink, Flame, Bath, Wrench } from 'lucide-react';

export default function ProjectPortfolio() {
  const [filter, setFilter] = useState<'all' | 'boiler' | 'bathroom' | 'plumbing'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'boiler':
        return <Flame className="w-3.5 h-3.5" />;
      case 'bathroom':
        return <Bath className="w-3.5 h-3.5" />;
      default:
        return <Wrench className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/60 px-3 py-1 rounded-full inline-block mb-3 font-sans">Recent Installations</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Our Work in Action Across Yorkshire
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed">
            We hold ourselves to strict standards of professional neatness—especially our signature copper pipe displays and flawless bathroom tiling.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'boiler', label: 'Boiler Upgrades' },
            { id: 'bathroom', label: 'Luxury Bathrooms' },
            { id: 'plumbing', label: 'General Plumbing Work' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === btn.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article 
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image panel with badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Category Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider font-mono">
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>
                </div>

                {/* Text specifications and details */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-mono mb-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {project.location}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {project.completionDate}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Work Handover signature */}
              <div className="px-6 pb-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  100% Quality Signed-Off
                </span>
                <span className="font-mono uppercase text-[9px] tracking-widest text-slate-350">northHeat Certified</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
