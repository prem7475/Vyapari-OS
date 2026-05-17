const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vyaparios.example.com';

export default function Robots() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
