export function buildMetadata({ title, description, path = '/', image = '/og-image.png' }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vyaparios.example.com';
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}

export const defaultMetadata = buildMetadata({
  title: 'Vyapari OS',
  description: 'Enterprise-grade business operations platform for modern SMBs.',
});
