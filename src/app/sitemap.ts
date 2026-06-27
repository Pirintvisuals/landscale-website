import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://landscale.agency";

  return [
    { url: `${base}/`,                              lastModified: "2026-05-26", changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/hu`,                            lastModified: "2026-05-26", changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/about`,                         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,                      lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/ai-estimator`,         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/ai-chatbot`,           lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/website-design`,       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/seo-marketing`,        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/case-studies`,                  lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,                       lastModified: "2026-04-01", changeFrequency: "yearly",  priority: 0.6 },
  ];
}
