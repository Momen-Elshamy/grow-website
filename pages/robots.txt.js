// pages/robots.txt.js
// This generates a dynamic robots.txt file

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function generateRobotsTxt() {
  return `# robots.txt for Grow Website
# This file tells search engines which pages they can and cannot crawl

# Allow all robots to access all content
User-agent: *
Allow: /

# Disallow access to API routes
Disallow: /api/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Allow Google Image Bot
User-agent: Googlebot-Image
Allow: /images/
Allow: /public/images/`;
}

export async function getServerSideProps({ res }) {
  const robotsTxt = generateRobotsTxt();

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
