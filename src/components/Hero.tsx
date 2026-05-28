import React, { useState } from 'react';
import { 
  ShieldCheck, Calendar, Flame, AlertCircle, Sparkles, Star, 
  Percent, ArrowRight, Home, Building2, Info, ChevronRight, Bath, Wrench, ShieldAlert,
  Send, CheckCircle2, Mail, Phone, User
} from 'lucide-react';
import { useWebsiteConfig } from '../lib/config';

interface HeroProps {
  onQuoteClick: () => void;
  onContactClick: () => void;
  onOpenService: (serviceId: string) => void;
  onOpenFinance: () => void;
}

const FORWARD_ENGINEERS = [
  { name: 'Martin Reynolds (Gas Safe #512781)', license: '512781', arrival: 'Within the next 2 hours' },
  { name: 'Steve Finch (Senior Plumber)', license: 'N/A', arrival: 'Today afternoon' },
  { name: 'Gary Mitchell (Gas Safe #489110)', license: '489110', arrival: 'Immediate Dispatch Unit' }
];

export default function Hero({ onQuoteClick, onContactClick, onOpenService, onOpenFinance }: HeroProps) {
  const config = useWebsiteConfig();
  
  // Interactive lead generation states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('Boiler Installation');
  const [formNotes, setFormNotes] = useState('');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail) return;

    setIsFormSubmitting(true);

    // Simulate reliable rapid server registration
    setTimeout(() => {
      const selectedEng = FORWARD_ENGINEERS[Math.floor(Math.random() * FORWARD_ENGINEERS.length)];
      
      const newLeadObj = {
        id: 'NH-' + Math.floor(100000 + Math.random() * 900000),
        name: formName,
        phone: formPhone,
        email: formEmail,
        serviceType: formService,
        urgency: formService.toLowerCase().includes('emergency') ? 'emergency' : 'routine',
        message: formNotes || "Hero Quick Booking",
        date: new Date().toISOString().split('T')[0],
        assignedEngineer: selectedEng.name,
        licenseNumber: selectedEng.license,
        techArrivalSlot: formService.toLowerCase().includes('emergency') ? 'Continuous Live Dispatch: Under 30-45 mins' : selectedEng.arrival,
        createdOn: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        status: 'Pending'
      };

      try {
        const storedLeads = localStorage.getItem('northheat_active_leads');
        const list = storedLeads ? JSON.parse(storedLeads) : [];
        const updatedList = [newLeadObj, ...list];
        localStorage.setItem('northheat_active_leads', JSON.stringify(updatedList));
        window.dispatchEvent(new Event('northheat_leads_updated'));
      } catch (err) {
        console.warn('Flipped lead cache writing', err);
      }

      setSubmittedLead(newLeadObj);
      setIsFormSubmitting(false);

      // Reset fields
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormNotes('');
    }, 850);
  };

  return (
    <section id="home" className="relative bg-slate-900 overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Glow shapes for a premium technical atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Column 1: Copy, Benefits & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Live indicator badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-400 tracking-wide uppercase mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              West Yorkshire plumbing & boiler legends
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-x tracking-tight leading-[1.08] mb-4 text-white">
              {config.heroTitle || "Expert Boiler & Bathrooms Plumbed To Pure Perfection."}
            </h1>

            <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mb-6 leading-relaxed">
              {config.heroSubtitle || "We are Yorkshire’s premium Gas Safe registered professionals. Enjoy high-efficiency combis with direct manufacturer guarantees up to 12 years, customized bathroom styling, and responsive local engineers."}
            </p>

            {/* Structured checklists */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-7 w-full max-w-md">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Gas Safe Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">0% APR Finance Option</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Up to 12y Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">No Premium Call-Outs</span>
              </div>
            </div>

            {/* CTA panel buttons with "Discover Finance™" highlighted */}
            <div className="flex flex-wrap gap-3.5 w-full">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-black px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Get Boiler Estimate
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenFinance}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white border border-transparent font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-orange-500/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <Percent className="w-4 h-4 text-orange-100" />
                Discover Finance™
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold px-5 py-3.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Inquire Online
              </button>
            </div>
          </div>

          {/* Column 2: High Conversion Lead Capture Form (User Goal fulfilled) */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md mx-auto bg-slate-950/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-6 z-10 transition-all">
              
              {/* Outer glowing aura to support premium context */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/30 to-orange-500/20 rounded-3xl blur-md -z-10"></div>
              
              {!submittedLead ? (
                /* Interactive Form Screen */
                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <div className="pb-2 border-b border-slate-800">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 font-mono block">Instant Callback Service</span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">Get Your Free Quote Today</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Average local callback in Leeds is under 8 minutes</p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Your Full Name</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. David Mercer"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-teal-500 rounded-xl py-2.5 pl-9 pr-4 text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Active Mobile</label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 07700 900077"
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-teal-500 rounded-xl py-2.5 pl-9 pr-4 text-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Email Address</label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            placeholder="e.g. david@leeds.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-teal-500 rounded-xl py-2.5 pl-9 pr-4 text-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-slate-400 font-bold mb-1.5">Required Project Service</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Boiler Installation',
                          'Emergency Repair',
                          'Bathroom Fitting',
                          'General Plumbing'
                        ].map((srv) => (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setFormService(srv)}
                            className={`py-2 px-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                              formService === srv
                                ? 'bg-teal-950/40 border-teal-500 text-teal-400 shadow-inner'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            {srv === 'Boiler Installation' ? '🔥 Boiler Upgrade' :
                             srv === 'Emergency Repair' ? '🚨 Rapid Repair' :
                             srv === 'Bathroom Fitting' ? '🛀 Bath Fitting' : '🔧 Plumber Need'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Brief Description (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Describe your issue or current plumbing request..."
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-3 text-white focus:outline-none resize-none leading-relaxed transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full bg-teal-500 hover:bg-teal-600 active:scale-98 text-white py-3.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isFormSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin"></span>
                        Registering Lead...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Secure My Booking Now
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-900 font-semibold uppercase tracking-wide">
                    <span className="flex items-center gap-1 font-mono text-emerald-400">
                      <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" /> 100% Secure Client File
                    </span>
                    <span>No deposit required</span>
                  </div>
                </form>
              ) : (
                /* Post-Submission conversion success banner */
                <div className="text-left space-y-4 py-3 animate-in fade-in duration-300">
                  <div className="h-11 w-11 bg-teal-500/15 border border-teal-500/30 text-teal-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">BOOKING REGISTERED</span>
                    <h3 className="text-lg font-black text-white mt-1">Estimator Dispatch Code: {submittedLead.id}</h3>
                    <p className="text-xs text-slate-450 mt-1.5 leading-relaxed font-medium">
                      Excellent, {submittedLead.name}! Your request for <span className="text-white font-bold">{submittedLead.serviceType}</span> is queued with Leeds dispatch center.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px]">
                      <span className="text-slate-500 uppercase font-mono text-[9px] font-bold">Assigned Technician:</span>
                      <strong className="text-slate-200">{submittedLead.assignedEngineer}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 uppercase font-mono text-[9px] font-bold">Estimated Dispatch:</span>
                      <strong className="text-emerald-400 uppercase font-mono">{submittedLead.techArrivalSlot}</strong>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3.5 border border-slate-850 rounded-xl text-[11px] text-slate-400 flex gap-2 items-start font-medium leading-relaxed">
                    <ShieldCheck className="w-4.5 h-4.5 text-teal-400 shrink-0" />
                    <p>
                      An engineer is reviewing your checklist now. You'll receive a callback on <strong className="text-teal-400">{submittedLead.phone}</strong> in under 8 minutes.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmittedLead(null)}
                    className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold py-2.5 rounded-xl text-xs border border-slate-800 transition-all cursor-pointer text-center"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
