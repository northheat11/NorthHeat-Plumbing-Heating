import React, { useState, useEffect } from 'react';
import { 
  Phone, Flame, MapPin, Star, Shield, Menu, X, Clock, 
  ChevronDown, Percent, CreditCard, ChevronUp 
} from 'lucide-react';
import { useWebsiteConfig } from '../lib/config';

interface HeaderProps {
  onQuoteClick: () => void;
  onContactClick: () => void;
  onOpenService: (serviceId: string) => void;
  onOpenFinance: () => void;
}

export default function Header({ onQuoteClick, onContactClick, onOpenService, onOpenFinance }: HeaderProps) {
  const config = useWebsiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (menuName: string) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  const residentialItems = [
    { name: 'Boiler Installations', id: 'res-boiler-installations' },
    { name: 'Boiler Repairs', id: 'res-boiler-repairs' },
    { name: 'Boiler Servicing', id: 'res-boiler-servicing' },
    { name: 'Central Heating', id: 'res-central-heating' },
    { name: 'Radiators', id: 'res-[radiators]' },
    { name: 'Power Flushing', id: 'res-power-flushing' },
    { name: 'Plumbing', id: 'res-plumbing' },
    { name: 'Emergency Plumbing', id: 'res-emergency-plumbing' },
    { name: 'General Plumbing', id: 'res-general-plumbing' },
    { name: 'Leak Detection', id: 'res-leak-detection' },
  ];

  const commercialCategories = [
    {
      title: 'Commercial Heating',
      items: [
        { name: 'Boiler Installations', id: 'com-heating-boiler-installations' },
        { name: 'Central Heating', id: 'com-heating-central-heating' },
        { name: 'Air Conditioning', id: 'com-heating-air-conditioning' },
      ],
    },
    {
      title: 'Commercial Washrooms',
      id: 'com-washrooms',
    },
    {
      title: 'Maintenance',
      items: [
        { name: 'Boiler Servicing', id: 'com-maint-boiler-servicing' },
        { name: 'Power Flushing', id: 'com-maint-power-flushing' },
        { name: 'Leak Detection', id: 'com-maint-leak-detection' },
        { name: 'Bathroom Installations', id: 'com-maint-bathroom-installations' },
        { name: 'Wet Rooms', id: 'com-maint-wet-rooms' },
      ],
    },
  ];

  const aboutItems = [
    { name: 'About NorthHeat', id: 'about-northheat' },
    { name: 'Reviews', id: 'about-reviews' },
    { name: 'Case Studies', id: 'about-case-studies' },
    { name: 'FAQs', id: 'about-faqs' },
    { name: 'Areas We Cover', id: 'about-areas' },
    { name: 'Meet the Team', id: 'about-team' },
  ];

  const handleItemClick = (id: string, isAnchor = false, href = '') => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (isAnchor && href) {
      const element = document.querySelector(href);
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
    } else {
      onOpenService(id);
    }
  };

  const handleMobileSectionToggle = (section: string) => {
    setMobileOpenSection(mobileOpenSection === section ? null : section);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {config.showPromoBanner && config.promoBannerText && (
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-teal-600 text-white font-bold text-center py-2 px-4 text-[10px] sm:text-[11px] md:text-xs shadow-inner flex items-center justify-center gap-1.5 relative z-50 leading-relaxed font-sans">
          <span>{config.promoBannerText}</span>
        </div>
      )}
      {/* Top Credentials Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 shadow-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Gas Safe Registered #582910
            </span>
            <span className="text-slate-500">|</span>
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              £5M Public Liability Insured
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span className="text-white ml-0.5 font-semibold">5.0 rated on Google</span>
            </span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="inline-flex items-center gap-1 text-teal-400">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium text-white">24/7 emergency support</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Panel */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-100' 
            : 'bg-white py-4 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand/Logo */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-orange-500 flex items-center justify-center shadow-md shadow-teal-100 transition-transform duration-300 group-hover:scale-105">
              <Flame className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-800">
                north<span className="text-orange-500">Heat</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold -mt-1 font-mono">
                Plumbing & Heating
              </span>
            </div>
          </a>

          {/* Desktop Dropdown Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 relative">
            
            {/* Residential Plumbing Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('residential')}
                onMouseEnter={() => setActiveDropdown('residential')}
                className={`flex items-center gap-1 font-sans text-sm font-semibold py-2.5 transition-colors cursor-pointer ${
                  activeDropdown === 'residential' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                Residential Plumbing
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'residential' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'residential' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-64 bg-white/98 backdrop-blur-md border border-slate-100 rounded-xl shadow-xl p-3 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                >
                  <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-2 py-1 border-b border-slate-50 font-mono mb-1">
                    Home services
                  </div>
                  {residentialItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className="text-left py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors w-full cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Commercial Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('commercial')}
                onMouseEnter={() => setActiveDropdown('commercial')}
                className={`flex items-center gap-1 font-sans text-sm font-semibold py-2.5 transition-colors cursor-pointer ${
                  activeDropdown === 'commercial' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                Commercial Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'commercial' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'commercial' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-[460px] bg-white/98 backdrop-blur-md border border-slate-100 rounded-xl shadow-xl p-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                >
                  {/* Left Column: Heating and Washrooms */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-1 pb-1 border-b border-slate-55 font-mono mb-1.5">
                        {commercialCategories[0].title}
                      </div>
                      <div className="flex flex-col gap-1">
                        {commercialCategories[0].items?.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className="text-left py-1 px-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors cursor-pointer"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => handleItemClick('com-washrooms')}
                        className="text-[10px] font-black tracking-widest text-slate-500 uppercase px-1 pb-1 border-b border-slate-100 font-mono mb-1.5 flex justify-between items-center w-full hover:text-teal-600 text-left transition-colors cursor-pointer"
                      >
                        <span>{commercialCategories[1].title}</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-teal-500" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Maintenance */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-1 pb-1 border-b border-slate-55 font-mono mb-1.5">
                      {commercialCategories[2].title}
                    </div>
                    <div className="flex flex-col gap-1">
                      {commercialCategories[2].items?.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          className="text-left py-1 px-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('about')}
                onMouseEnter={() => setActiveDropdown('about')}
                className={`flex items-center gap-1 font-sans text-sm font-semibold py-2.5 transition-colors cursor-pointer ${
                  activeDropdown === 'about' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                About Us
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'about' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-56 bg-white/98 backdrop-blur-md border border-slate-100 rounded-xl shadow-xl p-3 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                >
                  <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-2 py-1 border-b border-slate-50 font-mono mb-1">
                    Company Info
                  </div>
                  {aboutItems.map((item) => {
                    // Map special anchors or launch normal overlays
                    let isAnchor = false;
                    let href = '';
                    if (item.name === 'Reviews') { isAnchor = true; href = '#testimonials'; }
                    if (item.name === 'Case Studies') { isAnchor = true; href = '#projects'; }
                    if (item.name === 'FAQs') { isAnchor = true; href = '#faq'; }

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id, isAnchor, href)}
                        className="text-left py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors w-full cursor-pointer"
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Discover Finance Toolbar Promo (Desktop Only) */}
            <button
              onClick={onOpenFinance}
              className="hidden lg:flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-600 hover:bg-orange-100 hover:text-orange-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm cursor-pointer hover:scale-103"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Discover Finance™</span>
            </button>
          </nav>

          {/* Action buttons (Phone helpline, Finance and quote) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Discover Finance trigger for mid size screens */}
            <button
              onClick={onOpenFinance}
              className="lg:hidden flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Finance™
            </button>

            <a 
              href={`tel:${config.phoneRaw}`}
              className="flex items-center gap-2 text-slate-800 hover:text-orange-500 font-bold text-xs bg-slate-50 hover:bg-slate-100 transition-all px-3 py-1.5 rounded-xl group border border-slate-200"
            >
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Phone className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <div className="text-left leading-normal">
                <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-semibold font-mono">Emergency</span>
                <span className="text-xs font-mono tracking-tight text-slate-700">{config.phone}</span>
              </div>
            </a>
            
            <button
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-teal-600/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Estimate
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[104px] z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-sm ml-auto h-[calc(100vh-104px)] shadow-2xl p-5 flex flex-col gap-4 transform transition-all duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Discover Finance Top Banner inside mobile view */}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenFinance(); }}
              className="w-full flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white text-xs font-bold p-3 rounded-xl shadow-md cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-orange-100 animate-pulse" />
                <span>Spread the cost with flexible Finance™</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">Discover</span>
            </button>

            <div className="h-px bg-slate-100 my-1"></div>

            {/* Mobile Expandable Residential Section */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => handleMobileSectionToggle('residential')}
                className="w-full bg-slate-50/80 px-4 py-3 flex justify-between items-center text-xs font-bold text-slate-700 hover:bg-slate-100/90 text-left cursor-pointer"
              >
                <span>🏠 Residential Plumbing</span>
                {mobileOpenSection === 'residential' ? <ChevronUp className="w-4 h-4 text-teal-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              
              {mobileOpenSection === 'residential' && (
                <div className="bg-white p-3 flex flex-col gap-1 border-t border-slate-50 max-h-60 overflow-y-auto">
                  {residentialItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className="text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors w-full cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Expandable Commercial Section */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => handleMobileSectionToggle('commercial')}
                className="w-full bg-slate-50/80 px-4 py-3 flex justify-between items-center text-xs font-bold text-slate-700 hover:bg-slate-100/90 text-left cursor-pointer"
              >
                <span>🏢 Commercial Services</span>
                {mobileOpenSection === 'commercial' ? <ChevronUp className="w-4 h-4 text-teal-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {mobileOpenSection === 'commercial' && (
                <div className="bg-white p-3 flex flex-col gap-4 border-t border-slate-50 max-h-72 overflow-y-auto text-left">
                  {/* Heating Category */}
                  <div>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 font-mono">
                      {commercialCategories[0].title}
                    </span>
                    <div className="flex flex-col gap-1">
                      {commercialCategories[0].items?.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          className="text-left py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Washrooms Button */}
                  <button
                    onClick={() => handleItemClick('com-washrooms')}
                    className="w-full py-2 px-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 flex justify-between items-center text-left cursor-pointer"
                  >
                    <span>🚿 {commercialCategories[1].title}</span>
                    <span className="text-[10px] font-mono text-teal-600">Browse →</span>
                  </button>

                  {/* Maintenance Category */}
                  <div>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 font-mono">
                      {commercialCategories[2].title}
                    </span>
                    <div className="flex flex-col gap-1">
                      {commercialCategories[2].items?.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          className="text-left py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Expandable About Section */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => handleMobileSectionToggle('about')}
                className="w-full bg-slate-50/80 px-4 py-3 flex justify-between items-center text-xs font-bold text-slate-700 hover:bg-slate-100/90 text-left cursor-pointer"
              >
                <span>ℹ️ About Us</span>
                {mobileOpenSection === 'about' ? <ChevronUp className="w-4 h-4 text-teal-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {mobileOpenSection === 'about' && (
                <div className="bg-white p-3 flex flex-col gap-1 border-t border-slate-50">
                  {aboutItems.map((item) => {
                    let isAnchor = false;
                    let href = '';
                    if (item.name === 'Reviews') { isAnchor = true; href = '#testimonials'; }
                    if (item.name === 'Case Studies') { isAnchor = true; href = '#projects'; }
                    if (item.name === 'FAQs') { isAnchor = true; href = '#faq'; }

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id, isAnchor, href)}
                        className="text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors w-full cursor-pointer"
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="h-px bg-slate-100 my-1"></div>

            {/* Helpline and Quote triggers on bottom mobile drawer */}
            <div className="flex flex-col gap-2 pt-2">
              <a 
                href={`tel:${config.phoneRaw}`}
                className="flex items-center gap-3 w-full bg-orange-50 border border-orange-100 p-3 rounded-xl text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] text-orange-600 uppercase tracking-widest font-bold">EMERGENCY LINE</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{config.phone}</span>
                </div>
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); onQuoteClick(); }}
                className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs cursor-pointer shadow-md"
              >
                Instant Estimate
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
