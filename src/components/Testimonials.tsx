import { testimonials } from '../data';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full inline-block mb-3 font-sans">Verified Reviews</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-4 text-white">
            What Our Yorkshire Clients Say
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
            We are incredibly proud of our 5.0 rating on Google Reviews. Here are real testimonials from local homeowners in your neighborhood.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-slate-600 transition-all duration-300"
            >
              {/* Background decorative quote symbol */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-slate-700/20 pointer-events-none group-hover:text-slate-700/35 transition-colors" />

              <div>
                {/* Score rating star */}
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment text */}
                <p className="font-sans text-xs sm:text-sm lg:text-base text-slate-300 italic leading-relaxed mb-6">
                  "{test.comment}"
                </p>
              </div>

              {/* Author signature footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-700/40">
                <div className="text-left">
                  <strong className="block text-sm text-white">{test.name}</strong>
                  <span className="text-[11px] text-slate-450 font-medium">{test.location}</span>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 font-mono bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
                    {test.service}
                  </span>
                  <span className="text-[9px] text-slate-500 mt-1 font-mono">{test.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">100% Satisfaction Approved</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-extrabold text-sm font-mono">★★★★★</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Verified Google Local business</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded font-mono">GAS SAFE</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">License Verification #582910</span>
          </div>
        </div>

      </div>
    </section>
  );
}
