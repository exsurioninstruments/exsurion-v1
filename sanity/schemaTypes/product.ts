import { SKUInput } from '../components/SKUInput'
import { ProductCodeInput } from '../components/ProductCodeInput'

export default {
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
      { name: 'price', title: 'Price', type: 'number' },
      { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
      { name: 'subCategory', title: 'Sub Category', type: 'reference', to: [{ type: 'subCategory' }] },
      {
        name: 'variant',
        title: 'Variant',
        type: 'reference',
        to: [{ type: 'variant' }],
      },
      {
        name: 'colors',
        title: 'Colors',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'color' }] }],
        description: 'Select multiple colors available for this product',
      },
      {
        name: 'materials',
        title: 'Materials',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'material' }] }],
        description: 'Select multiple materials available for this product',
      },
      {
        name: 'tipShapes',
        title: 'Tip Shapes',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'tipShape' }] }],
        description: 'Select multiple tip shapes available for this product',
      },
      {
        name: 'code',
        title: 'Code',
        type: 'reference',
        to: [{ type: 'code' }],
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
      },
      { name: 'isFeatured', title: 'Featured Product', type: 'boolean', initialValue: false },
      {
        name: 'sku',
        title: 'SKU',
        type: 'string',
        components: {
          input: SKUInput,
        },
        description: 'Stock Keeping Unit - Format: EX-{code}-{variant}',
      },
      {
        name: 'productCode',
        title: 'Product Code',
        type: 'string',
        components: {
          input: ProductCodeInput,
        },
        description: 'Product Code - Format: EX-{first three letters of title}-{code}-{first letter of material}-{variant}',
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
    preview: { select: { title: 'title', subtitle: 'price', media: 'images.0' } },
  }
  