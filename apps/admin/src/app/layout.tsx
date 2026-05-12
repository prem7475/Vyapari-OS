import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vyapari OS Admin',
  description: 'Vyapari OS Admin Console',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}

