import { Service, Testimonial, FAQ, Project } from './types';

export const services: Service[] = [
  {
    id: 'boilers',
    title: 'Boiler Installations & Heating',
    description: 'Expert, energy-efficient combi and system boiler installations with up to a 12-year warranty.',
    longDescription: 'We specialse in installing premium, modern boiler models with market-leading efficiency ratings. Our Gas Safe registered engineers carry out complete system designs, chemical flushes, boiler position relocations, and digital smart thermostat installations (like Nest and Hive) to lower your monthly energy bills.',
    icon: 'Flame',
    image: '/src/assets/images/northheat_boiler_1779998087601.png',
    features: [
      'Gas Safe Registered Installations',
      'Finance plans from £17.50/month',
      'Up to 12-Year manufacturer warranties',
      'Ideal, Worcester Bosch & Worcester accredited installers',
      'Chemical power-flush with every unit replacement'
    ],
    pricing: 'Starting from £1,650 (Fully Fitted)'
  },
  {
    id: 'bathrooms',
    title: 'Luxury Bathroom Fitting',
    description: 'Turnkey luxury bathroom design, plastering, professional plumbing, tiling, and smart lighting.',
    longDescription: 'From minimalist wetrooms to traditional master bathrooms, we provide a complete end-to-end design and installation service. We manage all trade steps including robust waterproofing, premium pipework routing, designer tiling, luxury shower solutions, and state-of-the-art designer fixtures so you have a seamless single point of contact.',
    icon: 'Bath',
    image: '/src/assets/images/northheat_bathroom_1779998065701.png',
    features: [
      'Full custom design 3D CAD visualization',
      'All trades managed (plumbing, tiling, electrics)',
      'High-quality wetroom tanking (100% waterproof guarantee)',
      'Premium designer hardware integrations',
      'Underfloor heating specialists'
    ],
    pricing: 'Custom bespoke quotes available'
  },
  {
    id: 'emergencies',
    title: '24/7 Emergency Repairs',
    description: 'Rapid 1-hour local response for burst pipes, severe gas leaks, water leaks, and heating breakdowns.',
    longDescription: 'We operate a continuous round-the-clock emergency response service across the region. When an emergency strikes, our dedicated dispatch system sends a fully equipped engineer to your door with a stock of core replacement parts. We resolve issues on the spot to safeguard your property and family.',
    icon: 'AlertTriangle',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
    features: [
      'Guaranteed 1-hour fast local dispatch',
      '24 hours a day, 365 days a year active response',
      'No hidden call-out fees or premium rates',
      'Leaking pipework repairs & burst radiator controls',
      'Safety checks & immediate emergency shutdowns'
    ],
    pricing: 'Fixed diagnostic check £79'
  },
  {
    id: 'plumbing',
    title: 'General Plumbing Services',
    description: 'Professional maintenance, tap replacements, drainage clearing, and appliance connections.',
    longDescription: 'No plumbing job is too small for northHeat. We apply the same standard of care and technical precision to general domestic jobs—such as repairing persistent cistern leaks, installing modern high-quality waste pipes, replacing worn-out valves, connecting smart washing machines, and clearing blockages.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    features: [
      'Transparent hourly and flat-rate pricing',
      'Local friendly, tidy, and insured plumbers',
      'Reliability checks and pressure testing included',
      'High-quality replacement brassware & valves',
      'Landlord Gas Safety Check certificates (CP12)'
    ],
    pricing: 'Transparent flat rates from £65/hr'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'David Harrington',
    location: 'Roundhay, Leeds',
    rating: 5,
    date: 'May 12, 2026',
    comment: 'northHeat replaced our outdated boiler with a sleek new Worcester Bosch combi. Our home gets warm instantly, and our bills are already dropping. Amazing service from the initial call to clean up!',
    service: 'Boiler Installation'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    location: 'Horsforth, Leeds',
    rating: 5,
    date: 'April 28, 2026',
    comment: 'The luxury bathroom installation was flawless. The design process was fun, and the tiling is absolutely perfect. They turned an old cramped bathroom into our favorite room in the house!',
    service: 'Bathroom Fitting'
  },
  {
    id: '3',
    name: 'Thomas O\'Connor',
    location: 'Harrogate, Yorkshire',
    rating: 5,
    date: 'May 20, 2026',
    comment: 'Had an absolute nightmare with a burst water pipe late Sunday night. northHeat had an engineer at my door in 35 minutes! He fixed the leak, cleaned up, and was incredibly friendly. Saved the day.',
    service: 'Emergency Repair'
  },
  {
    id: '4',
    name: 'Rebecca Fowler',
    location: 'Moortown, Leeds',
    rating: 5,
    date: 'May 05, 2026',
    comment: 'Quick and clean job repairing a stubborn cistern plumbing leak and replacing three bathroom taps. Fair price, arrived exact on time, and left everything sparkling clean. Strongly recommend!',
    service: 'General Plumbing'
  }
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Modern Condensing Combi Upgrade',
    category: 'boiler',
    image: '/src/assets/images/northheat_boiler_1779998087601.png',
    description: 'Removed an old back-boiler and replaced it with a sleek, A-rated high-efficiency system, updating radiator valves to smart thermostats and completing a full system chemical flush.',
    location: 'Meanwood, Leeds',
    completionDate: 'April 2026'
  },
  {
    id: 'p2',
    title: 'Premium Contemporary Master Bathroom',
    category: 'bathroom',
    image: '/src/assets/images/northheat_bathroom_1779998065701.png',
    description: 'Bespoke design and build featuring a freestanding bathtub, concealed shower mixer, beautiful beige marble tiling with gold profiles, and underfloor tile heating system.',
    location: 'Alwoodley, Leeds',
    completionDate: 'May 2026'
  },
  {
    id: 'p3',
    title: 'Emergency Multi-Leak Remediation',
    category: 'plumbing',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    description: 'Fast response resolution to secure three burst copper water lines in a multi-story home, carrying out clean-up, re-routing core distribution feeds, and restoring service pressure.',
    location: 'Headingley, Leeds',
    completionDate: 'May 2026'
  },
  {
    id: 'p4',
    title: 'Continuous Underfloor Heating Integration',
    category: 'boiler',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    description: 'Bespoke multi-zone hydraulic underfloor heating pipe grid installation with screed optimization, direct temperature zone manifolds, and smart digital thermostats for room-by-room heating controls.',
    location: 'Roundhay, Leeds',
    completionDate: 'May 2026'
  },
  {
    id: 'p5',
    title: 'Full Plant-Room Commercial Upgrade',
    category: 'plumbing',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    description: 'Commercial 150kW boiler cascade setup using modern plate heat exchangers, magnetic sludge separators, and intelligent Building Management System (BMS) controls to optimize multiple commercial blocks.',
    location: 'Chapel Allerton, Leeds',
    completionDate: 'May 2026'
  },
  {
    id: 'p6',
    title: 'Designer Minimalist Walk-in Wet Room',
    category: 'bathroom',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?q=80&w=800&auto=format&fit=crop',
    description: 'Luxury wet-room complete overhaul. Features premium tanked wet-room floor gulley, designer anthracite custom dual shower columns, wall-hung WC, and custom stone washbasin alignments.',
    location: 'Harrogate, Yorkshire',
    completionDate: 'May 2026'
  }
];

export const faqs: FAQ[] = [
  {
    id: 'faq1',
    question: 'Are your engineers Gas Safe registered?',
    answer: 'Yes, absolutely. Every heating engineer at northHeat is fully Gas Safe registered and undergoes continuous safety training. Feel free to ask to inspect our license cards on arrival, or check our details using our direct registration standard.',
    category: 'general'
  },
  {
    id: 'faq2',
    question: 'How quickly can you attend in a plumbing emergency?',
    answer: 'We guarantee a prompt response of within 1 hour for emergencies across Greater Leeds and surrounding West Yorkshire areas. Our emergency lines are open 24 hours a day, 7 days a week, 365 days a year.',
    category: 'emergencies'
  },
  {
    id: 'faq3',
    question: 'What warranties come with a new boiler installation?',
    answer: 'Because of our status as accredited installers for leading premium brands (such as Ideal, Worcester Bosch, and Baxi), we can offer extended manufacturer warranties up to 12 years. This covers all parts and labor, backed directly by the manufacturer.',
    category: 'boilers'
  },
  {
    id: 'faq4',
    question: 'Do you design and manage the entire bathroom fit?',
    answer: 'Yes, we handle 100% of the bathroom installation process! From initial layout planning and ordering premium fixtures, to structural preparation, pipework, plastering, waterproofing (tanking), tile fitting, and final spotlight installation. You have one project manager and zero stress.',
    category: 'bathrooms'
  },
  {
    id: 'faq5',
    question: 'Do you charge a call-out fee?',
    answer: 'No, we do not charge any call-out fees during normal working hours for standard booking visits. For pre-booked inspections, diagnostics, and projects, we offer completely free, no-obligation fixed-price quotes. For 24/7 out-of-hours immediate emergencies, we charge a flat fee of £79 for professional engineering diagnosis.',
    category: 'general'
  },
  {
    id: 'faq6',
    question: 'What areas do you cover in Yorkshire?',
    answer: 'We cover the entirety of Greater Leeds, Harrogate, Wetherby, Horsforth, Pudsey, Morley, Rothwell, Otley, Ilkley, and surrounding West Yorkshire boroughs.',
    category: 'general'
  }
];
