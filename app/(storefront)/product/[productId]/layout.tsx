import Image from "next/image";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PRODUCT_QUERY } from "@/lib/sanity/queries";
import {
  transformProduct,
  getProductName,
  getProductDescription,
  getProductImages,
} from "@/lib/sanity/utils";

function getImageUrl(image: any, width?: number, height?: number): string {
  if (!image?.asset?.url) return "";

  let url = image.asset.url;

  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append("w", width.toString());
    if (height) params.append("h", height.toString());
    params.append("fit", "crop");
    params.append("auto", "format");
    url += `?${params.toString()}`;
  }

  return url;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  try {
    const { productId } = await params;
    const productData = await client.fetch(PRODUCT_QUERY, {
      slug: productId,
    });

    if (!productData) {
      return {
        title: "Product Not Found | Exsurion",
        description: "The product you're looking for doesn't exist.",
      };
    }

    const product = transformProduct(productData);
    const productName = getProductName(product);
    const productDescription = getProductDescription(product);
    const productImages = getProductImages(product);

    const seoTitle = product.seo?.title || `${productName} | Exsurion`;
    const seoDescription =
      product.seo?.description ||
      (productDescription
        ? `${productDescription.substring(0, 160)}...`
        : `Shop ${productName} at Exsurion.`);

    const keywords =
      product.seo?.keywords ||
      [productName, "surgical instruments", "medical equipment"].filter(
        Boolean
      );

    const ogImage = product.seo?.ogImage
      ? getImageUrl(product.seo.ogImage, 1200, 630)
      : productImages[0] || "";

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://exsurion.com";
    const canonicalUrl = `${baseUrl}/product/${productId}`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        images: ogImage
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: productName,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product | Exsurion",
      description: "Browse our products",
    };
  }
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <section className="w-full bg-white py-20 md:py-32 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 px-4 w-[80%]">
          <Image
            src="/logo-cropped.svg"
            alt="Logo"
            width={100}
            height={100}
            className="h-64 w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
