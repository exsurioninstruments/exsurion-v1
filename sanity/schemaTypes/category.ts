export default {
    name: 'category',
    title: 'Categories',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'description', title: 'Description', type: 'text' },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
      },
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
    preview: { select: { title: 'title', subtitle: 'slug.current', media: 'image' } },
  }
  