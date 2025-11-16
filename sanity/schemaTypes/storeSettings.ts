import type { Rule } from 'sanity'

export default {
    name: 'storeSettings',
    title: 'Store Settings',
    type: 'document',
    // Only one doc is needed
    __experimental_actions: ['update', 'publish'], // hide create/delete
  
    fields: [
      {
        name: 'storeName',
        title: 'Store Name',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: { hotspot: true },
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: 'headerLinks',
        title: 'Header Links',
        type: 'array',
        description: 'Links displayed in the main navigation',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
              { name: 'url', title: 'URL', type: 'url', validation: (Rule: { required: () => any }) => Rule.required() },
            ],
          },
        ],
      },
      {
        name: 'footerLinks',
        title: 'Footer Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string', validation: (Rule: { required: () => any }) => Rule.required() },
              { name: 'url', title: 'URL', type: 'url', validation: (Rule: { required: () => any }) => Rule.required() },
            ],
          },
        ],
      },
      {
        name: 'footerText',
        title: 'Footer Text',
        type: 'string',
        description: 'Small copyright or tagline under the footer links',
      },
      {
        name: 'socialLinks',
        title: 'Social Media Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'platform', title: 'Platform', type: 'string' },
              { name: 'url', title: 'URL', type: 'url' },
            ],
          },
        ],
      },
      {
        name: 'shippingCharges',
        title: 'Shipping Charges',
        type: 'object',
        description: 'Configure shipping costs and free shipping threshold',
        fields: [
          {
            name: 'fixedCharge',
            title: 'Fixed Shipping Charge',
            type: 'number',
            description: 'Standard shipping cost in dollars',
            validation: (Rule: { required: () => any; min: (value: number) => any }) => 
              Rule.required().min(0),
          },
          {
            name: 'freeShippingThreshold',
            title: 'Free Shipping Threshold',
            type: 'number',
            description: 'Order amount above which shipping is free (in dollars)',
            validation: (Rule: { required: () => any; min: (value: number) => any }) => 
              Rule.required().min(0),
          },
        ],
      },
      {
        name: 'taxSettings',
        title: 'Tax Settings',
        type: 'object',
        description: 'Configure tax percentage and settings',
        fields: [
          {
            name: 'taxPercentage',
            title: 'Tax Percentage',
            type: 'number',
            description: 'Tax rate as a percentage (e.g., 8 for 8%)',
            validation: (Rule: { required: () => any; min: (value: number) => any; max: (value: number) => any }) => 
              Rule.required().min(0).max(100),
          },
          {
            name: 'taxLabel',
            title: 'Tax Label',
            type: 'string',
            description: 'Display label for tax (e.g., "Tax", "VAT", "GST")',
            initialValue: 'Tax',
          },
        ],
      },
      {
        name: 'heroSection',
        title: 'Hero Section',
        type: 'object',
        description: 'Main hero section content for the homepage',
        fields: [
          {
            name: 'headline',
            title: 'Main Headline',
            type: 'text',
            description: 'The main headline text displayed in the hero section',
            rows: 3,
            validation: (Rule: { required: () => any }) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'The description text below the headline',
            rows: 4,
            validation: (Rule: { required: () => any }) => Rule.required(),
          },
          {
            name: 'primaryButton',
            title: 'Primary Button',
            type: 'object',
            fields: [
              {
                name: 'text',
                title: 'Button Text',
                type: 'string',
                validation: (Rule: { required: () => any }) => Rule.required(),
              },
              {
                name: 'url',
                title: 'Button URL',
                type: 'string',
                validation: (Rule: { required: () => any }) => Rule.required(),
              },
            ],
          },
          {
            name: 'secondaryButton',
            title: 'Secondary Button',
            type: 'object',
            fields: [
              {
                name: 'text',
                title: 'Button Text',
                type: 'string',
                validation: (Rule: { required: () => any }) => Rule.required(),
              },
              {
                name: 'url',
                title: 'Button URL',
                type: 'string',
                validation: (Rule: { required: () => any }) => Rule.required(),
              },
            ],
          },
        ],
      },
      {
        name: 'carouselImages',
        title: 'Carousel Images',
        type: 'array',
        description: 'Images displayed in the infinite carousel on the homepage',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
                validation: (Rule: { required: () => any }) => Rule.required(),
              },
              {
                name: 'altText',
                title: 'Alt Text',
                type: 'string',
                description: 'Alternative text for accessibility',
                validation: (Rule: { required: () => any }) => Rule.required(),
              },
            ],
            preview: {
              select: {
                title: 'altText',
                media: 'image',
              },
            },
          },
        ],
      },
      {
        name: 'companyInfo',
        title: 'Company Information',
        type: 'object',
        description: 'Basic company information displayed throughout the site',
        fields: [
          {
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            description: 'The company name (e.g., "Exsurion")',
            validation: (Rule: { required: () => any }) => Rule.required(),
          },
          {
            name: 'tagline',
            title: 'Company Tagline',
            type: 'string',
            description: 'A short tagline or description of the company',
          },
          {
            name: 'description',
            title: 'Company Description',
            type: 'text',
            description: 'Detailed description of the company and its services',
            rows: 4,
          },
        ],
      },
      {
        name: 'seoSettings',
        title: 'SEO Settings',
        type: 'object',
        description: 'Basic SEO settings for the website',
        fields: [
          {
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            description: 'The main title of your website (appears in browser tabs)',
            validation: (Rule: { required: () => any; max: (length: number) => any }) => 
              Rule.required().max(60),
          },
          {
            name: 'siteDescription',
            title: 'Site Description',
            type: 'text',
            description: 'Brief description of your website (appears in search results)',
            rows: 3,
            validation: (Rule: { required: () => any; max: (length: number) => any }) => 
              Rule.required().max(160),
          },
          {
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description: 'Image shown when your site is shared on social media',
            options: { hotspot: true },
            validation: (Rule: { required: () => any }) => Rule.required(),
          },
        ],
      },
      {
        name: 'whatsappNumber',
        title: 'WhatsApp Number',
        type: 'string',
        description: 'WhatsApp business number (e.g., +1234567890) - used for the chat button',
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
    ],
  
    preview: {
      prepare() {
        return { title: 'Store Settings', subtitle: 'Global configuration' }
      },
    },
  }
  