import type { GlobalConfig } from 'payload'

export const HomePageData: GlobalConfig = {
  slug: 'home-page-data',
  label: 'Home Page Data',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Hero
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Business First. Technology That Delivers.' },
        { name: 'headline1', type: 'text', defaultValue: 'Deep Tech.' },
        { name: 'headline2', type: 'text', defaultValue: 'Built Around Business.' },
        { name: 'subheading', type: 'text', defaultValue: 'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses.' },
        { name: 'description', type: 'textarea', defaultValue: 'IdentifYou engineers AI-powered, connected and intelligent solutions using Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.' },
        { name: 'primaryButtonLabel', type: 'text', defaultValue: 'Explore Our Deep Tech' },
        { name: 'primaryButtonHref', type: 'text', defaultValue: '/deep-tech' },
        { name: 'secondaryButtonLabel', type: 'text', defaultValue: 'Talk to an Expert' },
        { name: 'secondaryButtonHref', type: 'text', defaultValue: '/contact' },
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Background Image' },
      ],
    },

    // Intro statement
    {
      name: 'introStatement',
      type: 'textarea',
      label: 'Intro Statement',
      defaultValue: "We don't start with technology. We start with the business problem, operational challenge or growth opportunity — with deep expertise in Manufacturing and Integrated Supply Chain, and extensive experience across Financial Services, Investment, FinTech and Healthcare — and engineer the right AI-powered solution around it.",
    },

    // AI That Sees/Thinks/Acts
    {
      name: 'aiSeesThinkActs',
      type: 'array',
      label: 'AI That Sees / Thinks / Acts',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'flow', type: 'text', required: true, label: 'Flow Description' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imagePlaceholder', type: 'text' },
      ],
    },

    // Business First Steps
    {
      name: 'businessFirstSteps',
      type: 'array',
      label: 'Business First Approach Steps',
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
      ],
    },

    // Stats
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics Banner',
      fields: [
        { name: 'stat', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },

    // Testimonials
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'company', type: 'text', required: true },
      ],
    },

    // Partners
    {
      name: 'partners',
      type: 'array',
      label: 'Technology Partners',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },

    // Why IdentifYou
    {
      name: 'differentiators',
      type: 'array',
      label: 'Why IdentifYou (Differentiators)',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },

    // Insight categories
    {
      name: 'insightCategories',
      type: 'array',
      label: 'Industry Insights Categories',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'tag', type: 'text', required: true }],
        },
      ],
    },

    // Lead CTAs
    {
      name: 'leadCTAs',
      type: 'array',
      label: 'Lead Generation CTAs',
      fields: [
        { name: 'tag', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', defaultValue: '/contact' },
      ],
    },

    // Main CTA block
    {
      type: 'group',
      name: 'mainCTA',
      label: 'Main CTA Block',
      fields: [
        { name: 'headline', type: 'text', defaultValue: "Let's Solve a Business Problem" },
        { name: 'description', type: 'textarea', defaultValue: "Tell us what you're trying to improve. We'll help identify where Deep Tech can create measurable business value." },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Talk to a Deep Tech Expert' },
        { name: 'buttonHref', type: 'text', defaultValue: '/contact' },
      ],
    },
  ],
}
