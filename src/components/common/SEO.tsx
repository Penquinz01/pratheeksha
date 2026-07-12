import React from 'react';
import { Helmet } from 'react-helmet-async';
import { organizationDetails } from '../../data/content';

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "Pratheeksha Foundation is a registered NGO in Wayanad, Kerala dedicated to safe housing, education sponsorships, healthcare, food security, and livelihood rehabilitation.",
  canonicalUrl = window.location.href,
  ogType = "website",
  ogImage = "https://pratheekshafoundation.org/og-cover.jpg",
  noIndex = false,
}) => {
  const siteTitle = `${title} | ${organizationDetails.name}`;

  // Organization Schema Markup
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": organizationDetails.name,
    "alternateName": organizationDetails.shortName,
    "url": "https://pratheekshafoundation.org",
    "logo": "https://pratheekshafoundation.org/favicon.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${organizationDetails.address.line1}, ${organizationDetails.address.line2}`,
      "addressLocality": organizationDetails.address.city,
      "addressRegion": organizationDetails.address.state,
      "postalCode": organizationDetails.address.pin,
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": organizationDetails.phone,
      "contactType": "inquiries",
      "email": organizationDetails.email
    },
    "sameAs": [
      organizationDetails.socials.facebook,
      organizationDetails.socials.instagram,
      organizationDetails.socials.twitter,
      organizationDetails.socials.youtube
    ],
    "description": organizationDetails.tagline
  };

  return (
    <Helmet>
      {/* Basic HTML Meta */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={organizationDetails.name} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@pratheekshawayanad" />

      {/* SEO Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};
