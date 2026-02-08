// pages/sitemap.xml.js
// This generates a dynamic sitemap for better SEO

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function generateSiteMap() {
  const currentDate = new Date().toISOString().split('T')[0];

  // Define all static pages with their priorities and change frequencies
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/solutions', priority: '0.8', changefreq: 'monthly' },
    { path: '/services', priority: '0.8', changefreq: 'monthly' },
    { path: '/news', priority: '0.7', changefreq: 'weekly' },
    { path: '/contact', priority: '0.6', changefreq: 'yearly' },
    { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(({ path, priority, changefreq }) => {
    return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}
