import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.SANITY_STUDIO_DATASET === 'production' ? true : false,
});

// Helper function to get image URL
export function getImageUrl(image: any, width?: number, height?: number) {
  if (!image?.asset?.url) return '';
  
  let url = image.asset.url;
  
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('fit', 'crop');
    params.append('auto', 'format');
    
    url += `?${params.toString()}`;
  }
  
  return url;
}

// Helper function to get responsive image URLs
export function getResponsiveImageUrls(image: any, sizes: number[] = [400, 600, 800, 1200]) {
  if (!image?.asset?.url) return { src: '', srcSet: '' };
  
  const baseUrl = image.asset.url;
  const srcSet = sizes
    .map(size => `${baseUrl}?w=${size}&h=${size}&fit=crop&auto=format ${size}w`)
    .join(', ');
  
  return {
    src: `${baseUrl}?w=${sizes[0]}&h=${sizes[0]}&fit=crop&auto=format`,
    srcSet
  };
}

// Helper function to format block content
export function formatBlockContent(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (block._type === 'block') {
        return block.children
          ?.map((child: any) => child.text)
          .join('') || '';
      }
      return '';
    })
    .join('\n\n');
}
