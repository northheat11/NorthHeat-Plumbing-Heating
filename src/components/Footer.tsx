import React from 'react';
import { Flame, Facebook, Twitter, MapPin, Shield, Star, Clock } from 'lucide-react';

interface FooterProps {
  onScrollToSection?: (id: string) => void;
  onAdminClick?: () => void;
}

export default function Footer({ onScrollToSection, onAdminClick }: FooterProps) {
  const handleScrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const element = document.querySelector(id);
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
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Panel (Col 1-5) */}
          <div className="col-span-2 lg:col-span-5 flex flex-col items-start text-left">
            <a href="#home" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-lg font-black tracking-tight text-white">
                  north<span className="text-orange-500">Heat</span>
                </span>
                <span className="block text-[8px] uppercase tracking-widest text-slate-500 font-bold -mt-1 font-mono">
                  Plumbing & Heating
                </span>
              </div>
            </a>

            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              northHeat Plumbing & Heating is West Yorkshire’s premium service team. We specialise in high-efficiency boiler change-outs, custom-built master bathrooms, 24/7 emergencies, and professional plumbing diagnostics.
            </p>

            {/* Google Rating Star */}
            <div className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-850">
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase font-mono">5.0 Star rated on Google</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1 lg:col-span-2 text-left">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a href="#home" onClick={(e) => handleScrollToId(e, '#home')} className="hover:text-teal-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollToId(e, '#services')} className="hover:text-teal-400 transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#estimator" onClick={(e) => handleScrollToId(e, '#estimator')} className="hover:text-teal-400 transition-colors">Instant Quote</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleScrollToId(e, '#projects')} className="hover:text-teal-400 transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleScrollToId(e, '#faq')} className="hover:text-teal-400 transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Service areas */}
          <div className="col-span-1 lg:col-span-2 text-left">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">Service Regions</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>Greater Leeds</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>Harrogate</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>Horsforth</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>Wetherby</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>Ilkley & Otley</span>
              </li>
            </ul>
          </div>

          {/* Accreditations Columns (Col 10-12) */}
          <div className="col-span-2 lg:col-span-3 text-left">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">Core Accreditation Accents</h4>
            <div className="space-y-4">
              <div className="p-3 bg-teal-950/20 border border-teal-500/10 rounded-xl flex gap-3 text-xs items-center text-teal-400">
                <Shield className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="block font-bold text-white uppercase text-[10px] tracking-wide">Gas Safe Approved</span>
                  <span className="block text-[10px] text-teal-300">Registration #582910</span>
                </div>
              </div>

              <div className="p-3 bg-orange-950/25 border border-orange-500/10 rounded-xl flex gap-3 text-xs items-center text-orange-400">
                <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <span className="block font-bold text-white uppercase text-[10px] tracking-wide">Helpline Available</span>
                  <span className="block text-[10px] text-orange-300">Call 24/7/365 Anywhere</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Rich Local SEO postcodes map and location directory */}
        <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-5 mb-10 text-left">
          <span className="text-[10px] tracking-widest uppercase font-bold text-teal-400 font-mono block mb-2">
            West Yorkshire Local Compliance & Service Postcodes
          </span>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-4">
            Our Gas Safe heating engineers and local plumbers provide immediate, 5.0-star rated installations, preventative boiler services, and emergency boiler repair call-outs to households, commercial premises, and letting agents across all primary Leeds and West Yorkshire postcode sectors.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 text-[11px] font-mono text-slate-500">
            <div><strong className="text-slate-300">LS6:</strong> Headingley, Meanwood</div>
            <div><strong className="text-slate-300">LS7:</strong> Chapel Allerton</div>
            <div><strong className="text-slate-300">LS8:</strong> Roundhay, Gipton</div>
            <div><strong className="text-slate-300">LS17:</strong> Alwoodley, Moortown</div>
            <div><strong className="text-slate-300">LS18:</strong> Horsforth</div>
            <div><strong className="text-slate-300">HG1 / HG2:</strong> Harrogate</div>
            <div><strong className="text-slate-300">LS13:</strong> Bramley, Rodley</div>
            <div><strong className="text-slate-300">LS28:</strong> Pudsey, Farsley</div>
            <div><strong className="text-slate-300">LS22:</strong> Wetherby, Linton</div>
            <div><strong className="text-slate-300">LS21:</strong> Otley, Arthington</div>
            <div><strong className="text-slate-300">LS29:</strong> Ilkley, Burley</div>
            <div><strong className="text-slate-300">LS25:</strong> Garforth, Kippax</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-900 mb-8"></div>

        {/* Subfooter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-slate-500 text-center md:text-left">
            <p>© {new Date().getFullYear()} northHeat Plumbing & Heating Ltd. All Rights Reserved.</p>
            <p className="mt-1 font-mono text-[10px] text-slate-600">Company Reg No: 12489811 (UK) | Gas Safe Register Number: 582910 | VAT Number Placeholder</p>
          </div>

          <div className="flex gap-6 mt-2 md:mt-0 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            {onAdminClick && (
              <button 
                onClick={(e) => { e.preventDefault(); onAdminClick(); }}
                className="text-teal-400 hover:text-teal-300 font-bold transition-colors cursor-pointer text-xs"
              >
                Admin Portal
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
