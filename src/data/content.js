export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Case Studies', href: '/case-studies' },
  {
    label: 'About',
    href: '/about',
    children: [{ label: 'Team', href: '/team' }],
  },
  { label: 'Career', href: '/career' },
  { label: 'Contact', href: '/contact' },
]

export const stats = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 60, suffix: '+', label: 'Happy clients' },
  { value: 8, suffix: '+', label: 'Years building' },
  { value: 98, suffix: '%', label: 'Client retention' },
]

export const services = [
  {
    title: 'Web Development',
    desc: 'Fast, scalable websites and web apps built with modern frameworks, from marketing sites to full-stack platforms.',
    tags: ['React & Next.js', 'WordPress', 'Shopify', 'API & Backend'],
    features: [
      'Custom React & Next.js builds',
      'Headless CMS & WordPress',
      'Shopify storefronts',
      'API design & integrations',
    ],
  },
  {
    title: 'App Development',
    desc: 'Native and cross-platform mobile apps engineered for performance, designed for real people.',
    tags: ['iOS & Android', 'Flutter', 'React Native', 'Product MVPs'],
    features: [
      'Native iOS & Android apps',
      'Flutter cross-platform builds',
      'React Native development',
      'App Store & Play Store launch',
    ],
  },
  {
    title: 'UI/UX Design',
    desc: 'Interfaces that look sharp and feel effortless, research-driven design systems that scale with your product.',
    tags: ['Design Systems', 'Prototyping', 'User Research'],
    features: [
      'User research & personas',
      'Wireframes to hi-fi UI',
      'Design systems & component libraries',
      'Usability testing',
    ],
  },
  {
    title: 'Branding',
    desc: 'Identity systems that make a company memorable: logo, color, type, and voice working as one.',
    tags: ['Identity', 'Brand Strategy', 'Guidelines'],
    features: [
      'Logo & visual identity',
      'Brand strategy & positioning',
      'Style guides',
      'Marketing collateral',
    ],
  },
]

export const process = [
  {
    step: '01',
    title: 'Discover',
    desc: 'We dig into your goals, users, and market to define a clear brief before a single pixel is drawn.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'Wireframes to polished UI. We design in fast, visible iterations so you always see where things stand.',
  },
  {
    step: '03',
    title: 'Develop',
    desc: 'Clean, tested, production-grade code shipped in sprints with regular demos, not a black box.',
  },
  {
    step: '04',
    title: 'Deliver & Scale',
    desc: 'Launch with confidence, then iterate using real usage data to keep growing what works.',
  },
]

export const values = [
  {
    title: 'Ship fast, without cutting corners',
    desc: 'Speed matters, but not at the cost of code quality. We move quickly by keeping teams small and decisions fast, not by skipping the details.',
  },
  {
    title: 'Design and code, one team',
    desc: 'The same people who design your product help build it, so nothing gets lost in translation between a mockup and the real thing.',
  },
  {
    title: 'Real communication',
    desc: "No black-box updates. You'll always know what's shipping, what's next, and what changed, and why.",
  },
  {
    title: 'Built to last',
    desc: 'We write code we would be comfortable maintaining ourselves a year from now, not just code that works on launch day.',
  },
]

export const culture = [
  {
    title: 'Work directly with clients',
    desc: 'No layers between you and the people using what you build. You join client calls, hear the feedback firsthand, and see the impact of your work.',
  },
  {
    title: 'Own projects end-to-end',
    desc: "You won't just be handed tickets. You'll help shape the approach, make real decisions, and see a project through from first sketch to launch.",
  },
  {
    title: 'Learn across web, mobile, and brand',
    desc: 'Our projects span web apps, mobile builds, and branding work, plenty of room to go deep in what you love or grow into something new.',
  },
  {
    title: 'Flexible, remote-friendly',
    desc: 'We care about the work getting done well, not where or exactly when you do it.',
  },
]

export const work = [
  {
    title: 'Sutro BeSpoke',
    category: 'Client Project · Bespoke Fashion',
    image: '/images/work/sutro.jpg',
    url: 'https://sutro.in/',
    desc: "A bespoke tailoring house's e-commerce site, showcasing custom-made office, party, and ceremonial wear built on a tailoring legacy since 1947.",
    tags: ['E-commerce', 'Fashion', 'Client Project'],
  },
  {
    title: 'Pixel Resources',
    category: 'Client Project · Chemical Trading',
    image: '/images/work/pixel-resources.jpg',
    url: 'https://pixelresources.in/',
    desc: 'A corporate site for a Gujarat-based chemical import/export company, presenting their industrial, specialty, and pharmaceutical chemical supply to a global B2B audience.',
    tags: ['Corporate', 'B2B', 'Client Project'],
  },
  {
    title: 'Earth Ortho',
    category: 'Client Project · Medical Devices',
    image: '/images/work/earth-ortho.jpg',
    url: 'https://earthortho.com/',
    desc: 'A global-facing site for an orthopedic implant and surgical instrument manufacturer, presenting their trauma, spinal, and joint reconstruction product lines.',
    tags: ['Healthcare', 'Manufacturing', 'Client Project'],
  },
  {
    title: 'Chatniwala',
    category: 'Self Project · Food & Beverage',
    image: '/images/work/chatniwala.jpg',
    url: 'https://chatniwala.co.in/',
    desc: 'An e-commerce storefront for a Surat-based chutney and condiment brand, selling traditional Indian pastes and sauces pan-India.',
    tags: ['E-commerce', 'Food & Beverage', 'Self Project'],
  },
  {
    title: 'Sakura Pan Asian Cuisine',
    category: 'Restaurant Website · Fine Dining',
    image: '/images/work/sakura-pan-asian.jpg',
    url: 'https://sakurapanasian.in/',
    desc: 'A premium restaurant site for a Vadodara fine-dining destination blending Japanese, Korean, Thai, Chinese, and Indian cuisine in an upscale setting.',
    tags: ['Restaurant', 'Hospitality'],
  },
  {
    title: 'The Growth Consultancy',
    category: 'Self Project · Business Consulting',
    image: '/images/work/the-growth-consultancy.jpg',
    url: 'https://thegrowthconsultancy.in/',
    desc: 'A consultancy site for a growth and digital marketing firm, presenting their branding, web design, and outreach services to prospective clients.',
    tags: ['Consulting', 'Marketing', 'Self Project'],
  },
  {
    title: 'Ryna Juice',
    category: 'Self Project · Beverage Brand',
    image: '/images/work/ryna-juice.jpg',
    url: 'https://rynajuice.com/',
    desc: 'A product site for a cold-pressed juice brand, showcasing sugar-free, farm-sourced juices, sparkling drinks, and aloe vera blends.',
    tags: ['E-commerce', 'FMCG', 'Self Project'],
  },
]

export const clients = [
  { name: 'Sutro BeSpoke', logo: '/images/logos/sutro.png', url: 'https://sutro.in/' },
  { name: 'Pixel Resources', logo: '/images/logos/pixel-resources.png', url: 'https://pixelresources.in/' },
  { name: 'Earth Ortho', logo: '/images/logos/earth-ortho.png', url: 'https://earthortho.com/' },
  { name: 'Chatniwala', logo: '/images/logos/chatniwala.png', url: 'https://chatniwala.co.in/' },
  { name: 'Sakura Pan Asian Cuisine', logo: '/images/logos/sakura-pan-asian.png', url: 'https://sakurapanasian.in/' },
  { name: 'The Growth Consultancy', logo: '/images/logos/the-growth-consultancy.png', url: 'https://thegrowthconsultancy.in/' },
  { name: 'Ryna Juice', logo: '/images/logos/ryna-juice.png', url: 'https://rynajuice.com/' },
]

export const testimonials = [
  {
    quote:
      "Astra Infotech didn't just build what we asked for; they pushed back with better ideas and shipped faster than we expected.",
    name: 'Sherly Sharon',
    role: 'Founder & CEO',
  },
  {
    quote:
      'The design system they built is the best documentation our engineering team has ever worked from. Genuinely great process.',
    name: 'Daniel Morgan',
    role: 'Head of Engineering',
  },
  {
    quote:
      'From branding to a live product in ten weeks. Communication was constant and the quality never dropped.',
    name: 'Olivia Chen',
    role: 'Marketing Director',
  },
]

export const faqs = [
  {
    q: 'What does a typical project timeline look like?',
    a: 'Most engagements run 4–12 weeks depending on scope; a brand refresh can wrap in a few weeks, while a full product build spans several sprints with demos along the way.',
  },
  {
    q: 'Do you work with startups or only established companies?',
    a: 'Both. About half our clients are early-stage teams building an MVP, the rest are established businesses modernizing an existing product or brand.',
  },
  {
    q: 'Can you just handle design, or only development?',
    a: 'Either: engage us for design, development, or both. Many clients start with design and bring us back for the build once it is validated.',
  },
  {
    q: "What's included after launch?",
    a: 'Every project includes a support window post-launch, and we offer ongoing retainers for teams that want continuous iteration.',
  },
]
