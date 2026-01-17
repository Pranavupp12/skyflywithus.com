// components/seo/article-schema.tsx

// 1. Import the Frontend Interface we are actually using
import { Article } from "@/components/blog_components/blog-card";

// 2. Define props to accept that interface
interface ArticleSchemaProps {
  article: Article; // Works for SingleBlogArticle too since it extends Article
}

export default function ArticleSchema({ article }: ArticleSchemaProps) {
  const siteUrl = process.env.NEXTAUTH_URL || "https://skyflywithus.com";
  
  // MAP FIELDS: Frontend -> JSON-LD
  // -------------------------------------------------------
  
  // Image: 'imageUrl' (frontend) -> 'image' (schema)
  const imageUrl = article.imageUrl.startsWith("http") 
    ? article.imageUrl 
    : `${siteUrl}${article.imageUrl}`;

  // Date: 'publishDate' (frontend string) -> ISO Date
  // We use the same date for modified/published as fallback
  const isoDate = new Date(article.publishDate).toISOString();

  // Author: 'authorName' (frontend string) -> Author Object
  const authorName = article.authorName || "SkyFlyWithUs Team";

  // -------------------------------------------------------

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.metaDesc,
    "image": [imageUrl],
    "datePublished": isoDate,
    "dateModified": isoDate, // You can add a modifiedDate to your Article interface later if needed
    "author": {
      "@type": "Person",
      "name": authorName,
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkyFlyWithUs",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/sf-foot-logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/articles/${article.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}