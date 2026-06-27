import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",              allow: "/" },
      { userAgent: "GPTBot",         allow: "/" },
      { userAgent: "anthropic-ai",   allow: "/" },
      { userAgent: "ClaudeBot",      allow: "/" },
      { userAgent: "PerplexityBot",  allow: "/" },
      { userAgent: "Googlebot",      allow: "/" },
      { userAgent: "bingbot",        allow: "/" },
    ],
    sitemap: "https://landscale.agency/sitemap.xml",
    host: "https://landscale.agency",
  };
}
