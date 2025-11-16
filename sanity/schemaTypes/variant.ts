export default {
  name: 'variant',
  title: 'Variants',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Variant Name',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}

