import React from 'react';
import { 
  X, Flame, Wrench, Bath, Snowflake, CheckCircle, FileText, 
  HelpCircle, Star, ShieldCheck, MapPin, Users, HeartHandshake, Clock 
} from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  onBookNow: (serviceName: string) => void;
}

interface ServiceDetail {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: any;
  duration: string;
  priceEstimate: string;
  keyPoints: string[];
  tipsForHomeowner: string;
}

export default function ServiceModal({ isOpen, onClose, serviceId, onBookNow }: ServiceModalProps) {
  if (!isOpen) return null;

  // Fully compiled mapping for all 27 user-specified pathways
  const detailsDatabase: Record<string, ServiceDetail> = {
    // RESIDENTIAL PLUMBING
    'res-boiler-installations': {
      title: 'Boiler Installations',
      category: 'Residential Plumbing & Heating',
      description: 'Premium A-rated boiler upgrades from Worcester Bosch, Ideal, and Baxi with up to 12 years of warranty.',
      longDescription: 'Upgrade your home with a state-of-the-art condensing gas or combi boiler. Our Gas Safe certified engineers design the full plumbing layout, balance correct heat outputs based on your floor size, and perform a complimentary chemical power flush of your existing pipework to double its lifespan and optimize your monthly fuel savings by up to 35%.',
      icon: Flame,
      duration: '1 - 2 Days',
      priceEstimate: 'From £1,650 (Fully Fitted & Flush included)',
      keyPoints: [
        'Gas Safe Registered boiler professionals with over 10 years experience',
        'Extended manufacturer-backed warranties of up to 12 years',
        'Complimentary smart programmer installation (Nest or Hive integration)',
        'Magnetic filter integration to prevent calcium and sludge buildup'
      ],
      tipsForHomeowner: 'Consider our interest-free payment options or finance from £17.50 per month to enjoy lower energy charges right away.'
    },
    'res-boiler-repairs': {
      title: 'Boiler Repairs',
      category: 'Residential Plumbing & Heating',
      description: 'Immediate diagnostic check and same-day repair for leaking, noisy, or non-igniting boilers.',
      longDescription: 'When your boiler is showing fault codes, dripping water, or producing loud banging noises, select our guaranteed diagnostic pathway. Our certified local response team is equipped with pressure tools, gaskets, and key boiler components to address most common brand errors (Worcester, Ideal, Vaillant, Baxi) on our first visit.',
      icon: Wrench,
      duration: '1 - 3 Hours',
      priceEstimate: '£79 (Fixed Diagnostic Fee + Parts if required)',
      keyPoints: [
        'Rapid troubleshooting with direct fault code digital scanners',
        'No replacement pressure valves or burners fitted without verbal quote',
        'Gas Safety pressure and flame safety check included in final review',
        'Genuine, manufacturer-approved replacement parts sourced locally'
      ],
      tipsForHomeowner: 'Keep note of any error codes displayed on your digital screen so our technicians can pre-load exact spares.'
    },
    'res-boiler-servicing': {
      title: 'Boiler Servicing',
      category: 'Residential Plumbing & Heating',
      description: 'Annual safety check, certified emissions examination, and overall pressure optimization.',
      longDescription: 'Annual boiler servicing is mandatory to keep your manufacturer warranty active. Our certified checklist measures flue gas emissions with digital flue-gas analyzers, checks the burner seals, cleans critical filters, refutes safety locks, and tests water circulation pressure to keep your unit operating efficiently throughout cold winters.',
      icon: ShieldCheck,
      duration: '45 - 60 Minutes',
      priceEstimate: '£85 (Full Safety Certification & Logbook signed)',
      keyPoints: [
        'Gas Safe compliance record updated and signed on-site',
        'Verification of seals, flue ventilation safety, and carbon monoxide alerts',
        'Cleaning of central copper heating magnetic filters',
        'Optimizing system water flow rate and digital pump settings'
      ],
      tipsForHomeowner: 'Book your annual heating check-up during summer or early autumn to guarantee flexible appointment slots.'
    },
    'res-central-heating': {
      title: 'Central Heating Systems',
      category: 'Residential Plumbing & Heating',
      description: 'Bespoke piping designs, smart zone manifolds, and high-efficiency circulation pumps.',
      longDescription: 'Enjoy balanced, comfortable warmth across every floor. We install premium multi-zone manifolds, robust and oxygen-impermeable plastic or copper distribution pipes, and upgrade under-powered circulation pumps. Perfect for complete home renovations or resolving cold patches in far-away rooms.',
      icon: Flame,
      duration: '2 - 4 Days',
      priceEstimate: 'Custom design quote (Bespoke layouts from £2,800)',
      keyPoints: [
        'System balance to align heat demands for multiple radiators',
        'Installation of modern smart zone valves for individual floor controls',
        'Complete system water expansion tank sizing checks',
        'Tidy, sub-floor pipework routing protecting existing floor structures'
      ],
      tipsForHomeowner: 'Integrating smart thermostats like Nest can split your floor heating zones, lowering thermal loads by 20%.'
    },
    'res-[radiators]': {
      title: 'Radiators & Modern Columns',
      category: 'Residential Plumbing & Heating',
      description: 'Designer columns, high-output convection panels, and elegant bathroom towel rails.',
      longDescription: 'Replace rusted, inefficient radiators with highly optimized vertical column features or double-panel compact convection systems. We recalculate BTU heating load demands per room, route professional chrome pipework connections, and fit thermostatic radiator valves (TRVs) to put total control in your hands.',
      icon: ShieldCheck,
      duration: '3 - 8 Hours',
      priceEstimate: 'Taps and units fitted from £120 per radiator',
      keyPoints: [
        'Calculated BTU sizing prevents oversized utility layouts',
        'Wide range of vertical, designer anthracite, and minimalist finishes',
        'Installation of smart TRVs for individual room climate tracking',
        'Removal and responsible recycling of redundant steel panels'
      ],
      tipsForHomeowner: 'Bleeding radiators annually solves initial cold tops, but lukewarm bottoms indicate heavy sludge requiring flushing.'
    },
    'res-power-flushing': {
      title: 'Power Flushing',
      category: 'Residential Plumbing & Heating',
      description: 'Deep high-velocity sludge removal to clear cold radiator zones and boost overall output.',
      longDescription: 'Over time, steel radiators corrode, releasing black iron oxide slurry (magnetite slurry) which blocks boiler heat exchangers and valves. Our specialized magnetic power-flushing pump forces certified corrosion-inhibiting chemicals through each loop at high pressure, restoring thermal conductivity, quietness, and lowering fuel wastage.',
      icon: Wrench,
      duration: '4 - 7 Hours',
      priceEstimate: '£395 (Up to 8 radiators. Sub-chemicals included)',
      keyPoints: [
        'Restores circulation to cold radiators instantly',
        'Reduces erratic boiler combustion noise (kettling)',
        'Extends heat exchanger and water circulation pump life',
        'Includes double dose high-strength Sentinel scale protection formulas'
      ],
      tipsForHomeowner: 'A power flush is highly recommended before setting up a new central boiler to maintain warranty protection.'
    },
    'res-plumbing': {
      title: 'Plumbing Repairs',
      category: 'Residential Plumbing & Heating',
      description: 'Standard domestic copper/leak repairs, valve replacements, and professional waste connections.',
      longDescription: 'We deploy professional solutions for all household plumbing requirements. From fixing slow-draining wash basins and noisy water hammer issues to installing flexible wash distribution pipes, modern isolation valves, and replacing cracked toilet syphons, we guarantee a leak-free home.',
      icon: Wrench,
      duration: '1 - 3 Hours',
      priceEstimate: 'From £65 per hour',
      keyPoints: [
        'Replacing traditional plastic connections with premium durable brassware',
        'Quick installation of leak-free compression couplers',
        'Updating kitchen counter appliance lines and waste traps',
        'Testing water mains incoming bars to protect boilers'
      ],
      tipsForHomeowner: 'Know where your main stopcock is located so you can isolate household feeds prior to an engineer arriving.'
    },
    'res-emergency-plumbing': {
      title: 'Emergency Plumbing (24/7)',
      category: 'Residential Plumbing & Heating',
      description: 'Rapid 1-hour local deployment for severe bursts, ceiling leaks, and localized flooding.',
      longDescription: 'In a plumbing crisis, delays mean costly masonry damage. Our dedicated emergency response team is operating 24 hours a day with emergency vans fully stocked with pipes, brass fittings, freeze-kits, and wet vacs. We bypass standard queues to fix critical water escapes immediately.',
      icon: Clock,
      duration: '1 - 2 Hours',
      priceEstimate: '£79 Flat diagnostic and immediate isolation check fee',
      keyPoints: [
        'Guaranteed maximum 1-hour dispatch time anywhere in Leeds/West Yorkshire',
        'Emergency trace-and-repair of hidden bursts behind plaster and timber',
        'Water drainage, extraction, and pipe replacement in single visit',
        'Direct structural integrity checks post-repair to prevent rot'
      ],
      tipsForHomeowner: 'Isolate electricity panels if water is dripping through sockets or down plaster walls.'
    },
    'res-general-plumbing': {
      title: 'General Plumbing Maintenance',
      category: 'Residential Plumbing & Heating',
      description: 'Certified upkeep for household kitchen fittings, stopcocks, outside taps, and domestic systems.',
      longDescription: 'Regular maintenance is key to preventing plumbing failures. We install modern outside garden taps with built-in non-return valves, replace dripping hot/cold kitchen sink mixers, update squealing tank fill-valves, and service stubborn waste shredders (macerators).',
      icon: Bath,
      duration: '1 - 2 Hours',
      priceEstimate: 'Flat rates from £75 per appointment',
      keyPoints: [
        'Replacement of worn washers, ceramic cartridges, and rubber seals',
        'Fitting high-flow copper pipe routes to garden and exterior bibs',
        'Clog removal on interior drain pathways using safe mechanical machinery',
        'We leave all work areas spotless and fully pressure-tested'
      ],
      tipsForHomeowner: 'Replace standard chrome mixer cartridges when you notice a steady dripping frequency to protect tiles.'
    },
    'res-leak-detection': {
      title: 'Leak Detection',
      category: 'Residential Plumbing & Heating',
      description: 'Non-invasive thermal, acoustic, and pressure trace detection to find hidden water escapes.',
      longDescription: 'If your central heating pressure drops constantly or damp patches appear on walls without a clear source, do not tear down plasterboards. We deploy advanced thermal scanning cameras, moisture tracking grids, and digital electronic acoustics to locate the exact source of sub-surface escapes with millimeter precision.',
      icon: MapPin,
      duration: '2 - 4 Hours',
      priceEstimate: 'From £180 (Full structural scanning & report)',
      keyPoints: [
        'Thermal infrared heat map imaging highlights sub-floor water lines',
        'Acoustic microphone arrays track underground pipe leakage vibrations',
        'Pressure drops analyzed across individual heating and plumbing sections',
        'Comprehensive digital reporting ready for home insurance claims'
      ],
      tipsForHomeowner: 'Take direct photos of damp patches or pressure drops to show our scanning team prior to testing.'
    },

    // COMMERCIAL HEATING & WASHROOMS
    'com-heating-boiler-installations': {
      title: 'Commercial Boiler Installations',
      category: 'Commercial Services',
      description: 'Heavy-duty plant room heat design and high-volume commercial system setup.',
      longDescription: 'Specialized design, mounting, and commissioning of commercial-grade heating solutions up to 150kW+. Perfect for schools, offices, multi-tenant blocks, and factories. We integrate cascade boiler setups, heavy-duty gas lines, high-output heat exchangers, and premium flue arrays matching British Building Codes.',
      icon: Flame,
      duration: '3 - 7 Days',
      priceEstimate: 'Bespoke design from £5,500 (Comprehensive plant estimates)',
      keyPoints: [
        'Commercial Gas Safe registered engineers with legal plant certification',
        'Advanced redundant cascade setups prevent full site heating failure',
        'Heavy-duty plate heat exchanger integrations prevent main loop scaling',
        'Integrated commercial Building Management System (BMS) controls'
      ],
      tipsForHomeowner: 'Ensure your site has updated floor and system schemas available so we can design maximum thermal efficiency.'
    },
    'com-heating-central-heating': {
      title: 'Commercial Heating Systems',
      category: 'Commercial Services',
      description: 'Large-scale commercial pipe networks, commercial radiators, and automated zone controls.',
      longDescription: 'Distribute heat efficiently across thousands of square meters. We map flow rates, install high-diameter commercial system copper, and configure automatic motorized balancing valves. Perfect for maintaining steady temperatures in warehouses, commercial offices, and community spaces.',
      icon: Wrench,
      duration: '4 - 10 Days',
      priceEstimate: 'Bespoke quote following free commercial site survey',
      keyPoints: [
        'Automated pressure balancing to optimize distant radiator loops',
        'Large-bore pipe welding, copper press-fit, and heavy brackets',
        'Zoned timing layouts matching localized staff shift hours',
        'Hydraulic separators fitted to stabilize continuous water volume'
      ],
      tipsForHomeowner: 'Modern pressure management on large heating structures can lower commercial fuel overheads by up to 28%.'
    },
    'com-heating-air-conditioning': {
      title: 'Commercial Air Conditioning',
      category: 'Commercial Services',
      description: 'Premium VRF, multi-split cooling, ceiling cassettes, and mechanical air filters.',
      longDescription: 'Maintain structural ventilation and comfort all year round. We install silent, highly efficient ceiling cassette systems, ducted air supply units, and multi-split localized units. Fully rated for low power draws under summer temperature spikes.',
      icon: Snowflake,
      duration: '2 - 5 Days',
      priceEstimate: 'Custom design quote (Split units from £1,450 fitted)',
      keyPoints: [
        'Certified handling matching UK F-Gas environmental regulations',
        'Intelligent inverter compressors dynamically scale down operational power',
        'Wall, ceiling-cassette, and ducted visual architectural options',
        'Comprehensive clean condensation drainage networks built-in'
      ],
      tipsForHomeowner: 'Schedule filtration audits every 6 months to ensure hygienic airflow and prevent static pump loads.'
    },
    'com-washrooms': {
      title: 'Commercial Washroom Installations',
      category: 'Commercial Services',
      description: 'Turnkey high-traffic washroom fitted solutions, cubicles, auto-flush systems, and touchless designs.',
      longDescription: 'Complete demolition, hygienic lining, plumbing, and visual fitting of heavy-use commercial restrooms. We implement easy-clean composite wall paneling, durable solid grade laminate cubicles, motion-sensor commercial flush units, and water-conserving basin systems.',
      icon: Bath,
      duration: '5 - 12 Days',
      priceEstimate: 'Bespoke layout following free conceptual design',
      keyPoints: [
        'Compliance with all local Building Regulations (Disabled Doc M packs)',
        'Vandal-resistant hidden pipework galleries and integrated flushing cisterns',
        'Automatic optical sensors for taps, urinals, and soap dispensers',
        'Non-slip heavy quartz safety flooring containing water runoff channels'
      ],
      tipsForHomeowner: 'Hygienic touchless washrooms dramatically decrease general workspace cleaning costs and viral spread.'
    },
    'com-maint-boiler-servicing': {
      title: 'Commercial Boiler Servicing',
      category: 'Commercial Services',
      description: 'Preventative structural maintenance, safety compliance logs, a gas safety audits (CP15).',
      longDescription: 'Ensure legal workspace safety compliance. Our commercial boiler servicing inspects gaskets, tests gas supply safety interlocks, records exact oxygen/carbon dioxide values, reviews pressure vessels, and provides full signed CP15 commercial gas safety certifications required for business insurance.',
      icon: ShieldCheck,
      duration: '2 - 4 Hours',
      priceEstimate: 'From £180 (Includes CP15 Gas Safety Compliance log)',
      keyPoints: [
        'Gas Safe compliance record registered with building facilities team',
        'Combustion chamber descaling and primary gas manifold safety testing',
        'Interlock check to verify air ventilation extraction works simultaneously',
        'Flexible scheduling to completely prevent active business disruption'
      ],
      tipsForHomeowner: 'Sign up for our commercial heating cover agreements to lock in annual compliance checks at discounted pricing.'
    },
    'com-maint-power-flushing': {
      title: 'Commercial Power Flushing',
      category: 'Commercial Services',
      description: 'High-volume commercial boiler power flush to clear plant-room sludge and restore output.',
      longDescription: 'Remove iron oxide residues from major heating loops. We deploy heavy-duty commercial scale pumping rigs, safe industrial-strength chemicals, and strong filtration magnets to restore circulation in massive manufacturing spaces, office loops, and educational facilities.',
      icon: Wrench,
      duration: '1 - 2 Days',
      priceEstimate: 'Bespoke corporate estimates from £1,100',
      keyPoints: [
        'Handles system volume over 1,500 liters cleanly',
        'Cleanses commercial plate heat exchangers and boiler main sections',
        'Drastically reduces operational load demand on commercial circulation pumps',
        'Restores maximum temperature output to staff workstations'
      ],
      tipsForHomeowner: 'A commercial flush is highly recommended before installing a primary condensing boiler on an aged loop.'
    },
    'com-maint-leak-detection': {
      title: 'Commercial Leak Detection',
      category: 'Commercial Services',
      description: 'Acoustic sensing and tracer gas detection for hidden commercial properties pipe lines.',
      longDescription: 'Locate pressure failures on vast campus water lines, sub-floor heating mains, or sprinkler circuits. We isolate zones, inject safe tracer gas mixtures (nitrogen/hydrogen), and scan surface lines with sniffers or micro-acoustic arrays to detect exact subterranean escapes without digging up runways.',
      icon: MapPin,
      duration: '4 - 12 Hours',
      priceEstimate: 'Commercial trace rates from £350',
      keyPoints: [
        'Safe, non-toxic tracer gas traces pinpoint concrete floor failures',
        'Ground acoustic arrays map underground circulation paths',
        'Isolates pipeline loops to verify localized pressure retainment',
        'Complete engineering survey report including imagery and repair quotes'
      ],
      tipsForHomeowner: 'Early acoustic investigation prevents significant concrete slab rot and building foundational sinking.'
    },
    'com-maint-bathroom-installations': {
      title: 'Commercial Bathroom Installations',
      category: 'Commercial Services',
      description: 'Bespoke multi-compartment layouts, modern corporate client washrooms, and vanity frames.',
      longDescription: 'Elevate custom staff or executive restrooms. We fit premium floating designer vanity countertops, custom led mirrors, designer ceramic washbowls, and concealed wall frame toilet elements that mirror five-star hotel comfort and modern design aesthetics.',
      icon: Bath,
      duration: '5 - 10 Days',
      priceEstimate: 'Bespoke customized layouts (Request our catalog)',
      keyPoints: [
        'Seamless integration with luxury designer brassware and custom cladding',
        'Sturdy steel in-wall frames comfortably support floating WC units',
        'Intelligent dual flush mechanisms minimize corporate water consumption',
        'Slick, robust timber and solid granite custom construction'
      ],
      tipsForHomeowner: 'High-end guest washrooms leave a lasting positive impression for visiting clients and stakeholders.'
    },
    'com-maint-wet-rooms': {
      title: 'Commercial Wet Rooms',
      category: 'Commercial Services',
      description: 'Hygienic multi-shower wetrooms, slip-resistant floors, and direct rapid-drain lines.',
      longDescription: 'Perfect for local gyms, leisure complexes, healthcare settings, and factories. We apply certified heavy-duty fiberglass tanking systems to complete walls, construct precise floor run-off gradients, lay antibacterial safety vinyl, and install robust high-output multi-shower networks.',
      icon: ShieldCheck,
      duration: '6 - 12 Days',
      priceEstimate: 'Project estimates based on total area dimensions',
      keyPoints: [
        '100% waterproof guarantee back by a 10-year structural seal guarantee',
        'Altro safety flooring prevents slip injuries in continuous wet zones',
        'High-flow grid drains capture over 50 liters/min without pooling',
        'Commercial anti-limescale thermostatic mixing showers prevent scalding'
      ],
      tipsForHomeowner: 'Clean wetroom drain catch filters once a week to protect the multi-shower flow rating.'
    },

    // ABOUT SECTIONS
    'about-northheat': {
      title: 'About northHeat',
      category: 'Company Profile',
      description: 'Premium local heating legends of West Yorkshire. Fully certified Gas Safe specialists built on real Trust.',
      longDescription: 'At northHeat, we have established a solid reputation as West Yorkshire’s premium independently operated plumbing, boiler, and luxury bathroom specialists. We reject sub-standard, generic builder shortcuts. Every system layout, pipe copper bend, and wall tile placement is executed with obsessive craftsmanship. We are Gas Safe registered (#582910) and fully insured to support your home with absolute confidence.',
      icon: HeartHandshake,
      duration: 'Established 2015',
      priceEstimate: 'Obsessive Craftsmanship | No shortcuts, ever.',
      keyPoints: [
        'Registered Gas Safe Engineers (#582910) with verified credentials',
        '£5M comprehensive Public Liability & professional hazard protection',
        'Accredited Installers for Worcester Bosch, Ideal, and Baxi systems',
        'Local office in West Yorkshire - familiar with municipal water issues'
      ],
      tipsForHomeowner: 'Our master plumbers live and breathe heating solutions. Read our customer reviews to see why we are local favorites.'
    },
    'about-reviews': {
      title: 'Customer Reviews',
      category: 'Client Testimonials',
      description: 'Why homeowners across Leeds and Harrogate rate us 5.0 out of 5.0 stars with over 1,240+ jobs.',
      longDescription: 'Customer feedback is the core driver of our business. We hold an active five-star rating across Leeds, Horsforth, Roundhay, and Harrogate. From immediate emergency leak resolutions to massive master bathroom overhauls, we tidy up after ourselves, explain technical diagnostics plain-English, and charge exactly what we quoted in advance. Scroll down to browse real testimonials from verified local homeowners.',
      icon: Star,
      duration: 'Verified 5.0 Star Status',
      priceEstimate: 'Over 1,200+ Satisfied Yorkshire Homes',
      keyPoints: [
        'Consistent 5.0 star average rating on major platforms',
        'Friendly, professional, and tidy engineers who respect your carpets',
        'Written guarantee on all structural tiling and copper joints',
        'Never any unexpected up-charges or hidden administration fees'
      ],
      tipsForHomeowner: 'We always send a detailed SMS notification with our plumber\'s photo and real-time GPS tracking link as they head your way.'
    },
    'about-case-studies': {
      title: 'Case Studies',
      category: 'Visual Demonstrations',
      description: 'Recent project walkthroughs of our boiler replacements and high-end bathroom overhauls.',
      longDescription: 'A picture is worth a thousand words. We showcase comprehensive walkthroughs of real work carried out across Leeds. Explore the exact engineering steps of how we replace rusted back-boilers with A-rated modern units, how we tank and waterproof high-end marble wetrooms, and scale up flow metrics in large facilities.',
      icon: FileText,
      duration: 'Updated Weekly',
      priceEstimate: 'Browse Our Active Showcase Portfolio below',
      keyPoints: [
        'Step-by-step imagery of raw copper piping layouts and manifolds',
        'Before and after transformations of outdated bathrooms into luxury retreats',
        'A-rated condensing boilers neatly piped into kitchen cupboards',
        'Real pressure test values recorded before and after flushes'
      ],
      tipsForHomeowner: 'Take a look at our "Project Work Showcase" below to draw inspiration for your own master bathroom design.'
    },
    'about-faqs': {
      title: 'Frequently Asked Questions',
      category: 'Expert Answers',
      description: 'Professional guidance on warranty coverage, emergency call-outs, and boiler choosing.',
      longDescription: 'Get answers to standard heating queries with transparent expert responses. We clear up confusion about Gas Safe requirements, discuss the difference between combi and system boilers, explain how power-flushes protect energy budgets, and detail why annual servicing maintains your extended warranty terms.',
      icon: HelpCircle,
      duration: 'Instant Answers',
      priceEstimate: 'Honest, Jargon-Free Guidance',
      keyPoints: [
        'Details of extended 12-year warranty inclusions and rules',
        'Emergency response hours and standard dispatch time commitments',
        'Explanation of why we use only oxygen-barrier distribution pipes',
        'How our custom digital estimates help calculate accurate sizes'
      ],
      tipsForHomeowner: 'Browse our "Frequently Asked Questions" accordion at the bottom of the page for detailed help.'
    },
    'about-areas': {
      title: 'Areas We Cover',
      category: 'Regional Availability',
      description: 'Our mobile workshops operate 24/7 across Greater Leeds, Harrogate, and West Yorkshire.',
      longDescription: 'Our fully stocked mobile plumbing vehicles are stationed across West Yorkshire to ensure minimal waiting times. We provide priority same-day assistance, routine boiler swaps, and interactive surveys to the following boroughs: Leeds (Central), Horsforth, Headingley, Roundhay, Moortown, Alwoodley, Harrogate, Wetherby, Pudsey, Morley, Rothwell, Otley, and Ilkley.',
      icon: MapPin,
      duration: 'West Yorkshire Focus',
      priceEstimate: 'Leeds, Harrogate & surrounding boroughs covered',
      keyPoints: [
        'Local mechanics stationed in Horsforth, Roundhay, and Leeds Central',
        '24/7 emergency vehicles on continuous standby on West Yorkshire highways',
        'No travel premiums or mileage rates charged for local projects',
        'Fully compliant with Leeds Clean Air Zone boundaries'
      ],
      tipsForHomeowner: 'Our live dispatch screen will match your post-code with our closest roaming plumber for rapid responses.'
    },
    'about-team': {
      title: 'Meet the Team',
      category: 'Certified Professionals',
      description: 'Our qualified staff comprises Gas Safe heating masters, designers, and detailed support.',
      longDescription: 'Our crew consists of fully qualified heating specialists, meticulous luxury tilers, friendly client co-ordinators, and certified emergency troubleshooters. Every team member undergoes thorough DBS screening, holds full certification, and shares a deep pride in keeping homes warm, dry, and thoroughly satisfied.',
      icon: Users,
      duration: '15+ Craft Professionals',
      priceEstimate: 'Dedicated, DBS-checked, and highly friendly engineers',
      keyPoints: [
        'Fully certified Gas Safe registered technicians with individual photo IDs',
        'Meticulous bathroom tilling specialists with eye for grout lines',
        'Prompt project managers keeping your installation on a tight budget',
        'Helpful phone operators to dispatch mobile help 24/7'
      ],
      tipsForHomeowner: 'All our mechanics arrive in full corporate uniform with certified identity cards clearly displayed on request.'
    }
  };

  const item = detailsDatabase[serviceId];

  // Fallback in case of code mismatches
  if (!item) {
    onClose();
    return null;
  }

  const IconComponent = item.icon || Wrench;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Decorative Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 px-6 py-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <IconComponent className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest font-bold text-teal-400 font-mono">
                {item.category}
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight mt-0.5 text-white">
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Scrollable Content details */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Description */}
          <div>
            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {item.description}
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed mt-3">
              {item.longDescription}
            </p>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Service Specs Block (Grid of Price & Duration) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Timeframe Guideline</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{item.duration}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Pricing Guidelines</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{item.priceEstimate}</span>
              </div>
            </div>
          </div>

          {/* Checklist Bullets */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider font-display">What We Provide:</h4>
            <div className="grid gap-2.5">
              {item.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Tip Section */}
          <div className="bg-orange-50/60 border border-orange-100/80 p-4 rounded-xl text-left">
            <span className="block text-[10px] uppercase tracking-wider font-bold text-orange-600 mb-1 font-mono">💡 Local Professional Tip</span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.tipsForHomeowner}
            </p>
          </div>
        </div>

        {/* Footer actions for booking */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl hover:bg-slate-100 text-slate-600 font-semibold text-xs sm:text-sm transition-colors text-center border border-slate-200"
          >
            Go Back
          </button>
          
          <button
            onClick={() => {
              onBookNow(item.title);
              onClose();
            }}
            className="flex-2 py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm transition-colors text-center shadow-lg shadow-teal-600/10"
          >
            Pre-Book / Discuss {item.title}
          </button>
        </div>

      </div>
    </div>
  );
}
