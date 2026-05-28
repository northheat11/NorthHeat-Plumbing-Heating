import React, { useState } from 'react';
import { Flame, Bath, AlertTriangle, Wrench, CheckCircle2, ChevronRight, Clock, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { services } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getServiceIcon = (id: string, size = "w-6 h-6") => {
    switch (id) {
      case 'boilers':
        return <Flame className={`${size} text-orange-500`} />;
      case 'bathrooms':
        return <Bath className={`${size} text-teal-500`} />;
      case 'emergencies':
        return <AlertTriangle className={`${size} text-rose-500`} />;
      default:
        return <Wrench className={`${size} text-indigo-500`} />;
    }
  };

  const getServiceColor = (id: string) => {
    switch (id) {
      case 'boilers':
        return 'border-orange-500 hover:shadow-orange-500/5';
      case 'bathrooms':
        return 'border-teal-500 hover:shadow-teal-500/5';
      case 'emergencies':
        return 'border-rose-500 hover:shadow-rose-500/5';
      default:
        return 'border-indigo-500 hover:shadow-indigo-500/5';
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEnquire = (id: string, serviceTitle: string) => {
    onSelectService(id);
    const element = document.querySelector('#contact');
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/60 px-3 py-1 rounded-full inline-block mb-3">Our Core Offerings</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Professional Plumbing & Heating Services
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed">
            From quick diagnostic checks to sprawling luxury bathroom retrofits, we execute our work with structural integrity and clean local focus.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div 
                key={service.id}
                id={`service-card-${service.id}`}
                className={`bg-white rounded-2xl border-t-4 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${getServiceColor(service.id)}`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    {/* Icon frame */}
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                      {getServiceIcon(service.id)}
                    </div>
                    {/* Price rating capsule */}
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full font-mono">
                      {service.pricing}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="h-px bg-slate-100 mb-6"></div>

                  {/* Expander detail sheet */}
                  {isExpanded && (
                    <div className="mb-6 space-y-6 animate-fade-in">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 font-mono">Technical Breakdown</span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {service.longDescription}
                        </p>
                      </div>

                      {/* Photo preview inside expander if available */}
                      {service.image && (
                        <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-200">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                        </div>
                      )}

                      {/* Key features checklist */}
                      <div className="space-y-2.5">
                        <span className="block text-xs font-bold text-slate-800">Why Choose northHeat:</span>
                        <div className="grid gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-slate-600 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions buttons panel */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleToggleExpand(service.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Hide Details
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        </>
                      ) : (
                        <>
                          Technical Details
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleEnquire(service.id, service.title)}
                      className="flex-1 inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl transition-colors shadow-md shadow-teal-500/5 cursor-pointer"
                    >
                      Request Service
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live helper note underneath service layout */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
              <Clock className="w-6 h-6 text-orange-500 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-slate-800 text-lg">Need Emergency Assistance Right Now?</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Our emergency vehicles are fully stocked and roaming West Yorkshire. average dispatch response in <span className="text-slate-800 font-bold">24 minutes</span>.
              </p>
            </div>
          </div>
          <a 
            href="tel:01134678910"
            className="w-full md:w-auto inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/10 text-xs sm:text-sm transition-colors shrink-0"
          >
            Call Dispatch: 0113 467 8910
          </a>
        </div>

      </div>
    </section>
  );
}
