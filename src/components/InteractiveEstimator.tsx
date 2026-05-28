import React, { useState } from 'react';
import { Home, Bath, Flame, Droplet, ArrowRight, ArrowLeft, RefreshCw, Star, CheckSquare, Sparkles, PhoneCall, Check } from 'lucide-react';

export default function InteractiveEstimator() {
  const [activeTab, setActiveTab] = useState<'boiler' | 'bathroom'>('boiler');
  const [boilerStep, setBoilerStep] = useState(1);
  const [bathroomStep, setBathroomStep] = useState(1);
  
  // Boiler Calculator Inputs
  const [propertyType, setPropertyType] = useState<string>('');
  const [bathroomsCount, setBathroomsCount] = useState<string>('');
  const [boilerLocation, setBoilerLocation] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  
  // Bathroom Calculator Inputs
  const [bathroomSize, setBathroomSize] = useState<string>('');
  const [finishStandard, setFinishStandard] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // User details for lock-in
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleReset = () => {
    setBoilerStep(1);
    setBathroomStep(1);
    setPropertyType('');
    setBathroomsCount('');
    setBoilerLocation('');
    setFuelType('');
    setBathroomSize('');
    setFinishStandard('');
    setSelectedFeatures([]);
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setFormSubmitted(false);
    setErrorMessage('');
  };

  // Boiler estimation calculations
  const calculateBoilerQuote = () => {
    let basePrice = 1650;
    let recommendedBoiler = "Ideal Logic+ C30 Combi";
    let warrantyYears = 10;
    
    if (bathroomsCount === '2') {
      basePrice += 450;
      recommendedBoiler = "Worcester Bosch Greenstar 4000 Combi (30kW)";
      warrantyYears = 12;
    } else if (bathroomsCount === '3+') {
      basePrice += 1150;
      recommendedBoiler = "Worcester Bosch Greenstar 8000 Style (35kW)";
      warrantyYears = 12;
    }

    if (propertyType === 'detached') {
      basePrice += 250;
    } else if (propertyType === 'flat') {
      basePrice -= 150;
    }

    if (fuelType === 'lpg' || fuelType === 'oil') {
      basePrice += 300;
      recommendedBoiler += " (System Variant)";
    }

    if (boilerLocation === 'attic' || boilerLocation === 'garage') {
      basePrice += 180; // pipe routing charges
    }

    return {
      total: basePrice,
      boiler: recommendedBoiler,
      warranty: warrantyYears,
      monthlyFinance: (basePrice / 120).toFixed(2) // simple mock calculation over 120 months
    };
  };

  // Bathroom estimation calculations
  const calculateBathroomQuote = () => {
    let baseBudget = 3200;
    
    if (bathroomSize === 'family') {
      baseBudget = 5800;
    } else if (bathroomSize === 'master') {
      baseBudget = 9200;
    }

    if (finishStandard === 'designer') {
      baseBudget += (baseBudget * 0.25);
    } else if (finishStandard === 'spa') {
      baseBudget += (baseBudget * 0.45);
    }

    // Add selected features cost
    selectedFeatures.forEach(feature => {
      if (feature === 'tub_freestand') baseBudget += 950;
      if (feature === 'walkin_shower') baseBudget += 650;
      if (feature === 'underfloor_heat') baseBudget += 550;
      if (feature === 'vanity_wc') baseBudget += 400;
      if (feature === 'full_tiling') baseBudget += 1200;
    });

    return {
      total: Math.round(baseBudget),
      monthlyFinance: (baseBudget / 120).toFixed(2)
    };
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) {
      setErrorMessage('Please fill in all contact details to receive your formal code document.');
      return;
    }
    setErrorMessage('');
    setFormSubmitted(true);

    try {
      const selectedEng = { name: 'Martin Reynolds (Gas Safe #512781)', license: '512781', arrival: 'Tomorrow morning 8:30 - 10:30 AM' };
      
      let messageDetails = '';
      let serviceTitle = '';
      if (activeTab === 'boiler') {
        const quote = calculateBoilerQuote();
        serviceTitle = 'Boiler Installation';
        messageDetails = `Interactive Estimator Boiler: Rec Recommended: ${quote.boiler}, Warranty: ${quote.warranty} years, Quoted Price: £${quote.total.toLocaleString()}. Choices made: Property: ${propertyType}, Bathrooms: ${bathroomsCount}, Fuel standard: ${fuelType}, Proposed Location: ${boilerLocation}`;
      } else {
        const quote = calculateBathroomQuote();
        serviceTitle = 'Bathroom Fitting';
        messageDetails = `Interactive Estimator Bathroom: Size: ${bathroomSize}, Finish: ${finishStandard}, Quoted Budget: £${quote.total.toLocaleString()}. Selections: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'None'}`;
      }

      const newBooking = {
        id: 'NH-' + Math.floor(100000 + Math.random() * 900000),
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        serviceType: serviceTitle,
        urgency: 'routine',
        message: messageDetails,
        date: new Date().toISOString().split('T')[0],
        assignedEngineer: selectedEng.name,
        licenseNumber: selectedEng.license,
        techArrivalSlot: selectedEng.arrival,
        createdOn: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        status: 'Pending'
      };

      const stored = localStorage.getItem('northheat_active_leads');
      const list = stored ? JSON.parse(stored) : [];
      const updated = [newBooking, ...list];
      localStorage.setItem('northheat_active_leads', JSON.stringify(updated));
      
      // Notify all portal views immediately
      window.dispatchEvent(new Event('northheat_leads_updated'));
    } catch (err) {
      console.warn('Flipped lead cache writing in estimator', err);
    }
  };

  return (
    <section id="estimator" className="py-20 bg-slate-900 text-white relative">
      {/* Background soft grids */}
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-400/10 border border-orange-500/20 px-3 py-1 rounded-full inline-block mb-3">Self-Service Quotes</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
            Instant Online Budget Estimator
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
            Answer a few quick questions about your home setup to get an instant dynamic price calculation on the screen. No pushy sales, no initial call-out.
          </p>
        </div>

        {/* Tab switcher: Boiler vs Bathroom */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 p-1 rounded-2xl border border-slate-700 max-w-sm w-full flex">
            <button
              onClick={() => { setActiveTab('boiler'); handleReset(); }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'boiler' ? 'bg-teal-600 text-white shadow-md shadow-teal-500/10' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              Boiler Installation
            </button>
            <button
              onClick={() => { setActiveTab('bathroom'); handleReset(); }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'bathroom' ? 'bg-teal-600 text-white shadow-md shadow-teal-500/10' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bath className="w-4 h-4" />
              Bathroom Fit
            </button>
          </div>
        </div>

        {/* Dynamic Calculator Wrapper Card */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          
          {/* ================= BOILER ESTIMATOR SYSTEM ================= */}
          {activeTab === 'boiler' && (
            <div className="p-6 sm:p-8 lg:p-10">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 font-mono">Boiler Calculator Step {boilerStep} of 5</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === boilerStep ? 'w-8 bg-teal-500' : s < boilerStep ? 'w-3 bg-teal-800' : 'w-1.5 bg-slate-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Step 1: Property Type */}
              {boilerStep === 1 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-6">What type of property do you live in?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'detached', label: 'Detached', desc: 'Larger detached house' },
                      { id: 'semi', label: 'Semi-Detached', desc: 'Standard semi home' },
                      { id: 'terraced', label: 'Terraced', desc: 'Row / townhouse' },
                      { id: 'flat', label: 'Flat / Apt', desc: 'Compact apartment' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setPropertyType(item.id); setBoilerStep(2); }}
                        className={`p-5 rounded-2xl text-left border flex flex-col justify-between h-36 transition-all cursor-pointer hover:border-teal-500 group ${
                          propertyType === item.id 
                            ? 'bg-slate-700 border-teal-500 shadow-lg shadow-teal-500/5' 
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Home className={`w-6 h-6 transition-transform duration-300 group-hover:scale-115 ${propertyType === item.id ? 'text-teal-400' : 'text-slate-500'}`} />
                        <div>
                          <span className="block font-bold text-sm text-white">{item.label}</span>
                          <span className="block text-[10px] text-slate-400 mt-1">{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Bathrooms Count */}
              {boilerStep === 2 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-6">How many bathrooms, en-suites, and showers do you have?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: '1', label: '1 Bathroom / Shower', desc: 'Normal combi boiler capacity' },
                      { id: '2', label: '2 Bathrooms', desc: 'Requires higher flow/output size' },
                      { id: '3+', label: '3+ Bathrooms', desc: 'Recommended system + hot cylinder' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setBathroomsCount(item.id); setBoilerStep(3); }}
                        className={`p-6 rounded-2xl text-left border transition-all cursor-pointer hover:border-teal-500 group ${
                          bathroomsCount === item.id 
                            ? 'bg-slate-700 border-teal-500 shadow-lg shadow-teal-500/5' 
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <Bath className={`w-8 h-8 ${bathroomsCount === item.id ? 'text-teal-400' : 'text-slate-500'}`} />
                          <span className="font-mono text-[11px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded border border-slate-700">Level {item.id}</span>
                        </div>
                        <span className="block font-bold text-sm text-white">{item.label}</span>
                        <span className="block text-xs text-slate-400 mt-1">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setBoilerStep(1)} className="mt-8 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                </div>
              )}

              {/* Step 3: Fuel Type */}
              {boilerStep === 3 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-6">What fuel does your central heating system use?</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: 'gas', label: 'Mains Natural Gas', desc: 'Standard UK gas supply' },
                      { id: 'lpg', label: 'LPG Bottled Gas', desc: 'Liquefied propane fuel' },
                      { id: 'oil', label: 'Heating Oil', desc: 'External oil storage storage tank' },
                      { id: 'electric', label: 'Electrics only', desc: 'Electric system boilers' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setFuelType(item.id); setBoilerStep(4); }}
                        className={`p-5 rounded-2xl text-left border flex flex-col justify-between h-36 transition-all cursor-pointer hover:border-teal-500 group ${
                          fuelType === item.id 
                            ? 'bg-slate-700 border-teal-500 shadow-lg shadow-teal-500/5' 
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Droplet className={`w-6 h-6 ${fuelType === item.id ? 'text-teal-400' : 'text-slate-500'}`} />
                        <div>
                          <span className="block font-bold text-sm text-white">{item.label}</span>
                          <span className="block text-[10px] text-slate-400 mt-1">{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setBoilerStep(2)} className="mt-8 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                </div>
              )}

              {/* Step 4: Boiler Location */}
              {boilerStep === 4 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-6">Where is your existing boiler situated?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { id: 'kitchen', label: 'Kitchen' },
                      { id: 'utility', label: 'Utility Room' },
                      { id: 'attic', label: 'Attic Loft' },
                      { id: 'bathroom', label: 'Bathroom' },
                      { id: 'garage', label: 'Garage' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setBoilerLocation(item.id); setBoilerStep(5); }}
                        className={`p-5 rounded-2xl text-center border flex flex-col gap-3 justify-center items-center transition-all cursor-pointer hover:border-teal-500 ${
                          boilerLocation === item.id 
                            ? 'bg-slate-700 border-teal-500 shadow-lg shadow-teal-500/5' 
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 ${boilerLocation === item.id ? 'text-teal-400 bg-teal-500/10' : 'text-slate-400'}`}>
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="block font-bold text-xs sm:text-sm text-white">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setBoilerStep(3)} className="mt-8 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                </div>
              )}

              {/* Step 5: Boiler Estimate Results Screen */}
              {boilerStep === 5 && (
                <div className="animate-fade-in">
                  {!formSubmitted ? (
                    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Calculator summary parameters */}
                      <div className="lg:col-span-7 bg-slate-900/60 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-teal-400 mb-3 text-xs uppercase tracking-widest font-mono font-bold">
                            <Sparkles className="w-4 h-4" /> Boiler calculations parsed
                          </div>
                          <h4 className="font-display font-extrabold text-xl sm:text-2xl mb-1 text-white">Your Instantly Generated Guide Quote</h4>
                          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                            These figures represent a high-fidelity estimate including materials, a full Gas Safe expert installation, and chemical treatment flush.
                          </p>

                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Recommended System</span>
                              <span className="text-xs sm:text-sm font-bold text-white text-right">{calculateBoilerQuote().boiler}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Total Warranty Period</span>
                              <span className="text-xs sm:text-sm font-bold text-white">{calculateBoilerQuote().warranty} Years (Parts & Labour)</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Estimated Guide Price</span>
                              <span className="text-xs sm:text-sm font-extrabold text-teal-400 font-mono">£{calculateBoilerQuote().total.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Finance details badge */}
                          <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                              <span className="text-xs font-bold">%</span>
                            </div>
                            <div className="text-left">
                              <span className="block text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Interest-Free Finance Variant</span>
                              <span className="block text-xs text-slate-300 mt-0.5">Pay as low as <strong className="text-white font-mono">£{calculateBoilerQuote().monthlyFinance}/month</strong> spread over 10 years.</span>
                            </div>
                          </div>
                        </div>

                        <button onClick={() => setBoilerStep(4)} className="mt-6 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Start Over</button>
                      </div>

                      {/* Right: Contact Form to book survey and lock in the estimate */}
                      <form onSubmit={handleLeadSubmit} className="lg:col-span-5 bg-slate-750 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="font-display font-extrabold text-sm uppercase tracking-wide text-slate-300 mb-4">Book Free Physical Survey</h4>
                          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                            Lock in this estimate today. We’ll arrange a quick 15-minute home or virtual survey to confirm details and issue a binding fixed-price contract.
                          </p>

                          <div className="space-y-3 mb-4">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Full Name</label>
                              <input 
                                type="text" 
                                required
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-white" 
                                placeholder="e.g. David Harrington"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Phone Number</label>
                              <input 
                                type="tel" 
                                required
                                value={clientPhone}
                                onChange={(e) => setClientPhone(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-white font-mono" 
                                placeholder="e.g. 07123 456 789"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-white" 
                                placeholder="name@example.com"
                              />
                            </div>
                          </div>

                          {errorMessage && <span className="text-[11px] text-rose-400 block mb-2">{errorMessage}</span>}
                        </div>

                        <button 
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-750 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg transition-colors cursor-pointer"
                        >
                          Send Free Call Back Booking
                          <PhoneCall className="w-4 h-4 ml-1" />
                        </button>
                      </form>

                    </div>
                  ) : (
                    /* Lead confirmation state */
                    <div className="text-center py-10 sm:py-16 max-w-md mx-auto animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                        <Check className="w-8 h-8 font-extrabold" />
                      </div>
                      <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">Survey Requested!</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        Thank you, <strong className="text-white">{clientName}</strong>. Your estimate of <strong className="text-teal-400">£{calculateBoilerQuote().total.toLocaleString()}</strong> has been submitted to scheduling operations.
                      </p>
                      
                      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 text-left mb-8 space-y-2 text-xs">
                        <p className="text-slate-400">● <strong className="text-white">Estimate Locked In:</strong> {calculateBoilerQuote().boiler}</p>
                        <p className="text-slate-400">● <strong className="text-white">Dispatch Contact:</strong> {clientPhone} / {clientEmail}</p>
                        <p className="text-slate-400">● <strong className="text-white">Next Action:</strong> An engineer will call you in 1-2 hours to secure your survey slot.</p>
                      </div>

                      <button 
                        onClick={handleReset} 
                        className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 font-semibold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Calculate Another Price
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}


          {/* ================= BATHROOM ESTIMATOR SYSTEM ================= */}
          {activeTab === 'bathroom' && (
            <div className="p-6 sm:p-8 lg:p-10">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 font-mono">Bathroom Calculator Step {bathroomStep} of 4</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === bathroomStep ? 'w-8 bg-teal-500' : s < bathroomStep ? 'w-3 bg-teal-800' : 'w-1.5 bg-slate-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Step 1: Bathroom Size */}
              {bathroomStep === 1 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-6">What is the approximate size of the bathroom area?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'ensuite', label: 'Ensuite / Cloakroom', desc: 'Compact layout, under 4m² floor space.' },
                      { id: 'family', label: 'Standard Family Bathroom', desc: 'Typical mid-size bath, 4m² to 8m² floor space.' },
                      { id: 'master', label: 'Grand Master Bathroom', desc: 'Large bath / ensuite combo, over 8m² floor area.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setBathroomSize(item.id); setBathroomStep(2); }}
                        className={`p-6 rounded-2xl text-left border flex flex-col justify-between h-44 transition-all cursor-pointer hover:border-teal-500 group ${
                          bathroomSize === item.id 
                            ? 'bg-slate-700 border-teal-500 shadow-lg shadow-teal-500/5' 
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Bath className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 ${bathroomSize === item.id ? 'text-teal-400' : 'text-slate-500'}`} />
                        <div>
                          <span className="block font-bold text-sm text-white">{item.label}</span>
                          <span className="block text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Finish Standard */}
              {bathroomStep === 2 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-6">What style and standard of finish are you aiming for?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'modern', label: 'Modern Classic', desc: 'Elegant, clean, highly functional fixtures. Premium but highly cost-conscious.' },
                      { id: 'designer', label: 'Designer Minimalist', desc: 'Matte black or brass fitting, concealed piping, backlights, wall-hung WC.' },
                      { id: 'spa', label: 'Luxury Marble Spa', desc: 'Bespoke marble tiling, freestanding bath, smart thermostatic rain head, custom niches.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setFinishStandard(item.id); setBathroomStep(3); }}
                        className={`p-6 rounded-2xl text-left border flex flex-col justify-between h-44 transition-all cursor-pointer hover:border-teal-500 group ${
                          finishStandard === item.id 
                            ? 'bg-slate-700 border-teal-500 shadow-lg shadow-teal-500/5' 
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Sparkles className={`w-7 h-7 transition-all duration-300 group-hover:rotate-12 ${finishStandard === item.id ? 'text-teal-400' : 'text-slate-500'}`} />
                        <div>
                          <span className="block font-bold text-sm text-white">{item.label}</span>
                          <span className="block text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setBathroomStep(1)} className="mt-8 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                </div>
              )}

              {/* Step 3: Elements to install */}
              {bathroomStep === 3 && (
                <div className="animate-fade-in">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-150 mb-4">Select desired elements to include in the plan:</h3>
                  <p className="text-xs text-slate-400 mb-6">Choose as many as you need to build your customized layout list.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'tub_freestand', label: 'Freestanding Bath' },
                      { id: 'walkin_shower', label: 'Walk-in Shower' },
                      { id: 'underfloor_heat', label: 'Underfloor Heating' },
                      { id: 'vanity_wc', label: 'Wall-Hung Vanity & WC' },
                      { id: 'full_tiling', label: 'Premium Full-Tiling' }
                    ].map((item) => {
                      const selected = selectedFeatures.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleFeature(item.id)}
                          className={`p-4 rounded-xl text-left border flex items-center gap-3 transition-all cursor-pointer hover:border-teal-500 ${
                            selected 
                              ? 'bg-slate-700 border-teal-500 shadow-sm' 
                              : 'bg-slate-900 border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            selected ? 'bg-teal-500 border-teal-400 text-white' : 'border-slate-700 bg-slate-800 text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5 font-bold" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-white">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    <button onClick={() => setBathroomStep(2)} className="text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                    <button
                      onClick={() => setBathroomStep(4)}
                      className="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Calculate Quote Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Bathroom Estimate Results Screen */}
              {bathroomStep === 4 && (
                <div className="animate-fade-in">
                  {!formSubmitted ? (
                    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Calculator summary parameters */}
                      <div className="lg:col-span-7 bg-slate-900/60 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-center gap-2 text-teal-400 mb-3 text-xs uppercase tracking-widest font-mono font-bold">
                            <Sparkles className="w-4 h-4" /> Bathroom Blueprint active
                          </div>
                          <h4 className="font-display font-extrabold text-xl sm:text-2xl mb-1 text-white">Your Instantly Generated Guide Quote</h4>
                          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                            Includes fully waterproofed tanking guarantees, all electrical fittings, full structural waste plumbing, tiling, and luxury fixture fitment.
                          </p>

                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Layout Size</span>
                              <span className="text-xs sm:text-sm font-bold text-white uppercase">{bathroomSize} Bathroom area</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Styling Theme</span>
                              <span className="text-xs sm:text-sm font-bold text-white uppercase">{finishStandard} specifications</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Fittings Count</span>
                              <span className="text-xs sm:text-sm font-bold text-white">{selectedFeatures.length} Custom additions</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-850">
                              <span className="text-xs text-slate-400">Estimated Project Cost</span>
                              <span className="text-xs sm:text-sm font-extrabold text-teal-400 font-mono">£{calculateBathroomQuote().total.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Finance details badge */}
                          <div className="bg-teal-950/40 border border-teal-500/20 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-400 shrink-0">
                              <span className="text-xs font-bold">%</span>
                            </div>
                            <div className="text-left">
                              <span className="block text-[10px] text-teal-400 uppercase font-bold tracking-wider">Spread the cost easily</span>
                              <span className="block text-xs text-slate-300 mt-0.5">Pay as low as <strong className="text-white font-mono">£{calculateBathroomQuote().monthlyFinance}/month</strong> over interest-free pathways.</span>
                            </div>
                          </div>
                        </div>

                        <button onClick={() => setBathroomStep(3)} className="mt-6 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back to Elements</button>
                      </div>

                      {/* Right: Contact Form to book survey and lock in the estimate */}
                      <form onSubmit={handleLeadSubmit} className="lg:col-span-5 bg-slate-750 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="font-display font-extrabold text-sm uppercase tracking-wide text-slate-300 mb-4">Request Free Design Visit</h4>
                          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                            Lock in this budget range today. We’ll arrange a free, no-obligation designer layout visit to execute precise measuring and draft a 3D CAD visualization.
                          </p>

                          <div className="space-y-3 mb-4">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Full Name</label>
                              <input 
                                type="text" 
                                required
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-white" 
                                placeholder="e.g. David Harrington"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Phone Number</label>
                              <input 
                                type="tel" 
                                required
                                value={clientPhone}
                                onChange={(e) => setClientPhone(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-white font-mono" 
                                placeholder="e.g. 07123 456 789"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-white" 
                                placeholder="name@example.com"
                              />
                            </div>
                          </div>

                          {errorMessage && <span className="text-[11px] text-rose-400 block mb-2">{errorMessage}</span>}
                        </div>

                        <button 
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-750 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg transition-colors cursor-pointer"
                        >
                          Send Free Call Back Booking
                          <PhoneCall className="w-4 h-4 ml-1" />
                        </button>
                      </form>

                    </div>
                  ) : (
                    /* Lead confirmation state */
                    <div className="text-center py-10 sm:py-16 max-w-md mx-auto animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                        <Check className="w-8 h-8 font-extrabold" />
                      </div>
                      <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">Design Visit Requested!</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        Thank you, <strong className="text-white">{clientName}</strong>. Your customized bathroom price range of <strong className="text-teal-400">£{calculateBathroomQuote().total.toLocaleString()}</strong> has been submitted to scheduling operations.
                      </p>
                      
                      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 text-left mb-8 space-y-2 text-xs">
                        <p className="text-slate-400">● <strong className="text-white">Estimate Locked In:</strong> {bathroomSize.toUpperCase()} bathroom in {finishStandard.toUpperCase()} finish</p>
                        <p className="text-slate-400">● <strong className="text-white">Selected Additions:</strong> {selectedFeatures.length} Custom hardware profiles</p>
                        <p className="text-slate-400">● <strong className="text-white">Next Action:</strong> A design surveyor will telephone you on <strong className="text-white">{clientPhone}</strong> within 1-2 hours to secure your design layout session.</p>
                      </div>

                      <button 
                        onClick={handleReset} 
                        className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 font-semibold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Calculate Another Price
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
