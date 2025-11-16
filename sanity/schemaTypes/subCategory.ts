export default {
    name: 'subCategory',
    title: 'Sub Categories',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'parent', title: 'Parent Category', type: 'reference', to: [{ type: 'category' }] },
      {
        name: 'seo',
        title: 'SEO',
        type: 'object',
        fields: [
          { name: 'title', title: 'SEO Title', type: 'string' },
          { name: 'description', title: 'SEO Description', type: 'text' },
          { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
          { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
        ],
      },
    ],
    preview: { select: { title: 'title', subtitle: 'parent.title', media: 'image' } },
  }
  