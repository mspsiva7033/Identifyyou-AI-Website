import type { CollectionConfig } from 'payload'

export const CaseStudyCategories: CollectionConfig = {
  slug: 'case-study-categories',
  labels: {
    singular: 'Case Study Category',
    plural: 'Case Study Categories',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Case Studies',
    defaultColumns: ['name', 'slug', 'displayOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Category Name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g. manufacturing, fintech)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
