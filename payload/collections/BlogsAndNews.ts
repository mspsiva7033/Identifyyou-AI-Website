import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, isSuperAdmin } from '../../lib/access'

export const BlogsAndNews: CollectionConfig = {
  slug: 'blogs-and-news',
  labels: {
    singular: 'Blog & News Post',
    plural: 'Blogs & News',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    preview: (doc) => {
      const slug = (doc?.slug as string) || ''
      return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blogs-and-news/${slug}`
    },
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isSuperAdmin,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'published',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time (e.g. 6 min read)',
      defaultValue: '5 min read',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL identifier)',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. ai-in-manufacturing-quality-inspection-2026',
      },
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      required: false,
      admin: {
        placeholder: 'e.g. AI Innovations, Deep Tech, Company News',
        description: 'Category name. Categories appear dynamically as filter buttons on the website.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt (Short Summary for card)',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured / Cover Image',
      admin: {
        description: 'Upload cover image. Saved directly to the media folder on VPS.',
      },
    },
    {
      name: 'overview',
      type: 'textarea',
      label: 'Overview / Intro Paragraph',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Article Sections',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Heading',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Section Content',
          required: true,
        },
      ],
    },
    {
      name: 'takeaways',
      type: 'array',
      label: 'Key Takeaways',
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'topics',
      type: 'text',
      label: 'Topics / Keywords',
      required: false,
      admin: {
        placeholder: 'e.g. Computer Vision, Robotics, Edge AI',
        description: 'Keywords/topics separated by · or comma. Topics appear dynamically as filter chips on the website.',
      },
    },
  ],
}
