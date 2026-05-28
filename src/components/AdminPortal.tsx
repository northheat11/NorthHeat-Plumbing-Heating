import React, { useState, useEffect } from 'react';
import { 
  Lock, User, ShieldCheck, Mail, Phone, Calendar, ArrowLeft, Save, Sparkles, 
  Trash2, Eye, Check, AlertTriangle, RefreshCw, BarChart2, Plus, Edit3, X, 
  Settings, Globe, Radio, Bell, Users, Laptop, LayoutDashboard
} from 'lucide-react';
import { getWebsiteConfig, saveWebsiteConfig, WebsiteConfig } from '../lib/config';

interface AdminPortalProps {
  onClose: () => void;
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
  status?: 'Pending' | 'Contacted' | 'Dispatched' | 'Completed';
}

export default function AdminPortal({ onClose }: AdminPortalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Tab layout state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'editor' | 'settings'>('dashboard');

  // Leads state
  const [leads, setLeads] = useState<LocalSavedBooking[]>([]);
  const [selectedLead, setSelectedLead] = useState<LocalSavedBooking | null>(null);
  const [editingLead, setEditingLead] = useState<LocalSavedBooking | null>(null);

  // Config editor fields
  const [config, setConfig] = useState<WebsiteConfig>(getWebsiteConfig());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // Custom password change state
  const [customPassword, setCustomPassword] = useState('admin');

  // Load and subscribe to active leads & configs
  useEffect(() => {
    // Check session or local storage for previous admin login State
    const sessionActive = sessionStorage.getItem('northheat_admin_session') === 'true';
    if (sessionActive) {
      setIsLoggedIn(true);
    }

    // Set custom password from local storage if exists
    const storedPass = localStorage.getItem('northheat_admin_pass');
    if (storedPass) {
      setCustomPassword(storedPass);
    }

    loadLeads();

    const handleLeadsUpdate = () => {
      // Reload freshest leads list from local storage
      try {
        const saved = localStorage.getItem('northheat_active_leads');
        if (saved) {
          setLeads(JSON.parse(saved));
        }
      } catch (err) {
        console.warn("Real-time sync loader failed in portal", err);
      }
    };

    window.addEventListener('northheat_leads_updated', handleLeadsUpdate);
    return () => {
      window.removeEventListener('northheat_leads_updated', handleLeadsUpdate);
    };
  }, []);

  const loadLeads = () => {
    try {
      const saved = localStorage.getItem('northheat_active_leads');
      if (saved) {
        setLeads(JSON.parse(saved));
      } else {
        // Hydrate with some interactive default leads for elegant initial demo experience
        const defaultLeads: LocalSavedBooking[] = [
          {
            id: "NH-582103",
            name: "Alexander Mercer",
            phone: "07700 900012",
            email: "alex.mercer@harrogate.com",
            serviceType: "Boiler Installation",
            urgency: "urgent",
            message: "Need a Worcester Bosch combi boiler swap quote. Existing unit is a 12-year-old traditional system.",
            date: "2026-06-02",
            assignedEngineer: "Martin Reynolds (Gas Safe #512781)",
            licenseNumber: "512781",
            techArrivalSlot: "Tomorrow morning 8:30 - 10:30 AM",
            createdOn: "28/05/2026 14:32:10",
            status: "Pending"
          },
          {
            id: "NH-994112",
            name: "Rebecca Sterling",
            phone: "07802 449219",
            email: "rebecca@sterlingsolutions.co.uk",
            serviceType: "Bathroom Fitting",
            urgency: "routine",
            message: "Looking for a full luxury wet room layout survey. Want modular wall claddings and bespoke marble counters.",
            date: "2026-06-05",
            assignedEngineer: "Steve Finch (Senior Plumber)",
            licenseNumber: "N/A",
            techArrivalSlot: "Today afternoon 3:00 - 5:00 PM",
            createdOn: "28/05/2026 09:12:45",
            status: "Contacted"
          },
          {
            id: "NH-110291",
            name: "Marcus Pendelton",
            phone: "07911 300445",
            email: "marcus.p@leeds-apartments.jp",
            serviceType: "Emergency repair",
            urgency: "emergency",
            message: "🚨 WATER PIPE BURST in the second floor bathroom ceiling. Inundating the kitchen below. Isolate and repair immediate.",
            date: "2026-05-28",
            assignedEngineer: "Gary Mitchell (Gas Safe #489110)",
            licenseNumber: "489110",
            techArrivalSlot: "Continuous Live Dispatch: Under 30-45 minutes",
            createdOn: "28/05/2026 19:44:02",
            status: "Dispatched"
          }
        ];
        setLeads(defaultLeads);
        localStorage.setItem('northheat_active_leads', JSON.stringify(defaultLeads));
      }
    } catch (e) {
      console.warn("Storage loader failed", e);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === customPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem('northheat_admin_session', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password. Use admin / ' + customPassword);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('northheat_admin_session');
  };

  const persistLeads = (updatedLeads: LocalSavedBooking[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('northheat_active_leads', JSON.stringify(updatedLeads));
    window.dispatchEvent(new Event('northheat_leads_updated'));
  };

  // Lead status modifier
  const handleUpdateLeadStatus = (id: string, nextStatus: LocalSavedBooking['status']) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: nextStatus } : l);
    persistLeads(updated);
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: nextStatus });
    }
  };

  // Lead deleter
  const handleDeleteLead = (id: string) => {
    if (confirm("Are you sure you want to delete lead " + id + "?")) {
      const updated = leads.filter(l => l.id !== id);
      persistLeads(updated);
      setSelectedLead(null);
    }
  };

  // Manual mock lead creation
  const handleCreateMockLead = () => {
    const mockCategories = ['Boiler Installation', 'Bathroom Fitting', 'Emergency repair', 'General Plumbing'];
    const mockUrgencies = ['routine', 'urgent', 'emergency'];
    const mockNames = ['Diana Prince', 'Bruce Wayne', 'Arthur Dent', 'Fiona Gallagher', 'Winston Churchill'];
    const mockEmails = ['diana@amazon.com', 'bruce@waynecorp.com', 'arthur@hitchhiker.org', 'fiona@gallagher.net', 'winston@parliament.uk'];
    const mockPhones = ['07700 882190', '07890 221199', '07541 909101', '07601 445566', '07111 222333'];
    const mockMessages = [
      'Want annual boiler service and safety checks on Ideal unit.',
      'Toilet bowl is leaking raw water at base seal flange.',
      'Interested in multi-zone central floor manifold designs.',
      'Emergency trace and access repair requested on kitchen lines.'
    ];

    const randomId = 'NH-' + Math.floor(100000 + Math.random() * 900000);
    const newLead: LocalSavedBooking = {
      id: randomId,
      name: mockNames[Math.floor(Math.random() * mockNames.length)],
      phone: mockPhones[Math.floor(Math.random() * mockPhones.length)],
      email: mockEmails[Math.floor(Math.random() * mockEmails.length)],
      serviceType: mockCategories[Math.floor(Math.random() * mockCategories.length)],
      urgency: mockUrgencies[Math.floor(Math.random() * mockUrgencies.length)],
      message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
      date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      assignedEngineer: "Steve Finch (Senior Plumber)",
      licenseNumber: "N/A",
      techArrivalSlot: "Dynamic Assigned Slot",
      createdOn: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      status: "Pending"
    };

    const updated = [newLead, ...leads];
    persistLeads(updated);
  };

  // Website dynamic config saver
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      saveWebsiteConfig(config);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  // Change Admin password helper
  const handleChangePassword = (newPass: string) => {
    if (newPass.trim().length >= 4) {
      setCustomPassword(newPass);
      localStorage.setItem('northheat_admin_pass', newPass);
      alert('Admin login password successfully updated to: ' + newPass);
    } else {
      alert('Password must be at least 4 characters long.');
    }
  };

  // Compile lead breakdown stats count
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => !l.status || l.status === 'Pending').length;
  const dispatchedLeads = leads.filter(l => l.status === 'Dispatched').length;
  const emergencyLeads = leads.filter(l => l.urgency === 'emergency').length;

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex flex-col font-sans transition-all duration-350">
      
      {/* Top Admin Hub Header */}
      <div className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <ShieldCheck className="w-5.5 h-5.5" />
            </span>
            <div className="text-left">
              <h2 className="text-sm font-black tracking-tight text-white font-mono uppercase">northHeat Admin Hub</h2>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Internal Operations Terminal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                className="text-[11px] font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 py-1.5 px-3.5 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
              >
                Log Out Session
              </button>
            )}
            <button 
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-bold text-xs bg-slate-800 hover:bg-slate-700 py-1.5 px-3 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site Home
            </button>
          </div>
        </div>
      </div>

      {!isLoggedIn ? (
        /* SENSATIONAL POLISHED LOGIN VIEW */
        <div className="flex-1 flex items-center justify-center p-4 py-16 bg-radial-gradient">
          <div className="max-w-sm w-full bg-slate-950/80 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-550/10 rounded-full blur-2xl"></div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Administrator Access</h3>
              <p className="text-xs text-slate-400 leading-normal font-medium">
                Please authenticate using your operational credentials to make content or lead updates.
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-950/40 border border-rose-500/30 text-rose-300 p-3.5 rounded-xl text-xs flex gap-2.5 items-start">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Administrative Username</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-teal-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none placeholder-slate-600 font-mono transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Security Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-teal-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none placeholder-slate-600 font-mono transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-teal-600/10 cursor-pointer focus:outline-none flex justify-center items-center gap-1.5 active:scale-98"
              >
                Sign Securely Into Portal
              </button>
            </form>

            <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl space-y-1.5 text-center text-[11px] text-slate-450 font-semibold">
              <span className="text-teal-400 font-bold block uppercase tracking-wide text-[9px] font-mono">DEMO PROTOCOL CREDENTIALS:</span>
              <p className="leading-normal">
                Username: <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">admin</span> <br />
                Password: <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">{customPassword}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* COMPREHENSIVE INTERACTIVE WORKSPACE */
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          
          {/* Admin Sidebar Layout Controller (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 sticky top-24">
            
            {/* Quick Profile Segment */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <User className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono">System Supervisor</h4>
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-teal-400 font-bold bg-teal-400/10 py-0.5 px-2 rounded-full mt-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse" /> Active Session
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Drawer Menu Buttons */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-3 flex flex-col gap-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left font-bold text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'dashboard' 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4.5 h-4.5" /> Dashboard Analytics
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`w-full text-left font-bold text-xs sm:text-sm py-2 px-4 rounded-xl flex justify-between items-center transition-colors cursor-pointer ${
                  activeTab === 'leads' 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bell className="w-4.5 h-4.5" /> Lead Management
                </span>
                <span className="bg-slate-900/60 text-[10px] px-2 py-0.5 rounded font-mono font-bold text-teal-400 border border-slate-800">
                  {leads.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`w-full text-left font-bold text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'editor' 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Globe className="w-4.5 h-4.5" /> Website Content Editor
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left font-bold text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'settings' 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Settings className="w-4.5 h-4.5" /> Credentials & Security
              </button>
            </div>
            
            {/* Quick action buttons */}
            <div className="bg-slate-950 p-4 border border-slate-850 rounded-3xl space-y-2">
              <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 font-mono block">Mock Testing Panel</span>
              <button 
                onClick={handleCreateMockLead}
                className="w-full bg-slate-900 hover:bg-slate-850 text-teal-400 border border-teal-500/20 text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Generate Random Lead
              </button>
              <button 
                onClick={loadLeads}
                className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reload Database
              </button>
            </div>
          </div>

          {/* Admin Main Workplace Tabs (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* DASHBOARD TAB CONTAINER */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Visual Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 rounded-full blur-xl"></div>
                    <span className="block text-[10px] font-bold text-slate-450 uppercase font-mono tracking-wider">Total Leads</span>
                    <strong className="block text-3xl font-extrabold tracking-tight mt-1 text-white">{totalLeads}</strong>
                    <span className="text-[9px] text-teal-400 font-medium block mt-1 font-mono">100% active logbooks</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl"></div>
                    <span className="block text-[10px] font-bold text-slate-450 uppercase font-mono tracking-wider">Pending Action</span>
                    <strong className="block text-3xl font-extrabold tracking-tight mt-1 text-amber-400">{pendingLeads}</strong>
                    <span className="text-[9px] text-slate-400 font-medium block mt-1 font-mono">Needs callback review</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl"></div>
                    <span className="block text-[10px] font-bold text-slate-450 uppercase font-mono tracking-wider">Dispatched Vans</span>
                    <strong className="block text-3xl font-extrabold tracking-tight mt-1 text-emerald-450">{dispatchedLeads}</strong>
                    <span className="text-[9px] text-emerald-400 font-medium block mt-1 font-mono">Active Yorkshire units</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl"></div>
                    <span className="block text-[10px] font-bold text-slate-450 uppercase font-mono tracking-wider">Severe Emergencies</span>
                    <strong className="block text-3xl font-extrabold tracking-tight mt-1 text-rose-400">{emergencyLeads}</strong>
                    <span className="text-[9px] text-rose-300 font-medium block mt-1 font-mono">Priority pipeline bursts</span>
                  </div>
                </div>

                {/* Main Visual breakdown box */}
                <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-teal-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Intake Statistics Overview</h3>
                      <p className="text-xs text-slate-400 font-semibold leading-normal">
                        Categorized pipeline breakdown of customer service bookings generated across Greater Leeds.
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-teal-400 flex items-center justify-center shrink-0">
                      <BarChart2 className="w-5.5 h-5.5" />
                    </span>
                  </div>

                  {leads.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No tickets located. Generate sample mock leads to examine visual graph diagnostics.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Simple, completely styled, custom pure-HTML/React visual bars (independent of Recharts dependencies to prevent dynamic crash risk) */}
                      {[
                        { label: 'Boiler Installations & Heating', count: leads.filter(l => l.serviceType?.toLowerCase().includes('boiler') || l.serviceType?.toLowerCase().includes('heat')).length, color: 'bg-teal-500' },
                        { label: 'Bathroom Fitting & Wet Rooms', count: leads.filter(l => l.serviceType?.toLowerCase().includes('bathroom') || l.serviceType?.toLowerCase().includes('fitting')).length, color: 'bg-indigo-500' },
                        { label: 'Emergency Repairs & Bursts', count: leads.filter(l => l.serviceType?.toLowerCase().includes('emergency') || l.serviceType?.toLowerCase().includes('leak')).length, color: 'bg-rose-500' },
                        { label: 'General Household Plumbing', count: leads.filter(l => l.serviceType?.toLowerCase().includes('plumb') || (!l.serviceType)).length, color: 'bg-amber-500' }
                      ].map((bar, idx) => {
                        const pct = totalLeads > 0 ? (bar.count / totalLeads) * 100 : 0;
                        return (
                          <div key={idx} className="space-y-1.5 text-xs">
                            <div className="flex justify-between text-slate-300 font-semibold">
                              <span>{bar.label}</span>
                              <span className="font-mono text-white">{bar.count} jobs ({Math.round(pct)}%)</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800">
                              <div 
                                className={`${bar.color} h-full transition-all duration-1000 ease-out`}
                                style={{ width: `${Math.max(pct, 2)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Recent submissions ticker table */}
                <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold font-display uppercase tracking-wider text-slate-300">Live Intake Feed</h3>
                    <button onClick={() => setActiveTab('leads')} className="text-xs text-teal-400 hover:underline font-bold">
                      View All Tickets
                    </button>
                  </div>

                  <div className="divide-y divide-slate-850 overflow-hidden rounded-2xl border border-slate-850">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="p-4 bg-slate-950 hover:bg-slate-900 transition-colors flex justify-between items-center text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-teal-400">{lead.id}</span>
                            <span className="text-white font-bold">{lead.name}</span>
                            <span className="text-[9px] font-mono bg-slate-800 text-slate-400 px-1 py-0.5 rounded uppercase">{lead.urgency}</span>
                          </div>
                          <span className="block text-slate-400">{lead.serviceType} &bull; <span className="font-mono text-[10px]">{lead.createdOn}</span></span>
                        </div>
                        <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase border ${
                          lead.status === 'Dispatched' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30' :
                          lead.status === 'Contacted' ? 'bg-indigo-950/40 text-indigo-400 border-indigo-900/30' :
                          lead.status === 'Completed' ? 'text-slate-400 border-slate-800' :
                          'bg-amber-950/40 text-amber-400 border-amber-900/30 animate-pulse'
                        }`}>
                          {lead.status || 'Pending'}
                        </span>
                      </div>
                    ))}
                    {leads.length === 0 && (
                      <div className="py-8 text-center text-slate-500 text-xs">
                        No active dispatch tickets. Use the contact forms to add submissions.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LEADS LIST MANAGER TAB */}
            {activeTab === 'leads' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left side: Ticket catalog (6 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-slate-950 border border-slate-850 rounded-3xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase font-extrabold text-slate-400 font-mono">Job Ticket Manager</span>
                      <span className="bg-slate-900 text-teal-400 border border-slate-800 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                        {leads.length} leads
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                      {leads.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => { setSelectedLead(l); setEditingLead(null); }}
                          className={`p-3 rounded-2xl border transition-all text-xs cursor-pointer text-left relative group ${
                            selectedLead?.id === l.id 
                              ? 'bg-teal-950/30 border-teal-500/50' 
                              : 'bg-slate-900/60 border-slate-850 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-teal-400">{l.id}</span>
                            <span className="text-[10px] uppercase font-mono text-slate-500">{l.createdOn.split(' ')[0]}</span>
                          </div>
                          <span className="block font-bold text-white mt-1 max-w-[150px] truncate">{l.name}</span>
                          <span className="block text-slate-400 text-[11px] mt-0.5 truncate">{l.serviceType}</span>
                          
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-850">
                            <span className={`text-[9px] font-mono font-bold uppercase transition-colors px-1.5 py-0.5 rounded ${
                              l.urgency === 'emergency' ? 'bg-rose-950/60 text-rose-400' : 'bg-slate-850 text-slate-400'
                            }`}>
                              {l.urgency}
                            </span>
                            <span className={`text-[10px] font-mono font-semibold ${
                              l.status === 'Completed' ? 'text-slate-450' : l.status === 'Dispatched' ? 'text-emerald-400' : 'text-amber-400'
                            }`}>
                              ● {l.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                      {leads.length === 0 && (
                        <div className="py-12 text-center text-slate-500 text-xs">
                          Your queue has fully cleared. Submissions appear in real-time.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Detailed ticket viewer/editor (7 cols) */}
                <div className="md:col-span-7">
                  {selectedLead ? (
                    <div className="bg-slate-950 border border-slate-850 rounded-3xl overflow-hidden shadow-xl text-left">
                      
                      {/* Ticket header strip */}
                      <div className="bg-slate-900 p-4 border-b border-slate-850 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-mono text-teal-400 font-bold">TICKET DETAILS RECORD</span>
                          <h4 className="text-base font-black text-white">{selectedLead.id}</h4>
                        </div>
                        <button 
                          onClick={() => handleDeleteLead(selectedLead.id)}
                          className="p-2 bg-rose-950/20 hover:bg-rose-950 text-rose-400 hover:text-white border border-rose-900/40 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-5 sm:p-6 space-y-6">
                        
                        {/* Status workflow toggles */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">Modify Workflow Status</span>
                          <div className="grid grid-cols-4 gap-2">
                            {['Pending', 'Contacted', 'Dispatched', 'Completed'].map((st) => (
                              <button
                                key={st}
                                onClick={() => handleUpdateLeadStatus(selectedLead.id, st as any)}
                                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold font-mono transition-all text-center cursor-pointer border ${
                                  selectedLead.status === st || (!selectedLead.status && st === 'Pending')
                                    ? 'bg-teal-600 border-teal-500 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-450 hover:bg-slate-850 hover:text-white'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Customer Info list */}
                        <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-3.5 text-xs">
                          <div className="flex justify-between items-center py-1 border-b border-slate-850">
                            <span className="text-slate-450">Contact Name:</span>
                            <span className="text-white font-bold">{selectedLead.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-850">
                            <span className="text-slate-450">Mobile/Phone:</span>
                            <a href={`tel:${selectedLead.phone}`} className="text-teal-400 font-mono font-bold hover:underline">{selectedLead.phone}</a>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-850">
                            <span className="text-slate-450">Support Email:</span>
                            <a href={`mailto:${selectedLead.email}`} className="text-slate-300 font-medium hover:underline">{selectedLead.email}</a>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-850">
                            <span className="text-slate-450">Category Type:</span>
                            <span className="text-white font-bold">{selectedLead.serviceType}</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-850">
                            <span className="text-slate-450">Urgency Level:</span>
                            <span className="text-amber-400 uppercase font-mono font-bold text-[10px]">{selectedLead.urgency}</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-850">
                            <span className="text-slate-450">Target Date:</span>
                            <span className="text-white font-mono">{selectedLead.date}</span>
                          </div>
                        </div>

                        {/* Customer system message */}
                        <div className="space-y-1.5 text-xs text-left">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">User Inquiry Detail</span>
                          <div className="p-4 bg-slate-900 text-slate-300 border border-slate-850 rounded-2xl leading-relaxed whitespace-pre-line font-medium">
                            {selectedLead.message}
                          </div>
                        </div>

                        {/* Engineer and Dispatch routing details */}
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-850 text-xs flex gap-3 text-slate-300">
                          <Laptop className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                          <div className="space-y-1 text-left">
                            <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono">Telemetry Routing Info</span>
                            <p className="leading-normal font-medium">
                              Lead created on <strong className="text-white">{selectedLead.createdOn}</strong>. Auto-assigned to <span className="text-teal-400 font-bold">{selectedLead.assignedEngineer}</span>. Tracking Slot target: <span className="text-white font-semibold">{selectedLead.techArrivalSlot}</span>.
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950 border border-slate-850 rounded-3xl p-12 text-center text-xs text-slate-500 space-y-2">
                      <LayoutDashboard className="w-8 h-8 text-slate-700 mx-auto" />
                      <span className="block font-bold">No Lead Selected</span>
                      <p className="max-w-xs mx-auto">Click on any customer ticket in the task management sidebar to view details, call numbers, update scheduling or delete dockets.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* WEBSITE CONTENT EDITOR TAB */}
            {activeTab === 'editor' && (
              <form onSubmit={handleSaveConfig} className="space-y-6">
                <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl"></div>
                  
                  <div className="flex gap-3.5 items-center pb-4 border-b border-slate-850 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                      <Globe className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Live Website Content Editor</h3>
                      <p className="text-xs text-slate-400 font-semibold leading-normal">
                        Submit immediate site-wide modifications. Your updates propagate instantly to the homepage and service descriptions.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-left">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Call Center Phone (Display)</label>
                      <input 
                        type="text"
                        value={config.phone}
                        onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Raw Phone (Dial Protocol)</label>
                      <input 
                        type="text"
                        value={config.phoneRaw}
                        onChange={(e) => setConfig({ ...config, phoneRaw: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Inquiry Email Target</label>
                      <input 
                        type="email"
                        value={config.email}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Lowest Boiler Quote Price Point</label>
                      <input 
                        type="text"
                        value={config.boilerPrice}
                        onChange={(e) => setConfig({ ...config, boilerPrice: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Primary Hero Main Title Heading</label>
                      <input 
                        type="text"
                        value={config.heroTitle}
                        onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-white focus:outline-none font-semibold text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Hero Subtitle Paragraph Description</label>
                      <textarea 
                        rows={3}
                        value={config.heroSubtitle}
                        onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-4 text-white focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <div className="h-px bg-slate-800 md:col-span-2 my-2"></div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-[11px] font-bold text-white block uppercase font-mono tracking-wider">Top Promotional Alert Bar</label>
                          <span className="text-[10px] text-slate-450 font-medium font-sans">Toggle warning banner displayed on top of the browser index.</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={config.showPromoBanner}
                          onChange={(e) => setConfig({ ...config, showPromoBanner: e.target.checked })}
                          className="w-9 h-5 bg-slate-800 rounded-full cursor-pointer focus:outline-none accent-teal-500"
                        />
                      </div>
                      
                      {config.showPromoBanner && (
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Alert Banner Slogan</label>
                          <input 
                            type="text"
                            value={config.promoBannerText}
                            onChange={(e) => setConfig({ ...config, promoBannerText: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-3 text-white focus:outline-none text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Any changes affect local browser rendering immediately on save.</span>
                    <button
                      type="submit"
                      disabled={saveStatus === 'saving'}
                      className="bg-teal-650 hover:bg-teal-700 disabled:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-lg flex items-center gap-2"
                    >
                      {saveStatus === 'saving' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" /> Saving Updates...
                        </>
                      ) : saveStatus === 'success' ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" /> Saved Successfully!
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save Content Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* SECURITY/SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl"></div>

                <div className="flex gap-3.5 items-center pb-4 border-b border-slate-850 mb-6 font-display">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Settings className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">System Security Settings</h3>
                    <p className="text-xs text-slate-400 font-semibold leading-normal">
                      Update operational access keywords to lock the administrative portal from third-party entry.
                    </p>
                  </div>
                </div>

                <div className="max-w-md space-y-6 text-xs font-semibold">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Current Active Security Pass</label>
                    <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-xl font-mono text-white flex justify-between items-center">
                      <span>{customPassword}</span>
                      <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Active</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Assign New Security Password *</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        id="new-admin-pass-inp"
                        placeholder="e.g. yorkshirePlumb1!"
                        className="flex-1 bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl px-4 py-2.5 text-white focus:outline-none text-xs font-mono"
                      />
                      <button
                        onClick={() => {
                          const val = (document.getElementById('new-admin-pass-inp') as HTMLInputElement)?.value;
                          if (val) {
                            handleChangePassword(val);
                            (document.getElementById('new-admin-pass-inp') as HTMLInputElement).value = '';
                          } else {
                            alert("Please enter a valid password value.");
                          }
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-5 rounded-xl transition-all cursor-pointer text-xs"
                      >
                        Change Password
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 font-sans block leading-normal">
                      Note: Minimally 4 letters/digits required. Write this down! Leaving this tab will require utilizing this new passcode on future login prompts.
                    </span>
                  </div>

                  <div className="h-px bg-slate-850 my-6"></div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Backup Restore Operations</span>
                    <button
                      onClick={() => {
                        if (confirm("Resetting will wipe all customized text configs and tickets database and return to defaults. Proceed?")) {
                          localStorage.removeItem('northheat_active_leads');
                          localStorage.removeItem('northheat_website_config');
                          localStorage.removeItem('northheat_admin_pass');
                          setCustomPassword('admin');
                          setConfig(getWebsiteConfig());
                          loadLeads();
                          alert("All database tables successfully formatted to defaults!");
                        }
                      }}
                      className="py-2.5 px-4 bg-rose-950/20 hover:bg-rose-950 hover:text-white border border-rose-900/30 text-rose-400 rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      Format All Database Tables & Logs
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getCategoryLabel(group: string) {
  if (group === 'residential' || group === 'res') return 'Residential';
  if (group === 'commercial' || group === 'com') return 'Commercial';
  return 'About';
}
