export default {
    name: 'order',
    title: 'Orders',
    type: 'document',
    fields: [
      { 
        name: 'orderNumber', 
        title: 'Order #', 
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: 'customer',
        title: 'Customer Information',
        type: 'object',
        fields: [
          { name: 'email', title: 'Email', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
          { name: 'firstName', title: 'First Name', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
          { name: 'lastName', title: 'Last Name', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
          { name: 'phone', title: 'Phone Number', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
        ],
      },
      {
        name: 'shippingAddress',
        title: 'Shipping Address',
        type: 'object',
        fields: [
          { name: 'address', title: 'Street Address', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
          { name: 'city', title: 'City', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
          { name: 'state', title: 'State', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
          { name: 'zipCode', title: 'ZIP Code', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
        ],
      },
      {
        name: 'items',
        title: 'Order Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }], validation: (Rule: { required: () => any }) => Rule.required() },
              { name: 'quantity', title: 'Quantity', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(1) },
              { name: 'price', title: 'Unit Price', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(0) },
              { name: 'total', title: 'Item Total', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(0) },
            ],
          },
        ],
        validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(1),
      },
      {
        name: 'paymentMethod',
        title: 'Payment Method',
        type: 'string',
        options: { list: [{ title: 'Cash on Delivery', value: 'COD' }] },
        initialValue: 'COD',
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'Pending' },
            { title: 'Confirmed', value: 'Confirmed' },
            { title: 'Shipped', value: 'Shipped' },
            { title: 'Delivered', value: 'Delivered' },
            { title: 'Cancelled', value: 'Cancelled' },
          ],
        },
        initialValue: 'Pending',
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: 'pricing',
        title: 'Order Pricing',
        type: 'object',
        fields: [
          { name: 'subtotal', title: 'Subtotal', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(0) },
          { name: 'shipping', title: 'Shipping Cost', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(0) },
          { name: 'tax', title: 'Tax Amount', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(0) },
          { name: 'total', title: 'Total Amount', type: 'number', validation: (Rule: { required: () => any; min: (value: number) => any }) => Rule.required().min(0) },
        ],
      },
      { 
        name: 'notes', 
        title: 'Customer Notes', 
        type: 'text',
        description: 'Additional notes or special instructions from the customer'
      },
      {
        name: 'orderDate',
        title: 'Order Date',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
    ],
    preview: {
      select: { 
        title: 'orderNumber', 
        subtitle: 'status',
        media: 'customer.firstName'
      },
      prepare(selection: any) {
        const { title, subtitle, media } = selection;
        return {
          title: `Order #${title}`,
          subtitle: `${subtitle} - ${media}`,
        };
      },
    },
  }
  