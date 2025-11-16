// /schemas/banner.js
export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Banner Title',
        type: 'string',
        description: 'Internal name (not shown on site)',
      },
      {
        name: 'image',
        title: 'Banner Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'headline',
        title: 'Headline / Main Text',
        type: 'string',
      },
      {
        name: 'subText',
        title: 'Sub-Text',
        type: 'text',
      },
      {
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
      },
      {
        name: 'buttonUrl',
        title: 'Button URL',
        type: 'url',
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Lower numbers show first',
      },
      {
        name: 'isActive',
        title: 'Active?',
        type: 'boolean',
        initialValue: true,
      },
    ],
    preview: {
      select: { title: 'headline', media: 'image' },
    },
  }
  