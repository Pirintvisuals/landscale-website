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
  email: "milan@landscale.net",
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
  ],
  description: "Milán Pirint is the founder of Landscale. He builds AI quoting assistants, AI receptionists, plan & tender review tools and websites for trade and construction businesses in Hungary, Austria and the UK.",
};

export const metadata: Metadata = {
  title: "About Landscale, AI & Web Design for Tradesmen",
  description:
    "Milán Pirint, founder of Landscale: AI quoting assistants, AI receptionists and plan & tender review for trade and construction businesses.",
  keywords:
    "Landscale about, Milán Pirint, AI quoting assistant, AI receptionist, plan and tender review, contractor web design",
  alternates: { canonical: "https://landscale.agency/about" },
  openGraph: {
    title: "About Landscale, AI & Web Design for Tradesmen",
    description:
      "Milán Pirint, founder of Landscale: AI quoting assistants, AI receptionists and plan & tender review for trade and construction businesses.",
    type: "website",
    url: "https://landscale.agency/about",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
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
