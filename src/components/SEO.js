import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ title, description }) {
  const siteTitle = 'Casava Store';
  const siteDescription = description || 'Your one-stop shop for all your needs';

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
    </Helmet>
  );
}

export default SEO; 