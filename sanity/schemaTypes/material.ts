export default {
  name: 'material',
  title: 'Materials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Material Name',
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


