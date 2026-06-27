import type { Metadata } from "next";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Milan Pirint",
  jobTitle: "Founder & Lead Developer",
  worksFor: {
    "@type": "Organization",
    name: "Landscale Agency",
    url: "https://landscale.agency",
  },
  url: "https://landscale.agency/about",
  email: "landscale.agency@gmail.com",
  sameAs: [
    "https://www.instagram.com/pirintmilan/",
    "https://www.linkedin.com/in/mil%C3%A1n-pirint-0598413b7/",
  ],
  knowsAbout: [
    "AI lead generation for tradesmen",
    "Website design for trade businesses",
    "Local SEO for contractors",
    "AI chatbot development",
    "Next.js web development",
    "Landscaping industry marketing",
  ],
  description: "Milan Pirint is the founder of Landscale Agency, an AI-powered marketing agency for trade businesses. He builds premium websites with integrated AI lead qualification tools for roofers, landscapers, hardscapers, builders, and contractors in the UK and internationally.",
};

export const metadata: Metadata = {
  title: "About Landscale — AI & Web Design for Tradesmen",
  description:
    "Milan Pirint, founder of Landscale — building AI-powered websites & lead qualification for roofers, landscapers, builders and tradesmen. Based in UK & Hungary.",
  keywords:
    "Landscale Agency about, Milan Pirint web designer, AI website tradesmen UK, roofing website design, hardscaping website, contractor web design UK",
  alternates: { canonical: "https://landscale.agency/about" },
  openGraph: {
    title: "About Landscale — AI & Web Design for Tradesmen",
    description:
      "Milan Pirint, founder of Landscale — building AI-powered websites & lead qualification for roofers, landscapers, builders and tradesmen. Based in UK & Hungary.",
    type: "website",
    url: "https://landscale.agency/about",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      {children}
    </>
  );
}
