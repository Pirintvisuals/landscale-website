import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://landscale.agency";

  return [
    { url: `${base}/`,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/hu`,                            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/about`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/ai-estimator`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/ai-chatbot`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/website-design`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/seo-marketing`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/case-studies`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,                       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}
