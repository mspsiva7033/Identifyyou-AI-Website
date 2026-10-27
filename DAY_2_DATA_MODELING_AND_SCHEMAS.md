# Day 2: Data Modeling, Schemas & Content Architecture

> **Project**: IdentifYou Web Platform (Next.js 15+ & Payload CMS 3.x)  
> **Course**: Full-Stack Architecture & Development Mastery  
> **Session**: Day 2 of 7 (Approx. 6–7 hours with hands-on lab)  

---

## 🎯 Day 2 Objectives

By the end of today's session, every student will be able to:
1. Master the distinction between **Collections** (multi-record entities) and **Globals** (single-state configurations).
2. Understand how Payload schema definitions map to PostgreSQL tables under the hood.
3. Master all essential Payload field types: Primitives, Groups, Arrays, Relationships, Uploads, and Lexical Rich Text.
4. Dissect IdentifYou's 8 core Collections and 4 Globals.
5. Understand the **Relationship Depth Pattern** (`number | PopulatedObject`) and how it ensures type safety in `payload-types.ts`.
6. Implement lifecycle hooks (`beforeValidate`, `beforeChange`, `afterChange`) for validation and automated business logic.
7. Complete hands-on schema extension exercises and observe real-time TypeScript regeneration.

---

## 🧩 1. The Core Mental Model: Collections vs. Globals

In Payload CMS 3.x, data models are divided into two fundamental primitives:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PAYLOAD CONTENT ARCHITECTURE                    │
├───────────────────────────────────┬────────────────────────────────────┤
│           COLLECTIONS             │              GLOBALS               │
│      (Many Documents / Rows)      │       (Single Document / Row)      │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Case Studies                    │ • Header Navigation                │
│ • Blogs & News Posts              │ • Footer & Social Links            │
│ • Case Study Categories           │ • Site SEO Settings                │
│ • Media (Images / Uploads)        │ • Home Page Hero & Copy Data       │
│ • Contact Submissions (Leads)     │                                    │
│ • Leadership Team Bios            │                                    │
│ • Deep Tech Capabilities          │                                    │
│ • Manufacturing Solutions         │                                    │
├───────────────────────────────────┼────────────────────────────────────┤
│ Analogy: A SQL table with rows    │ Analogy: A single config row or    │
│ Example: SELECT * FROM case_studies│ JSON document with fixed keys      │
└───────────────────────────────────┴────────────────────────────────────┘
```

### How They Map to PostgreSQL:
* **Collections**: Payload creates a table named after the collection slug (e.g. `"case_studies"` or `"blogs_and_news"`). Every entry is a distinct row with an auto-incrementing `id`, `created_at`, and `updated_at`.
* **Globals**: Payload creates a table named `payload_globals` or dedicated global tables storing exactly one active revision representing the singleton state.

---

## 🏗️ 2. Anatomy of a Payload Collection

Every collection file exports a `CollectionConfig` object conforming to:

```typescript
import type { CollectionConfig } from 'payload'

export const ExampleCollection: CollectionConfig = {
  slug: 'example-slug',           // Database table & API endpoint identifier
  labels: {
    singular: 'Example Item',
    plural: 'Example Items',
  },
  admin: {
    useAsTitle: 'title',          // Document title in admin list view
    group: 'Content',             // Sidebar grouping in admin navigation
    defaultColumns: ['title', 'status', 'createdAt'],
    preview: (doc) => `https://identifyyou.ai/example/${doc?.slug}`,
  },
  access: {
    read: () => true,             // Public read access
    create: ({ req: { user } }) => Boolean(user), // Authenticated only
  },
  versions: {
    drafts: true,                 // Enables Draft vs. Published states
  },
  fields: [
    // Field definitions go here...
  ],
  hooks: {
    // Lifecycle hooks go here...
  },
}
```

---

## 🗃️ 3. Field Types Mastery in IdentifYou

Payload provides a rich type system. Here is how they are used across this codebase:

### 1. Primitive Fields
* **`text`**: Single-line string (e.g. `title`, `slug`, `tagline`).
* **`textarea`**: Multi-line plain text without formatting (e.g. `excerpt`, `challenge`, `outcome`).
* **`number`**: Numeric values (e.g. `displayOrder` where `0` appears first).
* **`date`**: Timestamp picker (e.g. `publishedAt` on blog posts).
* **`select`**: Dropdown with predefined key-value options (e.g. `status: ['draft', 'published']`).
* **`json`**: Unstructured or custom JSON payloads (e.g. `comparisonTable` for DOCX imports).

### 2. Layout & Organization Fields
* **`group`**: Bundles related fields under a nested JSON object without creating a separate database table.
  ```typescript
  {
    type: 'group',
    name: 'summary',
    label: 'Card Summary',
    fields: [
      { name: 'challenge', type: 'textarea' },
      { name: 'solution', type: 'textarea' },
      { name: 'outcome', type: 'textarea' },
    ],
  }
  ```
  *In TypeScript, this maps to: `summary: { challenge?: string; solution?: string; outcome?: string }`.*

* **`array`**: Repeating list of sub-fields. In PostgreSQL, Payload creates a separate child relation table (e.g. `"case_studies_tags"`):
  ```typescript
  {
    name: 'results',
    type: 'array',
    label: 'Key Results / Stats',
    fields: [
      { name: 'stat', type: 'text', label: 'Stat (e.g. ↓ 40%)' },
      { name: 'label', type: 'text', label: 'Metric Description' },
    ],
  }
  ```

### 3. Relationship Fields
Relationships connect documents across collections:
```typescript
{
  name: 'category',
  type: 'relationship',
  relationTo: 'case-study-categories',
  required: true,
}
```
* **The Relationship Polymorphism Pattern**:
  In `payload-types.ts`, this field is generated as:
  ```typescript
  category: number | CaseStudyCategory;
  ```
  - When querying with `depth: 0`, Payload returns the category ID (`number`).
  - When querying with `depth: 1` (default), Payload automatically joins and populates the complete `CaseStudyCategory` document.

### 4. Upload & Media Fields
Files and images are stored in a dedicated `Media` collection and referenced via `type: 'upload'`:
```typescript
{
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  label: 'Cover Image',
}
```

### 5. Rich Text (Meta's Lexical Editor)
Payload 3.x uses `@payloadcms/richtext-lexical`:
```typescript
{
  name: 'overview',
  type: 'richText',
  label: 'Full Overview & Content',
}
```
* Stores a rich AST (Abstract Syntax Tree) with heading levels, lists, quotes, inline links, and embedded images.

---

## 🔍 4. Dissecting IdentifYou's 8 Collections

Let's examine how the real collections in `payload/collections/` are structured:

### 1. `CaseStudies` (`payload/collections/CaseStudies.ts`)
* **Purpose**: Core showcase of IdentifYou's engineering projects (Vision AI, Smart Automation, Data Engineering).
* **Key Features**:
  - **Draft/Publish Workflow**: `versions: { drafts: true }` allows engineers to prepare case studies as drafts before pushing to the live site.
  - **Template Selector**: Sidebar dropdown with 4 templates:
    1. *Classic Editorial (Default)*
    2. *Tech Deep Dive (Dark Theme + Code & Architecture)*
    3. *Visual Showcase (Large Media & Full-Width Banners)*
    4. *Executive Brief (Split 2-Column with Key Highlights)*
  - **DOCX Import Blocks (`docItems`)**: An array of polymorphic blocks (`p`, `h2`, `h3`, `h4`, `bullet`, `image`) imported directly from technical documentation files.
  - **Live Preview**: Configured with desktop, tablet, and mobile breakpoints rendering `https://identifyyou.ai/case-studies/[slug]`.

### 2. `BlogsAndNews` (`payload/collections/BlogsAndNews.ts`)
* **Purpose**: Thought leadership articles, AI innovations, and company announcements.
* **Key Fields**:
  - `slug`: Unique URL identifier with hyphenated formatting.
  - `readTime`: Display string (e.g. `"5 min read"`).
  - `featuredImage`: Upload relationship to `Media`.
  - `overview` & `content`: Lexical rich text editor.

### 3. `CaseStudyCategories` (`payload/collections/CaseStudyCategories.ts`)
* **Purpose**: Dynamic taxonomy categorization (e.g. *Vision AI*, *Data Engineering*, *Industrial Automation*).
* **Key Fields**: `name`, `slug`, `displayOrder`, `description`.

### 4. `ContactSubmissions` (`payload/collections/ContactSubmissions.ts`)
* **Purpose**: Lead capture CRM storing inquiries from `/contact`.
* **Security & Immutability**:
  ```typescript
  access: {
    read: () => true,
    create: () => true,
    update: () => false,  // Submissions cannot be tampered with
    delete: () => false,  // Protect audit trail
  }
  ```
* **Lifecycle Hook**: An `afterChange` hook triggers automated email notifications:
  ```typescript
  const sendEmailHook: CollectionAfterChangeHook = async ({ doc, operation }) => {
    if (operation === 'create') {
      await sendContactNotification({ ...doc })
    }
  }
  ```

### 5. `Media` (`payload/collections/Media.ts`)
* **Purpose**: Centralized asset manager for photos, diagrams, and illustrations.
* **Responsive Image Pipeline (Sharp)**:
  ```typescript
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 500, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  }
  ```
  *When an image is uploaded, Sharp automatically crops and resizes all 3 formats instantly!*

### 6. `LeadershipTeam` (`payload/collections/LeadershipTeam.ts`)
* **Purpose**: Executive team bios on the `/about` page (name, role, LinkedIn URL, bio, photo).

### 7. `DeepTechCapabilities` (`payload/collections/DeepTechCapabilities.ts`)
* **Purpose**: Dynamic capability matrices featured on the `/deep-tech` page.

### 8. `ManufacturingSolutions` (`payload/collections/ManufacturingSolutions.ts`)
* **Purpose**: Industry automation solutions featured on the `/manufacturing` page.

---

## 🌐 5. Dissecting IdentifYou's 4 Globals

Globals store site-wide configurations that only need a single document:

### 1. `HeaderGlobal` (`payload/globals/Header.ts`)
* **Logo**: `brandName`, `tagline`, `href`.
* **Nested Navigation Array**:
  ```typescript
  navItems: [
    {
      label: 'Solutions',
      href: '/manufacturing',
      subItems: [
        { label: 'Vision AI', href: '/deep-tech/vision-ai' },
        { label: 'Smart Factory', href: '/thinking-factory' },
      ],
    },
  ]
  ```
* **CTA Button**: Custom label and link for the header action button (*"Talk to an Expert"*).

### 2. `FooterGlobal` (`payload/globals/Footer.ts`)
* Social links (LinkedIn, Twitter/X, GitHub), copyright notice, legal page links, and address.

### 3. `HomePageData` (`payload/globals/HomePageData.ts`)
* Hero headline, badge (*"Business First. Technology That Delivers."*), intro statement, and feature matrices (*"AI That Sees, Thinks, Acts"*).

### 4. `SiteSettings` (`payload/globals/SiteSettings.ts`)
* Global SEO default titles, meta descriptions, and fallback OpenGraph share cards.

---

## ⚡ 6. End-to-End TypeScript Safety (`payload-types.ts`)

Whenever you save a schema in `payload/collections/` or `payload/globals/`, Payload re-evaluates the config and synchronizes `payload-types.ts`.

### How Frontend Components Consume These Types:
```typescript
// app/(frontend)/case-studies/page.tsx
import type { CaseStudy, CaseStudyCategory } from '@/payload-types'

interface CaseStudyCardProps {
  study: CaseStudy
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  // TypeScript guarantees auto-complete for:
  // study.title, study.template, study.summary?.challenge, etc.
  const categoryName = typeof study.category === 'object' 
    ? study.category.name 
    : 'Engineering'

  return (
    <article className={`card template-${study.template}`}>
      <h3>{study.title}</h3>
      <span className="badge">{categoryName}</span>
      <p>{study.summary?.challenge}</p>
    </article>
  )
}
```

---

## 🪝 7. Lifecycle Hooks: Automated Business Logic

Payload collections support 4 primary lifecycle stages:

```
                Incoming API / Form Request
                            │
                            ▼
                    beforeValidate
              (Data cleaning & verification)
                            │
                            ▼
                      beforeChange
         (Transform data right before saving to DB)
                            │
                            ▼
                     [ PostgreSQL Write ]
                            │
                            ▼
                      afterChange
      (Trigger external webhooks, emails, cache purges)
```

### Real Example: Lead Notification Hook
In [payload/collections/ContactSubmissions.ts](file:///e:/identifyyou_website/identifyyou-nextjs/payload/collections/ContactSubmissions.ts):
```typescript
const sendEmailHook: CollectionAfterChangeHook = async ({ doc, operation }) => {
  // Only trigger on newly created submissions, not updates
  if (operation === 'create') {
    try {
      await sendContactNotification({
        name: doc.name,
        email: doc.email,
        company: doc.company,
        message: doc.message,
        selectedPath: doc.selectedPath,
        utmSource: doc.utmSource,
      })
    } catch (error) {
      console.error('Email hook failed:', error)
    }
  }
}
```

---

## 🛠️ 8. Hands-On Lab: Day 2 Exercises

Guide your students through these 3 practical exercises:

### Exercise 1: Add a "Reading Time" Field to Blogs
1. Open [payload/collections/BlogsAndNews.ts](file:///e:/identifyyou_website/identifyyou-nextjs/payload/collections/BlogsAndNews.ts).
2. Add a new `estimatedMinutes` field:
   ```typescript
   {
     name: 'estimatedMinutes',
     type: 'number',
     label: 'Estimated Reading Time (Minutes)',
     defaultValue: 5,
     admin: {
       position: 'sidebar',
       description: 'Auto-calculated or manually specified reading time',
     },
   },
   ```
3. Save the file.
4. Refresh `http://localhost:3000/admin`. Open any Blog post and confirm the new number input appears in the right sidebar.

### Exercise 2: Test Draft vs. Published States
1. In Payload Admin, navigate to **Success Stories (Case Studies)**.
2. Create a new case study titled `"Autonomous Drone Inspection"`.
3. In the sidebar, set **Status** to **Draft**, then click **Save**.
4. In another browser tab, visit `http://localhost:3000/case-studies/autonomous-drone-inspection`.
5. Observe that the public frontend ignores draft posts because the query filter enforces:
   ```typescript
   where: { status: { equals: 'published' } }
   ```
6. Return to Admin, change status to **Published**, click **Save**, and refresh the frontend page. The case study is now live!

### Exercise 3: Inspect Auto-Generated Types
1. Open `payload-types.ts` in your editor.
2. Search for `export interface BlogsAndNew`.
3. Confirm that `estimatedMinutes?: number | null;` was automatically added to the TypeScript interface!

---

## 📝 9. End-of-Day Knowledge Check

### Comprehension Questions
1. **Q1: When should you use a Global instead of a Collection?**  
   *Answer*: Use a Global when only a single document/state exists across the entire site (e.g. Header navigation, Site SEO, Homepage hero content). Use a Collection when multiple records exist (e.g. Blogs, Case Studies, Users).
2. **Q2: Why does `category` in `CaseStudy` have the type `number | CaseStudyCategory`?**  
   *Answer*: Payload uses relationship depth. At depth 0, Payload only returns the foreign key ID (`number`). At depth 1 or higher, Payload automatically joins and populates the complete referenced document object.
3. **Q3: What is the purpose of `versions: { drafts: true }`?**  
   *Answer*: It enables versioning and draft states, allowing content creators to save unpublished revisions without affecting the live public website.

---

> **Ready for Day 3?**  
> Tomorrow, we will explore **The Data Fetching Layer (`lib/payload.ts`), Server Components, Dynamic Routing (`[slug]`), and Local API Queries!**
