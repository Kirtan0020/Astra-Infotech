// Bundled fallback shape, used by ContentProvider only if /api/public/site.php
// is unreachable (e.g. API down, first paint before fetch resolves is handled
// separately via `status`). Mirrors the exact shape scripts/generate-seed.mjs
// produces, keyed as an object (pages[slug]) instead of an array to match the
// live API response shape.

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
} from '../data/content.js'

const serviceIconKeys = ['code', 'device-mobile', 'color-swatch', 'sparkles']
const processIconKeys = ['search', 'pencil-alt', 'code', 'trending-up']

const servicesWithIcons = services.map((s, i) => ({ ...s, icon: serviceIconKeys[i] }))
const processWithIcons = processSteps.map((p, i) => ({ ...p, icon: processIconKeys[i] }))

const ctaDefault = {
  heading: "Let's build something great together",
  subtext: "Tell us about your project and we'll reply with next steps within one business day.",
  buttonLabel: 'Get in touch',
  buttonHref: 'mailto:info.astrainfotech@gmail.com',
}

export const fallbackSettings = {
  site_name: 'Astra Infotech',
  site_url: 'https://astrainfotech.net',
  default_og_image: 'https://astrainfotech.net/logo.png',
  email: 'info.astrainfotech@gmail.com',
  phone: '+91 96381 11333',
  phone_href: 'tel:+919638111333',
  location: 'India, working with clients worldwide',
  logo_path: '/logo.png',
  start_project_cta_label: 'Start a project',
  available_badge_label: 'Available for new projects',
  footer_copyright: 'Astra Infotech: Design & Development, done right.',
  social_twitter: '',
  social_linkedin: '',
  social_instagram: '',
  social_github: '',
}

export const fallbackNavLinks = navLinks

export const fallbackFooterLinks = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Career', href: '/career' },
    ],
  },
]

export const fallbackPages = {
  home: {
    slug: 'home',
    path: '/',
    title: 'Home',
    layout: 'stacked',
    meta: {
      title: 'Astra Infotech: Design & Development',
      description:
        'Astra Infotech is a development & design team that partners with founders and teams to turn ideas into fast, beautiful websites, apps, and brands.',
      path: '/',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'orbit',
          badgeLabel: 'Available for new projects',
          heading: 'We design & build\n**digital products**\nthat grow.',
          subtext:
            'Astra Infotech is a development & design team that partners with founders and teams to turn ideas into fast, beautiful websites, apps, and brands.',
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
  services: {
    slug: 'services',
    path: '/services',
    title: 'Services',
    layout: 'normal',
    meta: {
      title: 'Services: Web Development, Branding & Design | Astra Infotech',
      description:
        'Explore our services: web development, branding, and product design. React, WordPress, Shopify, brand identity, UI/UX: everything to launch and grow your digital product.',
      path: '/services',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          fullAura: true,
          eyebrow: 'Our services',
          heading: 'Services built to move **fast**, without breaking things.',
          subtext:
            'From a first prototype to a full-scale platform, we design, build, and ship web, mobile, and brand work under one roof.',
        },
        items: [],
      },
      { type: 'services', data: {}, items: servicesWithIcons },
      { type: 'clients', data: {}, items: clients },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  work: {
    slug: 'work',
    path: '/work',
    title: 'Work',
    layout: 'normal',
    meta: {
      title: 'Our Work: Client Projects & Case Studies | Astra Infotech',
      description:
        "Browse Astra Infotech's portfolio of client projects across web development and design: real work for real businesses, from e-commerce to healthcare.",
      path: '/work',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'stack',
          particleColor: 'bg-fuchsia-400/40',
          eyebrow: 'Selected work',
          heading: "Recent projects we're **proud** of.",
          subtext:
            "A look at the sites and brands we've shipped for clients and our own ventures, from fashion and healthcare to food, hospitality, and consulting.",
        },
        items: [],
      },
      { type: 'work', data: {}, items: work },
      { type: 'clients', data: {}, items: clients },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  about: {
    slug: 'about',
    path: '/about',
    title: 'About',
    layout: 'normal',
    meta: {
      title: 'About Us: Our Story, Mission & Team | Astra Infotech',
      description:
        'Learn about Astra Infotech: our mission, vision, and the team building bold digital products for founders and teams worldwide.',
      path: '/about',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          particleColor: 'bg-blue-400/40',
          eyebrow: 'About us',
          heading: 'A team built around **good work**, not busywork.',
          subtext:
            'Astra Infotech is a development & design team that partners with founders and teams to turn ideas into fast, beautiful websites, apps, and brands. Small team, senior craft, direct communication.',
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
  team: {
    slug: 'team',
    path: '/team',
    title: 'Team',
    layout: 'normal',
    meta: {
      title: 'Our Team: Meet Astra Infotech | Astra Infotech',
      description:
        'Meet the people behind Astra Infotech: the designers and developers building bold digital products for founders and teams worldwide.',
      path: '/team',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'none',
          particleColor: 'bg-blue-400/40',
          eyebrow: 'Our team',
          heading: 'Coming **soon**.',
          subtext:
            "We're putting together a proper introduction to the people behind Astra Infotech. Check back soon. In the meantime, learn more about us on our About page.",
          primaryCtaLabel: 'Back to About',
          primaryCtaHref: '/about',
        },
        items: [],
      },
    ],
  },
  career: {
    slug: 'career',
    path: '/career',
    title: 'Career',
    layout: 'normal',
    meta: {
      title: 'Careers: Join Astra Infotech',
      description:
        "We're always looking for talented designers and developers. Explore open roles at Astra Infotech and see what it's like to build with us.",
      path: '/career',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          particleColor: 'bg-violet-400/40',
          eyebrow: 'Careers',
          heading: 'Build great work **with us**.',
          subtext:
            "We're a small team that cares about craft over headcount. If you'd rather do great work for real clients than sit in meetings about work, you'll probably like it here.",
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
            "If you're a developer or designer who'd fit the culture above, send us a note with your portfolio or GitHub. We read every message.",
          buttonLabel: 'Send your application',
          buttonHref: 'mailto:info.astrainfotech@gmail.com?subject=Application%20%E2%80%94%20Astra%20Infotech',
        },
        items: [],
      },
    ],
  },
  contact: {
    slug: 'contact',
    path: '/contact',
    title: 'Contact',
    layout: 'normal',
    meta: {
      title: 'Contact Us: Start a Project | Astra Infotech',
      description:
        "Get in touch with Astra Infotech to start your next project. Tell us about your idea and we'll reply with next steps within one business day.",
      path: '/contact',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Contact',
          heading: "Let's talk about **your project**.",
          subtext: "Tell us a bit about what you're building and we'll reply with next steps within one business day.",
        },
        items: [],
      },
    ],
  },
  'case-studies': {
    slug: 'case-studies',
    path: '/case-studies',
    title: 'Case Studies',
    layout: 'normal',
    meta: {
      title: 'Case Studies: Real Client Projects | Astra Infotech',
      description:
        "Deeper dives into how Astra Infotech has approached specific client projects, from fashion e-commerce to B2B chemical trading and medical devices.",
      path: '/case-studies',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Studies',
          heading: 'A closer look at **real** projects.',
          subtext:
            "Deeper dives into how we've approached specific client challenges, from fashion e-commerce to B2B chemical trading and medical devices.",
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<div class="case-study-list">' +
            '<a class="case-study-card" href="/case-studies/sutro-bespoke">' +
            '<img src="/images/work/sutro.jpg" alt="Sutro BeSpoke" loading="lazy" />' +
            '<span><span class="case-study-card-title">Sutro BeSpoke</span>' +
            '<span class="case-study-card-category">Bespoke Fashion</span></span>' +
            '</a>' +
            '<a class="case-study-card" href="/case-studies/pixel-resources">' +
            '<img src="/images/work/pixel-resources.jpg" alt="Pixel Resources" loading="lazy" />' +
            '<span><span class="case-study-card-title">Pixel Resources</span>' +
            '<span class="case-study-card-category">Chemical Trading</span></span>' +
            '</a>' +
            '<a class="case-study-card" href="/case-studies/earth-ortho">' +
            '<img src="/images/work/earth-ortho.jpg" alt="Earth Ortho" loading="lazy" />' +
            '<span><span class="case-study-card-title">Earth Ortho</span>' +
            '<span class="case-study-card-category">Medical Devices</span></span>' +
            '</a>' +
            '</div>',
        },
        items: [],
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
  'case-study-sutro-bespoke': {
    slug: 'case-study-sutro-bespoke',
    path: '/case-studies/sutro-bespoke',
    title: 'Sutro BeSpoke: Case Study',
    layout: 'normal',
    meta: {
      title: 'Sutro BeSpoke Case Study: Bespoke Fashion E-commerce | Astra Infotech',
      description:
        "How Astra Infotech built an e-commerce storefront for Sutro BeSpoke, a bespoke tailoring house with a legacy since 1947.",
      path: '/case-studies/sutro-bespoke',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Study',
          heading: 'Sutro BeSpoke: **Tailoring**, translated online.',
          subtext: 'An e-commerce site for a bespoke tailoring house built on a legacy since 1947.',
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<h3>The brief</h3>' +
            '<p>Sutro BeSpoke needed an online storefront that could carry the weight of a decades-old tailoring reputation (built on custom-made office wear, party wear, and ceremonial garments) without feeling like a generic template store.</p>' +
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
  'case-study-pixel-resources': {
    slug: 'case-study-pixel-resources',
    path: '/case-studies/pixel-resources',
    title: 'Pixel Resources: Case Study',
    layout: 'normal',
    meta: {
      title: 'Pixel Resources Case Study: B2B Chemical Trading Website | Astra Infotech',
      description:
        'How Astra Infotech built a corporate B2B site for Pixel Resources, a Gujarat-based chemical import/export company.',
      path: '/case-studies/pixel-resources',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Study',
          heading: 'Pixel Resources: **B2B trust**, at global scale.',
          subtext: 'A corporate site for a Gujarat-based chemical import/export company.',
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<h3>The brief</h3>' +
            '<p>Pixel Resources trades industrial, specialty, and pharmaceutical chemicals with buyers across the globe. Their site needed to read as credible and technical to a B2B, procurement-driven audience, not consumer-facing at all.</p>' +
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
  'case-study-earth-ortho': {
    slug: 'case-study-earth-ortho',
    path: '/case-studies/earth-ortho',
    title: 'Earth Ortho: Case Study',
    layout: 'normal',
    meta: {
      title: 'Earth Ortho Case Study: Medical Device Manufacturer Website | Astra Infotech',
      description:
        'How Astra Infotech built a global-facing site for Earth Ortho, an orthopedic implant and surgical instrument manufacturer.',
      path: '/case-studies/earth-ortho',
    },
    sections: [
      {
        type: 'hero',
        data: {
          style: 'blob',
          eyebrow: 'Case Study',
          heading: 'Earth Ortho: Precision for a **precision** industry.',
          subtext: 'A global-facing site for an orthopedic implant and surgical instrument manufacturer.',
        },
        items: [],
      },
      {
        type: 'richtext',
        data: {
          html:
            '<h3>The brief</h3>' +
            '<p>Earth Ortho manufactures trauma, spinal, and joint reconstruction implants and instruments, a regulated, safety-critical industry where the website has to communicate precision and trust to surgeons and distributors, not just look good.</p>' +
            '<h3>What we built</h3>' +
            '<p>A structured, product-line-driven site covering their trauma, spinal, and joint reconstruction ranges, built to present technical product information clearly to a medical and distributor audience.</p>' +
            '<h3>The result</h3>' +
            '<p>A site Earth Ortho can point international distributors and hospital partners to with confidence, one that matches the seriousness of the medical devices it represents.</p>' +
            '<p><a href="https://earthortho.com/" target="_blank" rel="noopener noreferrer">Visit the live site →</a></p>',
        },
        items: [],
      },
      { type: 'cta', data: ctaDefault, items: [] },
    ],
  },
}
