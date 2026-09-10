import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Case Studies',
    defaultColumns: ['title', 'category', 'status', 'displayOrder'],
    preview: (doc) => {
      const slug = (doc?.slug as string) || 'manufacturing-data-platform'
      return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/case-studies/${slug}`
    },
    livePreview: {
      url: ({ data }: { data: Record<string, unknown> }) => {
        const slug = data?.slug || 'manufacturing-data-platform'
        return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/case-studies/${slug}`
      },
    },
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    // Status tabs
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'template',
      type: 'select',
      label: 'Page Layout Template',
      defaultValue: 'classic',
      required: true,
      options: [
        { label: 'Classic Editorial (Default)', value: 'classic' },
        { label: 'Tech Deep Dive (Dark Theme + Code & Architecture)', value: 'tech-deep-dive' },
        { label: 'Visual Showcase (Large Media & Full-Width Banners)', value: 'visual-showcase' },
        { label: 'Executive Brief (Split 2-Column with Key Highlights)', value: 'executive-brief' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Choose visual template layout for this Case Study',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower number = appears first',
      },
    },

    // Core fields
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g. ai-powered-procurement)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'case-study-categories',
      label: 'Category',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        description: 'Tags shown on the card (e.g. Manufacturing · AI)',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'filterCategories',
      type: 'array',
      label: 'Filter Categories',
      admin: {
        description: 'Categories used for filtering on the case studies page',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },

    // Summary fields (shown on card)
    {
      type: 'group',
      name: 'summary',
      label: 'Card Summary',
      fields: [
        { name: 'challenge', type: 'textarea', label: 'Challenge' },
        { name: 'objective', type: 'textarea', label: 'Objective' },
        { name: 'solution', type: 'textarea', label: 'Solution' },
        { name: 'deepTech', type: 'text', label: 'Deep Tech' },
        { name: 'tech', type: 'text', label: 'Technology Stack' },
        { name: 'integration', type: 'text', label: 'Integration' },
        { name: 'outcome', type: 'textarea', label: 'Outcome' },
      ],
    },

    // Detail page fields
    {
      type: 'group',
      name: 'detail',
      label: 'Detail Page Content',
      fields: [
        {
          name: 'shortDescription',
          type: 'textarea',
          label: 'Short Description (meta/intro)',
        },
        {
          name: 'overview',
          type: 'richText',
          label: 'Overview',
        },
        {
          name: 'challenges',
          type: 'array',
          label: 'Challenges',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        {
          name: 'results',
          type: 'array',
          label: 'Key Results / Stats',
          fields: [
            { name: 'stat', type: 'text', required: true, label: 'Stat (e.g. ↓ 40%)' },
            { name: 'label', type: 'text', required: true, label: 'Label' },
          ],
        },
        {
          name: 'solutionSteps',
          type: 'array',
          label: 'Solution Steps',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'challenge', type: 'textarea' },
            { name: 'solution', type: 'textarea' },
            { name: 'outcome', type: 'textarea' },
          ],
        },
        {
          name: 'technologyUsed',
          type: 'text',
          label: 'Technology Used (shown at bottom)',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
        },
      ],
    },

    // Related
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      label: 'Related Case Studies',
    },

    // Client info
    { name: 'client', type: 'text', label: 'Client / Company' },
    { name: 'industry', type: 'text', label: 'Industry' },
    { name: 'projectDate', type: 'date', label: 'Project Date' },

    // SEO
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
        },
      ],
    },
  ],
}
