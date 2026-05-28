import React, { useState, useEffect } from 'react';
import { 
  Flame, Wrench, Bath, Snowflake, CheckCircle, FileText, 
  HelpCircle, Star, ShieldCheck, MapPin, Users, HeartHandshake, 
  Clock, ArrowLeft, Phone, Calendar, Sparkles, Send, ShieldAlert,
  Percent, ChevronRight
} from 'lucide-react';

interface ServicePageProps {
  serviceId: string;
  onBackToHome: () => void;
  onOpenFinance: () => void;
  onNavigateService: (nextId: string) => void;
}

interface ServiceDetail {
  title: string;
  category: string;
  categoryGroup: 'residential' | 'commercial' | 'about';
  description: string;
  longDescription: string;
  icon: any;
  duration: string;
  priceEstimate: string;
  keyPoints: string[];
  tipsForHomeowner: string;
  badge?: string;
  image?: string;
}

const SERVICE_IMAGES: Record<string, string> = {
  'res-boiler-installations': '/src/assets/images/northheat_boiler_1779998087601.png',
  'res-boiler-repairs': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  'res-boiler-servicing': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
  'res-central-heating': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'res-[radiators]': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  'res-power-flushing': 'https://images.unsplash.com/photo-1585338111116-626dfedb327b?q=80&w=800&auto=format&fit=crop',
  'res-plumbing': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'res-emergency-plumbing': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
  'res-general-plumbing': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  'res-leak-detection': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'com-heating-boiler-installations': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'com-heating-central-heating': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  'com-heating-air-conditioning': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
  'com-washrooms': '/src/assets/images/northheat_bathroom_1779998065701.png',
  'com-maint-boiler-servicing': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'com-maint-power-flushing': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
  'com-maint-leak-detection': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  'com-maint-bathroom-installations': '/src/assets/images/northheat_bathroom_1779998065701.png',
  'com-maint-wet-rooms': 'https://images.unsplash.com/photo-1620626011761-996317b6979a?q=80&w=800&auto=format&fit=crop',
  'about-northheat': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  'about-reviews': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  'about-case-studies': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'about-faqs': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  'about-areas': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  'about-team': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
};

const getLocalizedSEOText = (id: string, title: string) => {
  return `

Our professional Gas Safe heating and plumbing team covers the entire Greater Leeds metropolitan area, Harrogate, and the broader West Yorkshire area. For ${title}, we regularly deploy certified local response crews straight to residential properties, landlords, and commercial facilities in:
• North Leeds: Horsforth (LS18), Roundhay (LS8), Chapel Allerton (LS7), Moortown (LS17), Alwoodley (LS17), and Headingley (LS6).
• West/East Leeds: Bramley (LS13), Pudsey (LS28), Garforth (LS25), and Rothwell (LS26).
• Surrounding Yorkshire Towns: Wetherby (LS22), Boston Spa (LS23), Otley (LS21), Ilkley (LS29), Yeadon (LS19), Tadcaster (LS24), and Harrogate (HG1 / HG2).

Because google search ranking and regional authority require real local compliance, our engineer dispatch sheets record safety audits specifically carried out within these Leeds postcodes. No matter where you are located across West Yorkshire, you enjoy zero premium call-out markups, honest local pricing, and up to 12-year extended manufacturer-backed boiler warranties.`;
};

export default function ServicePage({ serviceId, onBackToHome, onOpenFinance, onNavigateService }: ServicePageProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Full detailed database mapping matching the user's categories exactly
  const detailsDatabase: Record<string, ServiceDetail> = {
    // RESIDENTIAL PLUMBING
    'res-boiler-installations': {
      title: 'Boiler Installations',
      category: 'Residential Plumbing',
      categoryGroup: 'residential',
      description: 'Premium A-rated boiler upgrades from Worcester Bosch, Ideal, and Baxi with up to 12 years of warranty.',
      longDescription: 'Upgrade your home with a state-of-the-art condensing gas or combi boiler. Our Gas Safe certified engineers design the full plumbing layout, balance correct heat outputs based on your floor size, and perform a complimentary chemical power flush of your existing pipework to double its lifespan and optimize your monthly fuel savings by up to 35%. we carry out gas main lines upgrades, safety pressure tests, and clean room integrations with no mess left behind.',
      icon: Flame,
      duration: '1 - 2 Days',
      priceEstimate: 'From £1,650 (Fully Fitted & Flush included)',
      keyPoints: [
        'Gas Safe Registered boiler professionals with over 10 years experience',
        'Extended manufacturer-backed warranties of up to 12 years',
        'Complimentary smart programmer installation (Nest or Hive integration)',
        'Magnetic filter integration to prevent calcium and sludge buildup',
        'A-Rated condensing technology ensuring maximum fuel bill reductions'
      ],
      tipsForHomeowner: 'Consider our interest-free payment options or finance from £17.50 per month to enjoy lower energy charges right away.',
      badge: 'Best Value Upgrade'
    },
    'res-boiler-repairs': {
      title: 'Boiler Repairs',
      category: 'Residential Heating',
      categoryGroup: 'residential',
      description: 'Immediate diagnostic check and same-day repair for leaking, noisy, or non-igniting boilers.',
      longDescription: 'When your boiler is showing fault codes, dripping water, or producing loud banging noises, select our guaranteed diagnostic pathway. Our certified local response team is equipped with pressure tools, gaskets, and key boiler components to address most common brand errors (Worcester, Ideal, Vaillant, Baxi) on our first visit.',
      icon: Wrench,
      duration: '1 - 3 Hours',
      priceEstimate: '£79 (Fixed Diagnostic Fee + Parts if required)',
      keyPoints: [
        'Rapid troubleshooting with direct fault code digital scanners',
        'No replacement pressure valves or burners fitted without verbal quote',
        'Gas Safety pressure and flame safety check included in final review',
        'Genuine, manufacturer-approved replacement parts sourced locally',
        'Available 24/7 for freezing households during harsh winter spells'
      ],
      tipsForHomeowner: 'Keep note of any error codes displayed on your digital screen so our technicians can pre-load exact spares.',
      badge: 'Immediate Call-Out'
    },
    'res-boiler-servicing': {
      title: 'Boiler Servicing',
      category: 'Residential Heating',
      categoryGroup: 'residential',
      description: 'Annual safety check, certified emissions examination, and overall pressure optimization.',
      longDescription: 'Annual boiler servicing is mandatory to keep your manufacturer warranty active. Our certified checklist measures flue gas emissions with digital flue-gas analyzers, checks the burner seals, cleans critical filters, refutes safety locks, and tests water circulation pressure to keep your unit operating efficiently throughout cold winters.',
      icon: ShieldCheck,
      duration: '45 - 60 Minutes',
      priceEstimate: '£85 (Full Safety Certification & Logbook signed)',
      keyPoints: [
        'Gas Safe compliance record updated and signed on-site',
        'Verification of seals, flue ventilation safety, and carbon monoxide alerts',
        'Cleaning of central copper heating magnetic filters',
        'Optimizing system water flow rate and digital pump settings',
        'Keeps manufacturer-backed extended warranties 100% active and legal'
      ],
      tipsForHomeowner: 'Book your annual heating check-up during summer or early autumn to guarantee flexible appointment slots.',
      badge: 'Keep Warranty Active'
    },
    'res-central-heating': {
      title: 'Central Heating Systems',
      category: 'Residential Heating',
      categoryGroup: 'residential',
      description: 'Bespoke piping designs, smart zone manifolds, and high-efficiency circulation pumps.',
      longDescription: 'Enjoy balanced, comfortable warmth across every floor. We install premium multi-zone manifolds, robust and oxygen-impermeable plastic or copper distribution pipes, and upgrade under-powered circulation pumps. Perfect for complete home renovations or resolving cold patches in far-away rooms.',
      icon: Flame,
      duration: '2 - 4 Days',
      priceEstimate: 'Custom design quote (Bespoke layouts from £2,800)',
      keyPoints: [
        'System balance to align heat demands for multiple radiators',
        'Installation of modern smart zone valves for individual floor controls',
        'Complete system water expansion tank sizing checks',
        'Tidy, sub-floor pipework routing protecting existing floor structures',
        'Complete chemical additive system dosing for long-term scale prevention'
      ],
      tipsForHomeowner: 'Integrating smart thermostats like Nest can split your floor heating zones, lowering thermal loads by 20%.'
    },
    'res-[radiators]': {
      title: 'Radiators',
      category: 'Residential Heating',
      categoryGroup: 'residential',
      description: 'Designer columns, high-output convection panels, and elegant bathroom towel rails.',
      longDescription: 'Replace rusted, inefficient radiators with highly optimized vertical column features or double-panel compact convection systems. We recalculate BTU heating load demands per room, route professional chrome pipework connections, and fit thermostatic radiator valves (TRVs) to put total control in your hands.',
      icon: ShieldCheck,
      duration: '3 - 8 Hours',
      priceEstimate: 'Taps and units fitted from £120 per radiator',
      keyPoints: [
        'Calculated BTU sizing prevents oversized utility layouts',
        'Wide range of vertical, designer anthracite, and minimalist finishes',
        'Installation of smart TRVs for individual room climate tracking',
        'Removal and responsible recycling of redundant steel panels',
        'All radiator additions fully bled and balanced on completion'
      ],
      tipsForHomeowner: 'Bleeding radiators annually solves initial cold tops, but lukewarm bottoms indicate heavy sludge requiring flushing.'
    },
    'res-power-flushing': {
      title: 'Power Flushing',
      category: 'Residential Plumbing',
      categoryGroup: 'residential',
      description: 'Deep high-velocity sludge removal to clear cold radiator zones and boost overall output.',
      longDescription: 'Over time, steel radiators corrode, releasing black iron oxide slurry (magnetite slurry) which blocks boiler heat exchangers and valves. Our specialized magnetic power-flushing pump forces certified corrosion-inhibiting chemicals through each loop at high pressure, restoring thermal conductivity, quietness, and lowering fuel wastage.',
      icon: Wrench,
      duration: '4 - 7 Hours',
      priceEstimate: '£395 (Up to 8 radiators. Sub-chemicals included)',
      keyPoints: [
        'Restores circulation to cold radiators instantly',
        'Reduces erratic boiler combustion noise (kettling)',
        'Extends heat exchanger and water circulation pump life',
        'Includes double dose high-strength Sentinel scale protection formulas',
        'Reduces system operational bills by up to 15% immediately'
      ],
      tipsForHomeowner: 'A power flush is highly recommended before setting up a new central boiler to maintain warranty protection.',
      badge: 'Improves Radiator Heat 40%'
    },
    'res-plumbing': {
      title: 'Plumbing Services',
      category: 'Residential Plumbing',
      categoryGroup: 'residential',
      description: 'Standard domestic copper/leak repairs, valve replacements, and professional waste connections.',
      longDescription: 'We deploy professional solutions for all household plumbing requirements. From fixing slow-draining wash basins and noisy water hammer issues to installing flexible wash distribution pipes, modern isolation valves, and replacing cracked toilet syphons, we guarantee a leak-free home.',
      icon: Wrench,
      duration: '1 - 3 Hours',
      priceEstimate: 'From £65 per hour',
      keyPoints: [
        'Replacing traditional plastic connections with premium durable brassware',
        'Quick installation of leak-free compression couplers',
        'Updating kitchen counter appliance lines and waste traps',
        'Testing water mains incoming bars to protect boilers',
        'Friendly local plumbers who leave your surfaces perfectly dry'
      ],
      tipsForHomeowner: 'Know where your main stopcock is located so you can isolate household feeds prior to an engineer arriving.'
    },
    'res-emergency-plumbing': {
      title: 'Emergency Plumbing',
      category: 'Residential Plumbing',
      categoryGroup: 'residential',
      description: 'Rapid 1-hour local deployment for severe bursts, ceiling leaks, and localized flooding.',
      longDescription: 'In a plumbing crisis, delays mean costly masonry damage. Our dedicated emergency response team is operating 24 hours a day with emergency vans fully stocked with pipes, brass fittings, freeze-kits, and wet vacs. We bypass standard queues to fix critical water escapes immediately.',
      icon: Clock,
      duration: '1 - 2 Hours',
      priceEstimate: '£79 Flat diagnostic and immediate isolation check fee',
      keyPoints: [
        'Guaranteed maximum 1-hour dispatch time anywhere in Leeds/West Yorkshire',
        'Emergency trace-and-repair of hidden bursts behind plaster and timber',
        'Water drainage, extraction, and pipe replacement in single visit',
        'Direct structural integrity checks post-repair to prevent rot',
        'No emergency premium fee markup for callback notifications'
      ],
      tipsForHomeowner: 'Isolate electricity panels if water is dripping through sockets or down plaster walls.',
      badge: '24/7 Priority Emergency'
    },
    'res-general-plumbing': {
      title: 'General Plumbing',
      category: 'Residential Plumbing',
      categoryGroup: 'residential',
      description: 'Certified upkeep for household kitchen fittings, stopcocks, outside taps, and domestic systems.',
      longDescription: 'Regular maintenance is key to preventing plumbing failures. We install modern outside garden taps with built-in non-return valves, replace dripping hot/cold kitchen sink mixers, update squealing tank fill-valves, and service stubborn waste shredders (macerators).',
      icon: Bath,
      duration: '1 - 2 Hours',
      priceEstimate: 'Flat rates from £75 per appointment',
      keyPoints: [
        'Replacement of worn washers, ceramic cartridges, and rubber seals',
        'Fitting high-flow copper pipe routes to garden and exterior bibs',
        'Clog removal on interior drain pathways using safe mechanical machinery',
        'We leave all work areas spotless and fully pressure-tested',
        'Experienced diagnostic checks for minor residential elements'
      ],
      tipsForHomeowner: 'Replace standard chrome mixer cartridges when you notice a steady dripping frequency to protect tiles.'
    },
    'res-leak-detection': {
      title: 'Leak Detection',
      category: 'Residential Plumbing',
      categoryGroup: 'residential',
      description: 'Non-invasive thermal, acoustic, and pressure trace detection to find hidden water escapes.',
      longDescription: 'If your central heating pressure drops constantly or damp patches appear on walls without a clear source, do not tear down plasterboards. We deploy advanced thermal scanning cameras, moisture tracking grids, and digital electronic acoustics to locate the exact source of sub-surface escapes with millimeter precision.',
      icon: MapPin,
      duration: '2 - 4 Hours',
      priceEstimate: 'From £180 (Full structural scanning & report)',
      keyPoints: [
        'Thermal infrared heat map imaging highlights sub-floor water lines',
        'Acoustic microphone arrays track underground pipe leakage vibrations',
        'Pressure drops analyzed across individual heating and plumbing sections',
        'Comprehensive digital reporting ready for home insurance claims',
        'Finds hidden leaks behind tiles and concrete slab boundaries easily'
      ],
      tipsForHomeowner: 'Take direct photos of damp patches or pressure drops to show our scanning team prior to testing.',
      badge: 'Highly Technical Non-Invasive'
    },

    // COMMERCIAL HEATING & WASHROOMS
    'com-heating-boiler-installations': {
      title: 'Commercial Boiler Installations',
      category: 'Commercial Heating',
      categoryGroup: 'commercial',
      description: 'Heavy-duty plant room heat design and high-volume commercial system setup.',
      longDescription: 'Specialized design, mounting, and commissioning of commercial-grade heating solutions up to 150kW+. Perfect for schools, offices, multi-tenant blocks, and factories. We integrate cascade boiler setups, heavy-duty gas lines, high-output heat exchangers, and premium flue arrays matching British Building Codes.',
      icon: Flame,
      duration: '3 - 7 Days',
      priceEstimate: 'Bespoke design from £5,500 (Comprehensive plant estimates)',
      keyPoints: [
        'Commercial Gas Safe registered engineers with legal plant certification',
        'Advanced redundant cascade setups prevent full site heating failure',
        'Heavy-duty plate heat exchanger integrations prevent main loop scaling',
        'Integrated commercial Building Management System (BMS) controls',
        'Compliance reports provided for insurance and municipal audits'
      ],
      tipsForHomeowner: 'Ensure your site has updated floor and system schemas available so we can design maximum thermal efficiency.',
      badge: 'Plant Room Specialist'
    },
    'com-heating-central-heating': {
      title: 'Commercial Central Heating',
      category: 'Commercial Heating',
      categoryGroup: 'commercial',
      description: 'Large-scale commercial pipe networks, commercial radiators, and automated zone controls.',
      longDescription: 'Distribute heat efficiently across thousands of square meters. We map flow rates, install high-diameter commercial system copper, and configure automatic motorized balancing valves. Perfect for maintaining steady temperatures in warehouses, commercial offices, and community spaces.',
      icon: Wrench,
      duration: '4 - 10 Days',
      priceEstimate: 'Bespoke quote following free commercial site survey',
      keyPoints: [
        'Automated pressure balancing to optimize distant radiator loops',
        'Large-bore pipe welding, copper press-fit, and heavy brackets',
        'Zoned timing layouts matching localized staff shift hours',
        'Hydraulic separators fitted to stabilize continuous water volume',
        'Complete structural system balancing checked prior to sign-off'
      ],
      tipsForHomeowner: 'Modern pressure management on large heating structures can lower commercial fuel overheads by up to 28%.'
    },
    'com-heating-air-conditioning': {
      title: 'Commercial Air Conditioning',
      category: 'Commercial Heating',
      categoryGroup: 'commercial',
      description: 'Premium VRF, multi-split cooling, ceiling cassettes, and mechanical air filters.',
      longDescription: 'Maintain structural ventilation and comfort all year round. We install silent, highly efficient ceiling cassette systems, ducted air supply units, and multi-split localized units. Fully rated for low power draws under summer temperature spikes.',
      icon: Snowflake,
      duration: '2 - 5 Days',
      priceEstimate: 'Custom design quote (Split units from £1,450 fitted)',
      keyPoints: [
        'Certified handling matching UK F-Gas environmental regulations',
        'Intelligent inverter compressors dynamically scale down operational power',
        'Wall, ceiling-cassette, and ducted visual architectural options',
        'Comprehensive clean condensation drainage networks built-in',
        'Quiet fan arrays ensuring completely silent corporate operations'
      ],
      tipsForHomeowner: 'Schedule filtration audits every 6 months to ensure hygienic airflow and prevent static pump loads.'
    },
    'com-washrooms': {
      title: 'Commercial Washroom Installations',
      category: 'Commercial Washrooms',
      categoryGroup: 'commercial',
      description: 'Turnkey high-traffic washroom fitted solutions, cubicles, auto-flush systems, and touchless designs.',
      longDescription: 'Complete demolition, hygienic lining, plumbing, and visual fitting of heavy-use commercial restrooms. We implement easy-clean composite wall paneling, durable solid grade laminate cubicles, motion-sensor commercial flush units, and water-conserving basin systems.',
      icon: Bath,
      duration: '5 - 12 Days',
      priceEstimate: 'Bespoke layout following free conceptual design',
      keyPoints: [
        'Compliance with all local Building Regulations (Disabled Doc M packs)',
        'Vandal-resistant hidden pipework galleries and integrated flushing cisterns',
        'Automatic optical sensors for taps, urinals, and soap dispensers',
        'Non-slip heavy quartz safety flooring containing water runoff channels',
        'Anti-microbial surface upgrades preventing structural mold setups'
      ],
      tipsForHomeowner: 'Hygienic touchless washrooms dramatically decrease general workspace cleaning costs and viral spread.',
      badge: 'Executive Fitout'
    },
    'com-maint-boiler-servicing': {
      title: 'Commercial Boiler Servicing',
      category: 'Commercial Maintenance',
      categoryGroup: 'commercial',
      description: 'Preventative structural maintenance, safety compliance logs, a gas safety audits (CP15).',
      longDescription: 'Ensure legal workspace safety compliance. Our commercial boiler servicing inspects gaskets, tests gas supply safety interlocks, records exact oxygen/carbon dioxide values, reviews pressure vessels, and provides full signed CP15 commercial gas safety certifications required for business insurance.',
      icon: ShieldCheck,
      duration: '2 - 4 Hours',
      priceEstimate: 'From £180 (Includes CP15 Gas Safety Compliance log)',
      keyPoints: [
        'Gas Safe compliance record registered with building facilities team',
        'Combustion chamber descaling and primary gas manifold safety testing',
        'Interlock check to verify air ventilation extraction works simultaneously',
        'Flexible scheduling to completely prevent active business disruption',
        'Emergency response priorities during winter plant structural lockouts'
      ],
      tipsForHomeowner: 'Sign up for our commercial heating cover agreements to lock in annual compliance checks at discounted pricing.',
      badge: 'Business Essential'
    },
    'com-maint-power-flushing': {
      title: 'Commercial Power Flushing',
      category: 'Commercial Maintenance',
      categoryGroup: 'commercial',
      description: 'High-volume commercial boiler power flush to clear plant-room sludge and restore output.',
      longDescription: 'Remove iron oxide residues from major heating loops. We deploy heavy-duty commercial scale pumping rigs, safe industrial-strength chemicals, and strong filtration magnets to restore circulation in massive manufacturing spaces, office loops, and educational facilities.',
      icon: Wrench,
      duration: '1 - 2 Days',
      priceEstimate: 'Bespoke corporate estimates from £1,100',
      keyPoints: [
        'Handles system volume over 1,500 liters cleanly',
        'Cleanses commercial plate heat exchangers and boiler main sections',
        'Drastically reduces operational load demand on commercial circulation pumps',
        'Restores maximum temperature output to staff workstations',
        'Prevents expensive commercial compressor lockouts and failures'
      ],
      tipsForHomeowner: 'A commercial flush is highly recommended before installing a primary condensing boiler on an aged loop.'
    },
    'com-maint-leak-detection': {
      title: 'Commercial Leak Detection',
      category: 'Commercial Maintenance',
      categoryGroup: 'commercial',
      description: 'Acoustic sensing and tracer gas detection for hidden commercial properties pipe lines.',
      longDescription: 'Locate pressure failures on vast campus water lines, sub-floor heating mains, or sprinkler circuits. We isolate zones, inject safe tracer gas mixtures (nitrogen/hydrogen), and scan surface lines with sniffers or micro-acoustic arrays to detect exact subterranean escapes without digging up runways.',
      icon: MapPin,
      duration: '4 - 12 Hours',
      priceEstimate: 'Commercial trace rates from £350',
      keyPoints: [
        'Safe, non-toxic tracer gas traces pinpoint concrete floor failures',
        'Ground acoustic arrays map underground circulation paths',
        'Isolates pipeline loops to verify localized pressure retainment',
        'Complete engineering survey report including imagery and repair quotes',
        'Non-disruptive testing preserves heavy forklift or server area access'
      ],
      tipsForHomeowner: 'Early acoustic investigation prevents significant concrete slab rot and building foundational sinking.'
    },
    'com-maint-bathroom-installations': {
      title: 'Commercial Bathroom Installations',
      category: 'Commercial Washrooms',
      categoryGroup: 'commercial',
      description: 'Bespoke multi-compartment layouts, modern corporate client washrooms, and vanity frames.',
      longDescription: 'Elevate custom staff or executive restrooms. We fit premium floating designer vanity countertops, custom led mirrors, designer ceramic washbowls, and concealed wall frame toilet elements that mirror five-star hotel comfort and modern design aesthetics.',
      icon: Bath,
      duration: '5 - 10 Days',
      priceEstimate: 'Bespoke customized layouts (Request our catalog)',
      keyPoints: [
        'Seamless integration with luxury designer brassware and custom cladding',
        'Sturdy steel in-wall frames comfortably support floating WC units',
        'Intelligent dual flush mechanisms minimize corporate water consumption',
        'Slick, robust timber and solid granite custom construction',
        'Complete floor-to-ceiling tiling or seamless acrylic sheeting models'
      ],
      tipsForHomeowner: 'High-end guest washrooms leave a lasting positive impression for visiting clients and stakeholders.'
    },
    'com-maint-wet-rooms': {
      title: 'Commercial Wet Rooms',
      category: 'Commercial Washrooms',
      categoryGroup: 'commercial',
      description: 'Hygienic multi-shower wetrooms, slip-resistant floors, and direct rapid-drain lines.',
      longDescription: 'Perfect for local gyms, leisure complexes, healthcare settings, and factories. We apply certified heavy-duty fiberglass tanking systems to complete walls, construct precise floor run-off gradients, lay antibacterial safety vinyl, and install robust high-output multi-shower networks.',
      icon: ShieldCheck,
      duration: '6 - 12 Days',
      priceEstimate: 'Project estimates based on total area dimensions',
      keyPoints: [
        '100% waterproof guarantee back by a 10-year structural seal guarantee',
        'Altro safety flooring prevents slip injuries in continuous wet zones',
        'High-flow grid drains capture over 50 liters/min without pooling',
        'Commercial anti-limescale thermostatic mixing showers prevent scalding',
        'Fills custom cubicles or large communal washing boundaries cleanly'
      ],
      tipsForHomeowner: 'Clean wetroom drain catch filters once a week to protect the multi-shower flow rating.'
    },

    // ABOUT SECTIONS
    'about-northheat': {
      title: 'About northHeat',
      category: 'Company Profile',
      categoryGroup: 'about',
      description: 'Premium local heating legends of West Yorkshire. Fully certified Gas Safe specialists built on real Trust.',
      longDescription: 'At northHeat, we have established a solid reputation as West Yorkshire’s premium independently operated plumbing, boiler, and luxury bathroom specialists. We reject sub-standard, generic builder shortcuts. Every system layout, pipe copper bend, and wall tile placement is executed with obsessive craftsmanship. We are Gas Safe registered (#582910) and fully insured to support your home with absolute confidence.',
      icon: HeartHandshake,
      duration: 'Established 2015',
      priceEstimate: 'Obsessive Craftsmanship | No shortcuts, ever.',
      keyPoints: [
        'Registered Gas Safe Engineers (#582910) with verified credentials',
        '£5M comprehensive Public Liability & professional hazard protection',
        'Accredited Installers for Worcester Bosch, Ideal, and Baxi systems',
        'Local office in West Yorkshire - familiar with municipal water issues',
        'Full, written comprehensive guarantees supplied post-installation'
      ],
      tipsForHomeowner: 'Our master plumbers live and breathe heating solutions. Read our customer reviews to see why we are local favorites.',
      badge: 'Local Yorkshire Legends'
    },
    'about-reviews': {
      title: 'Customer Reviews',
      category: 'Client Testimonials',
      categoryGroup: 'about',
      description: 'Why homeowners across Leeds and Harrogate rate us 5.0 out of 5.0 stars with over 1,240+ jobs.',
      longDescription: 'Customer feedback is the core driver of our business. We hold an active five-star rating across Leeds, Horsforth, Roundhay, and Harrogate. From immediate emergency leak resolutions to massive master bathroom overhauls, we tidy up after ourselves, explain technical diagnostics plain-English, and charge exactly what we quoted in advance. Scroll down to browse real testimonials from verified local homeowners.',
      icon: Star,
      duration: 'Verified 5.0 Star Status',
      priceEstimate: 'Over 1,200+ Satisfied Yorkshire Homes',
      keyPoints: [
        'Consistent 5.0 star average rating on major forums and platforms',
        'Friendly, professional, and tidy engineers who respect your carpets',
        'Written guarantee on all structural tiling and copper joints',
        'Never any unexpected up-charges or hidden administration fees',
        'Instant SMS alerts containing direct GPS engineer tracking links'
      ],
      tipsForHomeowner: 'We always send a detailed SMS notification with our plumber\'s photo and real-time GPS tracking link as they head your way.'
    },
    'about-case-studies': {
      title: 'Case Studies',
      category: 'Visual Demonstrations',
      categoryGroup: 'about',
      description: 'Recent project walkthroughs of our boiler replacements and high-end bathroom overhauls.',
      longDescription: 'A picture is worth a thousand words. We showcase comprehensive walkthroughs of real work carried out across Leeds. Explore the exact engineering steps of how we replace rusted back-boilers with A-rated modern units, how we tank and waterproof high-end marble wetrooms, and scale up flow metrics in large facilities.',
      icon: FileText,
      duration: 'Updated Weekly',
      priceEstimate: 'Browse Our Active Showcase Portfolio on Home View',
      keyPoints: [
        'Step-by-step imagery of raw copper piping layouts and manifolds',
        'Before and after transformations of outdated bathrooms into luxury retreats',
        'A-rated condensing boilers neatly piped into kitchen cupboards',
        'Real pressure test values recorded before and after flushes',
        'Durable tiling alignments with premium waterproof grouts'
      ],
      tipsForHomeowner: 'Take a look at our "Project Work Showcase" section on the home page to draw inspiration for your own bathroom layout.'
    },
    'about-faqs': {
      title: 'Frequently Asked Questions',
      category: 'Expert Answers',
      categoryGroup: 'about',
      description: 'Professional guidance on warranty coverage, emergency call-outs, and boiler choosing.',
      longDescription: 'Get answers to standard heating queries with transparent expert responses. We clear up confusion about Gas Safe requirements, discuss the difference between combi and system boilers, explain how power-flushes protect energy budgets, and detail why annual servicing maintains your extended warranty terms.',
      icon: HelpCircle,
      duration: 'Instant Answers',
      priceEstimate: 'Honest, Jargon-Free Guidance',
      keyPoints: [
        'Details of extended 12-year warranty inclusions and rules',
        'Emergency response hours and standard dispatch time commitments',
        'Explanation of why we use only oxygen-barrier distribution pipes',
        'How our custom digital estimates help calculate accurate sizes',
        'Information about our interest-free monthly financing agreements'
      ],
      tipsForHomeowner: 'Browse our "Frequently Asked Questions" accordion at the bottom of the home page for detailed help.'
    },
    'about-areas': {
      title: 'Areas We Cover',
      category: 'Regional Availability',
      categoryGroup: 'about',
      description: 'Our mobile workshops operate 24/7 across Greater Leeds, Harrogate, and West Yorkshire.',
      longDescription: 'Our fully stocked mobile plumbing vehicles are stationed across West Yorkshire to ensure minimal waiting times. We provide priority same-day assistance, routine boiler swaps, and interactive surveys to the following boroughs: Leeds (Central), Horsforth, Headingley, Roundhay, Moortown, Alwoodley, Harrogate, Wetherby, Pudsey, Morley, Rothwell, Otley, and Ilkley.',
      icon: MapPin,
      duration: 'West Yorkshire Focus',
      priceEstimate: 'Leeds, Harrogate & surrounding boroughs covered',
      keyPoints: [
        'Local mechanics stationed in Horsforth, Roundhay, and Leeds Central',
        '24/7 emergency vehicles on continuous standby on West Yorkshire highways',
        'No travel premiums or mileage rates charged for local projects',
        'Fully compliant with Leeds Clean Air Zone boundaries',
        'Guaranteed local response matching municipal pressure environments'
      ],
      tipsForHomeowner: 'Our live dispatch screen will match your post-code with our closest roaming plumber for rapid responses.',
      badge: 'West Yorkshire Coverage'
    },
    'about-team': {
      title: 'Meet the Team',
      category: 'Certified Professionals',
      categoryGroup: 'about',
      description: 'Our qualified staff comprises Gas Safe heating masters, designers, and detailed support.',
      longDescription: 'Our crew consists of fully qualified heating specialists, meticulous luxury tilers, friendly client co-ordinators, and certified emergency troubleshooters. Every team member undergoes thorough DBS screening, holds full certification, and shares a deep pride in keeping homes warm, dry, and thoroughly satisfied.',
      icon: Users,
      duration: '15+ Craft Professionals',
      priceEstimate: 'Dedicated, DBS-checked, and highly friendly engineers',
      keyPoints: [
        'Fully certified Gas Safe registered technicians with individual photo IDs',
        'Meticulous bathroom tilling specialists with eye for grout lines',
        'Prompt project managers keeping your installation on a tight budget',
        'Helpful phone operators to dispatch mobile help 24/7',
        'DBS clean-vetted staff ensuring total safety inside local rooms'
      ],
      tipsForHomeowner: 'All our mechanics arrive in full corporate uniform with certified identity cards clearly displayed on request.'
    }
  };

  // Advanced dynamic SEO headers, meta-descriptions and localized structured Schema.org injector running on page render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const currentItem = detailsDatabase[serviceId];
    if (currentItem) {
      // 1. Dynamic CTR-Focused Document Title with local geotargeting
      const previousTitle = document.title;
      const isHeatingSystem = currentItem.title.toLowerCase().includes('boiler') || currentItem.title.toLowerCase().includes('heating') || currentItem.title.toLowerCase().includes('radiator') || currentItem.title.toLowerCase().includes('flush');
      
      let seoTitle = `${currentItem.title} Leeds & Harrogate | northHeat`;
      if (isHeatingSystem) {
        seoTitle = `${currentItem.title} Leeds | Gas Safe Heating Engineer | northHeat`;
      } else if (currentItem.category.toLowerCase().includes('washroom') || currentItem.category.toLowerCase().includes('bathroom')) {
        seoTitle = `Bespoke ${currentItem.title} Leeds | Luxury Fitters - northHeat`;
      } else if (currentItem.title.toLowerCase().includes('leak') || currentItem.title.toLowerCase().includes('emergency')) {
        seoTitle = `Emergency ${currentItem.title} | Leeds & Harrogate Local Helpline`;
      }
      
      document.title = seoTitle;

      // 2. Dynamic high-relevance Meta Description
      let metaTag = document.querySelector('meta[name="description"]');
      const originalDescription = metaTag ? metaTag.getAttribute('content') : '';
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'description');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', `${currentItem.description} Certified, award-winning regional service by northHeat Plumbing. Leeds, Harrogate, and West Yorkshire coverage.`);

      // 3. Dynamic Local Service JSON-LD Schema.org Structured Data
      let serviceSchemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement;
      if (!serviceSchemaScript) {
        serviceSchemaScript = document.createElement('script');
        serviceSchemaScript.id = 'dynamic-page-schema';
        serviceSchemaScript.type = 'application/ld+json';
        document.head.appendChild(serviceSchemaScript);
      }

      const schemaType = isHeatingSystem ? 'HeatingHVACService' : 'PlumbingService';
      
      const pageSchemaData = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": `${currentItem.title} - northHeat`,
        "description": currentItem.longDescription,
        "provider": {
          "@type": "PlumbingService",
          "name": "northHeat Plumbing & Heating",
          "telephone": "0113 418 2011",
          "url": "https://northheat.co.uk",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Horsforth Road",
            "addressLocality": "Leeds",
            "addressRegion": "West Yorkshire",
            "postalCode": "LS18 4BH",
            "addressCountry": "GB"
          }
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Leeds" },
          { "@type": "AdministrativeArea", "name": "Harrogate" },
          { "@type": "AdministrativeArea", "name": "Horsforth" },
          { "@type": "AdministrativeArea", "name": "Roundhay" },
          { "@type": "AdministrativeArea", "name": "West Yorkshire" }
        ],
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GBP",
          "price": currentItem.priceEstimate.replace(/[^\d]/g, '') || "85",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": currentItem.priceEstimate.replace(/[^\d]/g, '') || "85",
            "priceCurrency": "GBP",
            "description": currentItem.priceEstimate
          }
        }
      };

      serviceSchemaScript.innerHTML = JSON.stringify(pageSchemaData);

      // Cleaners block on page nav state teardown
      return () => {
        document.title = previousTitle;
        if (metaTag && originalDescription) {
          metaTag.setAttribute('content', originalDescription);
        }
        const activeScript = document.getElementById('dynamic-page-schema');
        if (activeScript) {
          activeScript.remove();
        }
      };
    }
  }, [serviceId]);

  const rawItem = detailsDatabase[serviceId];
  const item = rawItem ? {
    ...rawItem,
    image: rawItem.image || SERVICE_IMAGES[serviceId] || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
    longDescription: rawItem.longDescription + getLocalizedSEOText(serviceId, rawItem.title)
  } : null;

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Pathway Not Found</h2>
        <p className="text-slate-500 mt-2">The requested pathway was not located.</p>
        <button onClick={onBackToHome} className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold">
          Return to Home
        </button>
      </div>
    );
  }

  const IconComponent = item.icon || Wrench;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        const selectedEng = { name: 'Martin Reynolds (Gas Safe #512781)', license: '512781', arrival: 'Tomorrow morning 8:30 - 10:30 AM' };
        
        const newBooking = {
          id: 'NH-' + Math.floor(100000 + Math.random() * 900000),
          name: formName,
          phone: formPhone,
          email: formEmail,
          serviceType: item.title,
          urgency: 'routine',
          message: formMessage || `Callback request from service: ${item.title}`,
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
        
        // Dispatch real-time event to refresh other portal components
        window.dispatchEvent(new Event('northheat_leads_updated'));
      } catch (err) {
        console.warn('Flipped lead cache writing in service page form', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 1200);
  };

  // Compile related services matching the categories for continuous navigation
  const getRelatedServices = () => {
    return Object.entries(detailsDatabase)
      .filter(([id, data]) => data.categoryGroup === item.categoryGroup && id !== serviceId)
      .slice(0, 4);
  };

  const related = getRelatedServices();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 animate-in fade-in duration-300">
      
      {/* breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-3.5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500 font-semibold">
            <button onClick={onBackToHome} className="hover:text-teal-600 flex items-center gap-1 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="capitalize text-slate-400 font-medium">
              {item.categoryGroup === 'residential' ? 'Residential Plumbing' : item.categoryGroup === 'commercial' ? 'Commercial Services' : 'About northHeat'}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-teal-700 font-bold max-w-[140px] sm:max-w-none truncate">{item.title}</span>
          </div>

          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-teal-600 font-bold text-xs bg-slate-100 hover:bg-slate-200 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
        </div>
      </div>

      {/* Styled Service Page Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-950 to-teal-950 text-white py-12 lg:py-20 overflow-hidden text-left">
        {/* Absolute Background image overlay for a premium feel */}
        {item.image && (
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover mix-blend-overlay" 
              referrerPolicy="no-referrer" 
            />
          </div>
        )}
        {/* Absolute Background lights */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {item.badge && (
              <span className="inline-flex items-center gap-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3 h-3" />
                {item.badge}
              </span>
            )}
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0 text-teal-400">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-teal-400 font-mono block">
                  {item.category}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-0.5">
                  {item.title}
                </h1>
              </div>
            </div>

            <p className="font-sans text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-semibold max-w-2xl">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Extensive details (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-left">
            
            {/* Premium Visual Representation */}
            {item.image && (
              <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[16/6] shadow-md border border-slate-150">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[9px] sm:text-xs">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                    Professional Active Dispatch
                  </span>
                  <span className="bg-slate-905/60 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-wider font-bold text-teal-400 font-mono">
                    Leeds & West Yorkshire Local SEO Coverage
                  </span>
                </div>
              </div>
            )}
            
            {/* Detailed long description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-4 pb-2 border-b border-slate-50">
                Detailed Service Overview
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {item.longDescription}
              </p>

              {/* Service Specs Block (Grid of Price & Duration) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                    <Clock className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Timeframe Guideline</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800">{item.duration}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Pricing Guidelines</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800">{item.priceEstimate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What we provide checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 border-b border-slate-50 pb-2">
                What We Guarantee & Provide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {item.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip layout */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50/50 border border-orange-100 p-6 rounded-3xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-extrabold text-orange-700 font-mono block">Professional Advice</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  {item.tipsForHomeowner}
                </p>
              </div>
            </div>

            {/* Related Services in this group */}
            {related.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 uppercase tracking-wider">
                  Explore Related {getCategoryLabel(item.categoryGroup)} Services:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {related.map(([id, relData]) => (
                    <button
                      key={id}
                      onClick={() => onNavigateService(id)}
                      className="flex justify-between items-center bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 p-4 rounded-2xl w-full text-left transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-teal-600 flex items-center justify-center border border-slate-100 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                          <Flame className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block leading-tight">{relData.title}</span>
                          <span className="text-[10px] text-slate-400 font-semibold font-mono block mt-0.5">{relData.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: High Converting Quote Panel & Sidebars (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Directly Inbuilt Custom Booking Form for this Service */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-4">
                <span className="text-[9px] uppercase tracking-widest font-black text-teal-400 font-mono block">Lead dispatcher</span>
                <h3 className="text-lg sm:text-xl font-display font-extrabold tracking-tight">
                  Pre-Book / Enquire for {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Submit this quick form to reserve your Gas Safe engineer visit or request formal business costings.
                </p>

                {isSuccess ? (
                  <div className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl space-y-2 text-center animate-in zoom-in-95 duration-200">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                    <span className="block text-xs font-bold uppercase tracking-wider">Inquiry Scheduled</span>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Thank you! Our local office team will check calendar shifts and callback shortly.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-[10px] underline hover:text-white mt-1"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Your Full Name *</label>
                      <input 
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="John Parker"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Contact Phone *</label>
                      <input 
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="07700 900077"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-teal-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Email Address</label>
                      <input 
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@harrogatehome.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">System details / notes</label>
                      <textarea 
                        rows={3}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder={`Please provide system age, model numbers or custom requirements for ${item.title}...`}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-teal-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-600/10 active:scale-98"
                    >
                      {isSubmitting ? 'Dispatching Message...' : `Pre-Book ${item.title}`}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Spread the cost promo with Finance Calculator launch */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-3xl p-6 text-left shadow-lg">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Percent className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-display font-extrabold text-lg">
                  Spread the Cost of {item.title} with 0% APR™
                </h4>
                <p className="text-xs text-orange-50 leading-relaxed font-semibold">
                  We offer 12-month interest-free credit and flexible long term finance plans. Zero deposit required on any domestic heating task.
                </p>
                <button
                  onClick={onOpenFinance}
                  className="w-full bg-white hover:bg-orange-50 text-orange-600 font-extrabold py-3 rounded-xl text-xs transition-colors shadow-md text-center block cursor-pointer"
                >
                  Launch Monthly Calculator
                </button>
              </div>
            </div>

            {/* Direct Dial Assistance box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-orange-500">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-mono font-bold">Have Questions?</span>
                <span className="block text-xs text-slate-500 font-bold leading-normal">Speak directly to an engineer in plain-English:</span>
                <a href="tel:01134678910" className="block text-sm font-black font-mono text-slate-800 hover:text-teal-600 mt-1">
                  0113 467 8910
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

// Utility to translate code category names cleanly
function getCategoryLabel(group: 'residential' | 'commercial' | 'about') {
  if (group === 'residential') return 'Residential Plumbing';
  if (group === 'commercial') return 'Commercial Services';
  return 'About northHeat';
}
