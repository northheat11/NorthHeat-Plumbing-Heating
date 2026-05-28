import React, { useState } from 'react';
import { faqs } from '../data';
import { FAQ } from '../types';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';

export default function FaqAccordion() {
  const [activeId, setActiveId] = useState<string | null>('faq1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'boilers' | 'bathrooms' | 'emergencies'>('all');

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-100/60 px-3 py-1 rounded-full inline-block mb-3 font-sans">Common Questions</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-slate-500 leading-relaxed">
            Gain immediate insight into our Gas Safe credentials, licensing, extended warranties, sizing surveys, and 24-hour dispatch.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'general', label: 'General / Location' },
            { id: 'boilers', label: 'Heating & Boilers' },
            { id: 'bathrooms', label: 'Bathroom Fitting' },
            { id: 'emergencies', label: '24/7 Emergencies' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/5'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion container */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-teal-500 bg-slate-50/50 shadow-md shadow-teal-500/5' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 group cursor-pointer"
                >
                  <div className="flex gap-3 items-start">
                    <HelpCircle className={`w-5 fill-current shrink-0 mt-0.5 transition-colors ${
                      isOpen ? 'text-teal-600' : 'text-slate-400'
                    }`} />
                    <span className={`font-display font-bold text-sm sm:text-base tracking-tight leading-tight transition-colors ${
                      isOpen ? 'text-teal-700' : 'text-slate-850 group-hover:text-teal-600'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    )}
                  </div>
                </button>

                {/* Answer drawer and slide transitions */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-0 border-t border-slate-100 animate-fade-in">
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call us helper footer */}
        <div className="mt-12 text-center bg-slate-50 rounded-2xl p-6 border border-slate-100 max-w-2xl mx-auto">
          <p className="text-xs text-slate-500 mb-3 font-semibold">Have any other questions or need customized planning help?</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <a 
              href="tel:01134678910"
              className="inline-flex items-center gap-1.5 font-bold font-mono text-sm text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              0113 467 8910
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <a 
              href="#contact"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors underline decoration-2 underline-offset-4"
            >
              Request Free Call Back Survey
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
