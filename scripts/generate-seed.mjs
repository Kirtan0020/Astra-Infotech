// One-time transform: src/data/content.js (+ hardcoded JSX copy that has no
// content.js home today) -> db/seed-data.json, consumed by api/scripts/seed.php.
// Run with: node scripts/generate-seed.mjs

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  navLinks,
  stats,
  services,
  process as processSteps,
  values,
  culture,
  work,
  clients,
  testimonials,
  faqs,
} from '../src/data/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const serviceIconKeys = ['code', 'device-mobile', 'color-swatch', 'sparkles']
const processIconKeys = ['search', 'pencil-alt', 'code', 'trending-up']

const servicesWithIcons = services.map((s, i) => ({ ...s, icon: serviceIconKeys[i] }))
const processWithIcons = processSteps.map((p, i) => ({ ...p, icon: processIconKeys[i] }))

const ctaDefault = {
  heading: "Let's build something great together",
  subtext: "Tell us about your project — we'll reply with next steps within one business day.",
  buttonLabel: 'Get in touch',
  buttonHref: 'mailto:info.astrainfotech@gmail.com',
}

const settings = {
  site_name: 'Astra Infotech',
  site_url: 'https://astrainfotech.net',
  default_og_image: 'https://astrainfotech.net/logo.png',
  email: 'info.astrainfotech@gmail.com',
  phone: '+91 96381 11333',
  phone_href: 'tel:+919638111333',
  location: 'India — working with clients worldwide',
  logo_path: '/logo.png',
  start_project_cta_label: 'Start a project',
  available_badge_label: 'Available for new projects',
  footer_copyright: 'Astra Infotech — Design & Development, done right.',
  social_twitter: 'https://x.com/Astra_Infotech',
  social_linkedin: '',
  social_instagram: 'https://www.instagram.com/astra_infotech',
  social_facebook: '',
  social_github: '',
}

// content.js's navLinks already matches the { label, href, children? } shape
// the seed importer expects for the primary menu.
const primaryNav = navLinks

const footerNav = [
  {
    group_label: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
    ],
  },
  {
    group_label: 'Explore',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Career', href: '/career' },
    ],
  },
]

// Heading convention: `**text**` marks the brand-gradient-highlighted substring,
// resolved by the frontend's HeroSection renderer (Phase 4/7).
const pages = [
  {
    slug: 'home',
    path: '/',
    title: 'Home',
    meta_title: 'Astra Infotech — Design & Development Studio',
    meta_description:
      'Astra Infotech is a development & design studio — we partner with founders and teams to turn ideas into fast, beautiful websites, apps, and brands.',
    layout: 'stacked',
    is_system: true,
    sort_order: 0,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'orbit',
          badgeLabel: 'Available for new projects',
          heading: 'We design & build\n**digital products**\nthat grow.',
          subtext:
            'Astra Infotech is a development & design studio — we partner with founders and teams to turn ideas into fast, beautiful websites, apps, and brands.',
          primaryCtaLabel: 'Start a project',
          primaryCtaHref: '/contact',
          secondaryCtaLabel: 'View our work',
          secondaryCtaHref: '#work',
        },
        items: [],
      },
      { type: 'stats', data: {}, items: stats },
      {
        type: 'services',
        data: {
          eyebrow: 'What we do',
          heading: 'Everything you need to launch and scale',
          viewAllLabel: 'View all services',
          viewAllHref: '/services',
        },
        items: servicesWithIcons,
      },
      {
        type: 'process',
        data: { eyebrow: 'How we work', heading: 'A process built for clarity' },
        items: processWithIcons,
      },
      {
        type: 'work',
        data: {
          eyebrow: 'Selected work',
          heading: "Recent projects we're proud of",
          viewAllLabel: 'View all work',
          viewAllHref: '/work',
        },
        items: work,
      },
      {
        type: 'testimonials',
        data: { eyebrow: 'Testimonials', heading: 'Trusted by teams who ship' },
        items: testimonials,
      },
      {
        type: 'faq',
        data: {
          eyebrow: 'FAQ',
          heading: 'Answers before you ask',
          subtext: "Can't find what you're looking for? Reach out and we'll get back to you within a day.",
        },
        items: faqs,
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'services',
    path: '/services',
    title: 'Services',
    meta_title: 'Services — Web Development, Branding & Design | Astra Infotech',
    meta_description:
      'Explore our services: web development, branding, and product design. React, WordPress, Shopify, brand identity, UI/UX — everything to launch and grow your digital product.',
    layout: 'normal',
    is_system: true,
    sort_order: 1,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          fullAura: true,
          eyebrow: 'Our services',
          heading: 'Services built to move **fast**, without breaking things.',
          subtext:
            'From a first prototype to a full-scale platform — we design, build, and ship web, mobile, and brand work under one roof.',
        },
        items: [],
      },
      { type: 'services', data: {}, items: servicesWithIcons },
      { type: 'clients', data: {}, items: clients },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'work',
    path: '/work',
    title: 'Work',
    meta_title: 'Our Work — Client Projects & Case Studies | Astra Infotech',
    meta_description:
      "Browse Astra Infotech's portfolio of client projects across web development and design — real work for real businesses, from e-commerce to healthcare.",
    layout: 'normal',
    is_system: true,
    sort_order: 2,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'stack',
          particleColor: 'bg-fuchsia-400/40',
          eyebrow: 'Selected work',
          heading: "Recent projects we're **proud** of.",
          subtext:
            "A look at the sites and brands we've shipped for clients and our own ventures — from fashion and healthcare to food, hospitality, and consulting.",
        },
        items: [],
      },
      { type: 'work', data: {}, items: work },
      { type: 'clients', data: {}, items: clients },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'about',
    path: '/about',
    title: 'About',
    meta_title: 'About Us — Our Story, Mission & Team | Astra Infotech',
    meta_description:
      'Learn about Astra Infotech: our mission, vision, and the team behind the studio building bold digital products for founders and teams worldwide.',
    layout: 'normal',
    is_system: true,
    sort_order: 3,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          particleColor: 'bg-blue-400/40',
          eyebrow: 'About us',
          heading: 'A studio built around **good work**, not busywork.',
          subtext:
            'Astra Infotech is a development & design studio — we partner with founders and teams to turn ideas into fast, beautiful websites, apps, and brands. Small team, senior craft, direct communication.',
        },
        items: [],
      },
      {
        type: 'team',
        data: {},
        items: [{ name: 'Kirtan Prajapati', role: 'CEO, Astra Infotech', photo: '/images/team/ceo.png' }],
      },
      { type: 'stats', data: { bordered: true }, items: stats },
      {
        type: 'values',
        data: { eyebrow: 'How we think', heading: 'What we optimize for' },
        items: values,
      },
      { type: 'clients', data: {}, items: clients },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'team',
    path: '/team',
    title: 'Team',
    meta_title: 'Our Team — Meet Astra Infotech | Astra Infotech',
    meta_description:
      'Meet the people behind Astra Infotech — the designers and developers building bold digital products for founders and teams worldwide.',
    layout: 'normal',
    is_system: true,
    sort_order: 4,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'none',
          particleColor: 'bg-blue-400/40',
          eyebrow: 'Our team',
          heading: 'Coming **soon**.',
          subtext:
            "We're putting together a proper introduction to the people behind Astra Infotech. Check back soon — in the meantime, learn more about the studio on our About page.",
          primaryCtaLabel: 'Back to About',
          primaryCtaHref: '/about',
        },
        items: [],
      },
    ],
  },
  {
    slug: 'career',
    path: '/career',
    title: 'Career',
    meta_title: 'Careers — Join Astra Infotech',
    meta_description:
      "We're always looking for talented designers and developers. Explore open roles at Astra Infotech and see what it's like to build with us.",
    layout: 'normal',
    is_system: true,
    sort_order: 5,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          particleColor: 'bg-violet-400/40',
          eyebrow: 'Careers',
          heading: 'Build great work **with us**.',
          subtext:
            "We're a small studio that cares about craft over headcount. If you'd rather do great work for real clients than sit in meetings about work, you'll probably like it here.",
        },
        items: [],
      },
      {
        type: 'values',
        data: { eyebrow: 'Why here', heading: "What it's like to work with us", compact: true },
        items: culture,
      },
      { type: 'clients', data: {}, items: clients },
      {
        type: 'cta',
        data: {
          variant: 'card',
          eyebrow: 'Open roles',
          heading: "We don't always have a role listed, but we're always glad to hear from good people.",
          subtext:
            "If you're a developer or designer who'd fit the culture above, send us a note with your portfolio or GitHub — we read every message.",
          buttonLabel: 'Send your application',
          buttonHref: 'mailto:info.astrainfotech@gmail.com?subject=Application%20%E2%80%94%20Astra%20Infotech',
        },
        items: [],
      },
    ],
  },
  {
    slug: 'contact',
    path: '/contact',
    title: 'Contact',
    meta_title: 'Contact Us — Start a Project | Astra Infotech',
    meta_description:
      "Get in touch with Astra Infotech to start your next project. Tell us about your idea and we'll reply with next steps within one business day.",
    layout: 'normal',
    is_system: true,
    sort_order: 6,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Contact',
          heading: "Let's talk about **your project**.",
          subtext: "Tell us a bit about what you're building — we'll reply with next steps within one business day.",
        },
        items: [],
      },
    ],
  },
  {
    slug: 'case-studies',
    path: '/case-studies',
    title: 'Case Studies',
    meta_title: 'Case Studies — Real Client Projects | Astra Infotech',
    meta_description:
      "Deeper dives into how Astra Infotech has approached specific client projects — from fashion e-commerce to B2B chemical trading and medical devices.",
    layout: 'normal',
    is_system: false,
    sort_order: 7,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Studies',
          heading: 'A closer look at **real** projects.',
          subtext:
            "Deeper dives into how we've approached specific client challenges — from fashion e-commerce to B2B chemical trading and medical devices.",
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<ul>' +
            '<li><a href="/case-studies/sutro-bespoke">Sutro BeSpoke — Bespoke Fashion</a></li>' +
            '<li><a href="/case-studies/pixel-resources">Pixel Resources — Chemical Trading</a></li>' +
            '<li><a href="/case-studies/earth-ortho">Earth Ortho — Medical Devices</a></li>' +
            '</ul>',
        },
        items: [],
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'case-study-sutro-bespoke',
    path: '/case-studies/sutro-bespoke',
    title: 'Sutro BeSpoke — Case Study',
    meta_title: 'Sutro BeSpoke Case Study — Bespoke Fashion E-commerce | Astra Infotech',
    meta_description:
      "How Astra Infotech built an e-commerce storefront for Sutro BeSpoke, a bespoke tailoring house with a legacy since 1947.",
    layout: 'normal',
    is_system: false,
    sort_order: 8,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Study',
          heading: 'Sutro BeSpoke — **Tailoring**, translated online.',
          subtext: 'An e-commerce site for a bespoke tailoring house built on a legacy since 1947.',
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<h3>The brief</h3>' +
            '<p>Sutro BeSpoke needed an online storefront that could carry the weight of a decades-old tailoring reputation — one built on custom-made office wear, party wear, and ceremonial garments — without feeling like a generic template store.</p>' +
            '<h3>What we built</h3>' +
            '<p>We designed and developed a fashion-forward e-commerce experience: large product photography, a clean catalog structure for office, party, and ceremonial categories, and a checkout flow built for a bespoke, made-to-order buying process rather than off-the-shelf retail.</p>' +
            '<h3>The result</h3>' +
            '<p>A site that reads as premium as the tailoring itself, giving Sutro a real digital storefront for a business that had, until then, run largely on referrals and in-person visits.</p>' +
            '<p><a href="https://sutro.in/" target="_blank" rel="noopener noreferrer">Visit the live site →</a></p>',
        },
        items: [],
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'case-study-pixel-resources',
    path: '/case-studies/pixel-resources',
    title: 'Pixel Resources — Case Study',
    meta_title: 'Pixel Resources Case Study — B2B Chemical Trading Website | Astra Infotech',
    meta_description:
      'How Astra Infotech built a corporate B2B site for Pixel Resources, a Gujarat-based chemical import/export company.',
    layout: 'normal',
    is_system: false,
    sort_order: 9,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Study',
          heading: 'Pixel Resources — **B2B trust**, at global scale.',
          subtext: 'A corporate site for a Gujarat-based chemical import/export company.',
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<h3>The brief</h3>' +
            '<p>Pixel Resources trades industrial, specialty, and pharmaceutical chemicals with buyers across the globe. Their site needed to read as credible and technical to a B2B, procurement-driven audience — not consumer-facing at all.</p>' +
            '<h3>What we built</h3>' +
            '<p>A corporate site structured around their product categories and certifications, with clear company information, product specification pages, and enquiry flows suited to how chemical buyers actually evaluate suppliers.</p>' +
            '<h3>The result</h3>' +
            '<p>A professional web presence that matches the scale of their operations and gives international buyers a credible first touchpoint before a sales conversation even starts.</p>' +
            '<p><a href="https://pixelresources.in/" target="_blank" rel="noopener noreferrer">Visit the live site →</a></p>',
        },
        items: [],
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  {
    slug: 'case-study-earth-ortho',
    path: '/case-studies/earth-ortho',
    title: 'Earth Ortho — Case Study',
    meta_title: 'Earth Ortho Case Study — Medical Device Manufacturer Website | Astra Infotech',
    meta_description:
      'How Astra Infotech built a global-facing site for Earth Ortho, an orthopedic implant and surgical instrument manufacturer.',
    layout: 'normal',
    is_system: false,
    sort_order: 10,
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Study',
          heading: 'Earth Ortho — Precision for a **precision** industry.',
          subtext: 'A global-facing site for an orthopedic implant and surgical instrument manufacturer.',
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<h3>The brief</h3>' +
            '<p>Earth Ortho manufactures trauma, spinal, and joint reconstruction implants and instruments — a regulated, safety-critical industry where the website has to communicate precision and trust to surgeons and distributors, not just look good.</p>' +
            '<h3>What we built</h3>' +
            '<p>A structured, product-line-driven site covering their trauma, spinal, and joint reconstruction ranges, built to present technical product information clearly to a medical and distributor audience.</p>' +
            '<h3>The result</h3>' +
            '<p>A site Earth Ortho can point international distributors and hospital partners to with confidence — one that matches the seriousness of the medical devices it represents.</p>' +
            '<p><a href="https://earthortho.com/" target="_blank" rel="noopener noreferrer">Visit the live site →</a></p>',
        },
        items: [],
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
]

// Registered into the `media` table so they show up in the admin media
// library from day one, pointing at their existing public/ paths.
const media = [
  ...work.map((w) => ({ path: w.image, alt: w.title })),
  ...clients.map((c) => ({ path: c.logo, alt: `${c.name} logo` })),
  { path: '/images/team/ceo.png', alt: 'Kirtan Prajapati' },
  { path: '/logo.png', alt: 'Astra Infotech logo' },
]

const seed = { settings, primaryNav, footerNav, pages, media }

const outPath = resolve(__dirname, '../db/seed-data.json')
writeFileSync(outPath, JSON.stringify(seed, null, 2))
console.log(`Wrote ${outPath}`)
console.log(`Pages: ${pages.length}, total sections: ${pages.reduce((n, p) => n + p.sections.length, 0)}`)
