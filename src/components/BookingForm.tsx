import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Calendar, Sparkles, Clock, AlertTriangle, Trash2, Edit2 } from 'lucide-react';

interface BookingFormProps {
  selectedServiceId: string;
}

interface LocalSavedBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  urgency: string;
  message: string;
  date: string;
  assignedEngineer: string;
  licenseNumber: string;
  techArrivalSlot: string;
  createdOn: string;
}

const ENGINEERS = [
  { name: 'Martin Reynolds (Gas Safe #512781)', license: '512781', arrival: 'Tomorrow morning 8:30 - 10:30 AM' },
  { name: 'Steve Finch (Senior Plumber)', license: 'N/A', arrival: 'Today afternoon 3:00 - 5:00 PM' },
  { name: 'Gary Mitchell (Gas Safe #489110)', license: '489110', arrival: 'Tomorrow afternoon 1:00 - 3:00 PM' }
];

export default function BookingForm({ selectedServiceId }: BookingFormProps) {
  const [serviceType, setServiceType] = useState('boilers');
  const [urgency, setUrgency] = useState('routine');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [prefDate, setPrefDate] = useState('');
  const [message, setMessage] = useState('');
  const [savedBookings, setSavedBookings] = useState<LocalSavedBooking[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<LocalSavedBooking | null>(null);

  // Sync with prop if it changes
  useEffect(() => {
    if (selectedServiceId) {
      setServiceType(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Load existing bookings from localStorage
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('northheat_active_leads');
        if (saved) {
          setSavedBookings(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Storage sync failed:", e);
      }
    };

    handleSync(); // initial call
    window.addEventListener('northheat_leads_updated', handleSync);
    return () => {
      window.removeEventListener('northheat_leads_updated', handleSync);
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      return;
    }

    // Select randomly from engineers list
    const selectedEng = ENGINEERS[Math.floor(Math.random() * ENGINEERS.length)];

    // Fetch the freshest leads list to prevent overwriting parallel leads
    const freshStored = localStorage.getItem('northheat_active_leads');
    const existingList = freshStored ? JSON.parse(freshStored) : [];

    const newBooking: LocalSavedBooking = {
      id: 'NH-' + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      email,
      serviceType: serviceType === 'boilers' ? 'Boiler Installation' : serviceType === 'bathrooms' ? 'Bathroom Fitting' : serviceType === 'emergencies' ? 'Emergency repair' : 'General Plumbing',
      urgency,
      message: message || "No extra notes provided.",
      date: prefDate || new Date().toISOString().split('T')[0],
      assignedEngineer: selectedEng.name,
      licenseNumber: selectedEng.license,
      techArrivalSlot: urgency === 'emergency' ? 'Continuous Live Dispatch: Under 30-45 minutes' : selectedEng.arrival,
      createdOn: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };

    const updated = [newBooking, ...existingList];
    setSavedBookings(updated);
    localStorage.setItem('northheat_active_leads', JSON.stringify(updated));
    window.dispatchEvent(new Event('northheat_leads_updated'));
    setActiveReceipt(newBooking);

    // Clear inputs
    setName('');
    setPhone('');
    setEmail('');
    setPrefDate('');
    setMessage('');
  };

  const handleDeleteBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const freshStored = localStorage.getItem('northheat_active_leads');
    const existingList = freshStored ? JSON.parse(freshStored) : [];
    const filtered = existingList.filter((b: any) => b.id !== id);
    setSavedBookings(filtered);
    localStorage.setItem('northheat_active_leads', JSON.stringify(filtered));
    window.dispatchEvent(new Event('northheat_leads_updated'));
    if (activeReceipt?.id === id) {
      setActiveReceipt(null);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-905 relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-[140px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Info and Live active tracking logs */}
          <div className="lg:col-span-5 text-left text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-400/10 border border-orange-500/20 px-3 py-1 rounded-full inline-block mb-3 font-sans">Get in touch</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4 text-white">
              Request a Friendly Call Back
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Fill in our booking terminal. Our dispatch office monitors submissions live. We call back to organize physical site surveys or dispatch emergency vehicles in a flash.
            </p>

            {/* Direct contact list */}
            <div className="space-y-4 mb-10 text-slate-350">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono">24/7 HELPLINE DOCKETS</span>
                  <a href="tel:01134678910" className="text-base font-bold text-white hover:text-teal-400 font-mono transition-colors">0113 467 8910</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono">GENERAL ENQUIRIES</span>
                  <a href="mailto:info@northheat.co.uk" className="text-base font-semibold text-white hover:text-teal-400 transition-colors">info@northheat.co.uk</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-500 font-mono">SERVICE COVERAGE</span>
                  <span className="block text-sm text-slate-300">Leeds, Harrogate & greater West Yorkshire</span>
                </div>
              </div>
            </div>

            {/* Active saved local bookings section (Interactive list) */}
            {savedBookings.length > 0 && (
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    YOUR ACTIVE PORTAL TICKETS ({savedBookings.length})
                  </span>
                </div>
                
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {savedBookings.map((bk) => (
                    <div 
                      key={bk.id}
                      onClick={() => setActiveReceipt(bk)}
                      className="p-3 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-750 transition-all rounded-xl flex justify-between items-center cursor-pointer group"
                    >
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold text-teal-400">{bk.id}</span>
                          <span className="text-[10px] uppercase bg-slate-800 text-slate-400 border border-slate-700 px-1 rounded font-semibold font-mono">{bk.urgency}</span>
                        </div>
                        <span className="block text-xs font-bold text-slate-200 mt-1 max-w-[200px] truncate">{bk.serviceType}</span>
                        <span className="block text-[9px] text-slate-450 mt-0.5">{bk.createdOn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-slate-400 group-hover:text-teal-400 transition-colors">View Receipt</span>
                        <button 
                          onClick={(e) => handleDeleteBooking(bk.id, e)}
                          title="Delete / Cancel Ticket"
                          className="p-1 px-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/70 border border-red-900/40 text-red-400 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Form or active success screen */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-150 shadow-2xl relative">
            
            {activeReceipt ? (
              /* Booking Success receipt state */
              <div className="text-center py-6 animate-fade-in text-left">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 font-extrabold" />
                </div>
                
                <h3 className="font-display font-black text-2xl text-slate-900 text-center mb-1">Enquiry Successfully Lodged</h3>
                <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed max-w-sm mx-auto">
                  Your details have bypassed the intake queue and registered on our live dispatch schedule. A copy of this ticket is logged locally.
                </p>

                {/* Receipt ticket layout */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6 max-w-lg mx-auto">
                  {/* Top card header */}
                  <div className="bg-slate-900 text-slate-300 text-[10px] font-mono uppercase tracking-wider p-3 px-4 flex justify-between justify-items-center">
                    <span>Ticket: {activeReceipt.id}</span>
                    <span className="text-teal-400">STATUS: ACTIVE IN QUEUE</span>
                  </div>
                  
                  {/* Card fields */}
                  <div className="p-5 text-left space-y-3 text-xs text-slate-650">
                    <div className="grid grid-cols-2 py-1.5 border-b border-slate-200">
                      <span className="text-slate-400 font-medium">Customer Name</span>
                      <strong className="text-slate-950 text-right">{activeReceipt.name}</strong>
                    </div>
                    <div className="grid grid-cols-2 py-1.5 border-b border-slate-200">
                      <span className="text-slate-400 font-medium">Contact Phone</span>
                      <strong className="text-slate-950 text-right font-mono">{activeReceipt.phone}</strong>
                    </div>
                    <div className="grid grid-cols-2 py-1.5 border-b border-slate-200">
                      <span className="text-slate-400 font-medium">Job Category</span>
                      <strong className="text-slate-950 text-right">{activeReceipt.serviceType}</strong>
                    </div>
                    <div className="grid grid-cols-2 py-1.5 border-b border-slate-200">
                      <span className="text-slate-400 font-medium">Priority Urgency</span>
                      <strong className="text-slate-950 text-right uppercase text-[10px] font-mono tracking-widest">{activeReceipt.urgency}</strong>
                    </div>
                    <div className="grid grid-cols-2 py-1.5 border-b border-slate-200">
                      <span className="text-slate-400 font-medium">Target Schedule Date</span>
                      <strong className="text-slate-950 text-right">{activeReceipt.date}</strong>
                    </div>

                    <div className="py-2.5 px-3 bg-teal-50 border border-teal-100 rounded-xl mt-3">
                      <div className="flex gap-2 items-start text-teal-800">
                        <Clock className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold tracking-wider text-teal-700 font-mono">Assigned Dispatch Slot</span>
                          <span className="block text-[11px] mt-0.5 text-slate-700">Engineer <strong>{activeReceipt.assignedEngineer}</strong> target response:</span>
                          <span className="block font-bold text-teal-900 mt-1">{activeReceipt.techArrivalSlot}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => setActiveReceipt(null)}
                    className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
                  >
                    Submit New Booking
                  </button>
                  <button 
                    onClick={() => setActiveReceipt(null)}
                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 border border-slate-200 rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
                  >
                    Close Log
                  </button>
                </div>
              </div>
            ) : (
              /* Main Interactive Booking Form */
              <form onSubmit={handleBookingSubmit} className="text-left space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Select Service */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Required Service Category</label>
                    <select 
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-3 py-3 text-xs sm:text-sm focus:outline-none focus:border-teal-500 text-slate-800 font-semibold"
                    >
                      <option value="boilers">Boiler Installations & Heating</option>
                      <option value="bathrooms">Luxury Bathroom Fitting</option>
                      <option value="emergencies">24/7 emergency repair</option>
                      <option value="plumbing">General Plumbing Services</option>
                    </select>
                  </div>

                  {/* Select Urgency */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Priority / Urgency Level</label>
                    <select 
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-3 py-3 text-xs sm:text-sm focus:outline-none focus:border-teal-500 text-slate-800 font-semibold"
                    >
                      <option value="routine">Routine Booking (Flexible)</option>
                      <option value="urgent">Urgent Requirement (24-48 hours)</option>
                      <option value="emergency">🚨 IMMEDIATE EMERGENCY (Severe dispatch)</option>
                    </select>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-4"></div>

                <div className="space-y-4">
                  {/* Contact Name */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-teal-500 text-slate-800" 
                      placeholder="e.g. David Harrington"
                    />
                  </div>

                  {/* Phone & Email side-by-side */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Mobile / Telephone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-teal-500 text-slate-800 font-mono" 
                        placeholder="e.g. 07123 456789"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-teal-500 text-slate-800" 
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  {/* Schedule dates & optional message */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Requested Survey Date</label>
                      <input 
                        type="date"
                        value={prefDate}
                        onChange={(e) => setPrefDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-teal-500 text-slate-800 font-mono" 
                      />
                    </div>
                    <div className="flex items-end text-[11px] text-slate-400 font-medium leading-relaxed pb-3">
                      Note: We will confirm your chosen scheduling slot during our quick feedback telephone call.
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1.5 font-mono">Description of requirements (Optional)</label>
                    <textarea 
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-teal-500 text-slate-800" 
                      placeholder="e.g. I need an old boiler replaced. It is located in the kitchen cupboards. Interested in Ideal system warranties."
                    ></textarea>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-4"></div>

                {/* Warning note if emergency selected */}
                {urgency === 'emergency' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-800 animate-slide-up">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-bounce" />
                    <div className="text-left text-xs">
                      <strong>Immediate Dispatch Requested:</strong> By choosing emergency, this is treated as a priority pipework burst, leak, or utility breakdown. Local vehicle dispatch takes action immediately. Please keep your telephone active!
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-750 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/10 cursor-pointer flex justify-center items-center gap-2 text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  Confirm Callback Booking Request
                  <Send className="w-4 h-4" />
                </button>

                <div className="flex justify-center items-center gap-2 text-[11px] text-slate-400 font-semibold font-mono mt-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Your contact detail is robustly protected under GDPR privacy rules.
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
