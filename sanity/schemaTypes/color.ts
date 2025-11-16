export default {
  name: 'color',
  title: 'Colors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Color Name',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Color Value',
      type: 'string',
      description: 'Hex color (e.g., #FF5733) or RGB color (e.g., rgb(255, 87, 51))',
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'value',
    },
  },
}

