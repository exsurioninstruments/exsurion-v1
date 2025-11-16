export default {
  name: 'code',
  title: 'Codes',
  type: 'document',
  fields: [
    {
      name: 'value',
      title: 'Code',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'value',
    },
  },
}

