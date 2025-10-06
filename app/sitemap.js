export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/favorites`, lastModified: new Date() },
  ];
}


