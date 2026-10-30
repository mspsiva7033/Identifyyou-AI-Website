import type { CollectionConfig } from 'payload'
import {
  canCreateContent,
  canUpdateContent,
  canDeleteContent,
} from '../../lib/access'
import { logAuditEvent } from '../../lib/audit'

export const BlogsAndNews: CollectionConfig = {
  slug: 'blogs-and-news',
  labels: {
    singular: 'Blog & News Post',
    plural: 'Blogs & News',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'status', 'createdBy', 'updatedBy', 'publishedAt'],
    preview: (doc) => {
      const slug = (doc?.slug as string) || ''
      return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blogs-and-news/${slug}`
    },
  },
  access: {
    read: () => true,
    create: canCreateContent,
    update: canUpdateContent,
    delete: canDeleteContent,
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
      defaultValue: 'draft',
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
      name: 'author',
      type: 'text',
      label: 'Credited Author',
      defaultValue: 'IdentifYou Team',
      admin: {
        position: 'sidebar',
        description: 'The person credited publicly for writing this content',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Record Creator',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Set automatically by server-side authentication',
      },
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Last Edited By',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Updated automatically on every modification',
      },
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'publishedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Published By',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Account that approved publication',
      },
      access: {
        create: () => false,
        update: () => false,
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
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        const userId = req?.user?.id
        if (operation === 'create') {
          if (userId) {
            data.createdBy = userId
            data.updatedBy = userId
          }
          if (data.status === 'published' && userId) {
            data.publishedBy = userId
            if (!data.publishedAt) data.publishedAt = new Date().toISOString()
          }
        } else if (operation === 'update') {
          if (userId) {
            data.updatedBy = userId
          }
          // Preserve immutable original creator
          if (originalDoc?.createdBy) {
            data.createdBy = typeof originalDoc.createdBy === 'object' ? originalDoc.createdBy.id : originalDoc.createdBy
          }
          // Track publisher when transitioning to published
          if (data.status === 'published' && originalDoc?.status !== 'published' && userId) {
            data.publishedBy = userId
            if (!data.publishedAt) data.publishedAt = new Date().toISOString()
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation, previousDoc }) => {
        const isPublishTransition = previousDoc?.status !== 'published' && doc.status === 'published'
        const isUnpublishTransition = previousDoc?.status === 'published' && doc.status !== 'published'

        let action: 'create' | 'update' | 'publish' | 'unpublish' = operation === 'create' ? 'create' : 'update'
        if (isPublishTransition) {
          action = 'publish'
        } else if (isUnpublishTransition) {
          action = 'unpublish'
        }

        await logAuditEvent({
          payload: req.payload,
          actor: req.user,
          action,
          resourceType: 'blogs-and-news',
          resourceId: doc.id,
          resourceTitle: doc.title || doc.slug,
          outcome: 'success',
          details: {
            title: doc.title,
            slug: doc.slug,
            status: doc.status,
            category: doc.category,
            author: doc.author,
            createdBy: typeof doc.createdBy === 'object' ? doc.createdBy?.id : doc.createdBy,
            updatedBy: typeof doc.updatedBy === 'object' ? doc.updatedBy?.id : doc.updatedBy,
          },
        })
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await logAuditEvent({
          payload: req.payload,
          actor: req.user,
          action: 'delete',
          resourceType: 'blogs-and-news',
          resourceId: doc.id,
          resourceTitle: doc.title || doc.slug,
          outcome: 'success',
          details: {
            deletedTitle: doc.title,
            deletedSlug: doc.slug,
          },
        })
      },
    ],
  },
}
