export default {
  name: 'tipShape',
  title: 'Tip Shapes',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tip Shape Name',
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


