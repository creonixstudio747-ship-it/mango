import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nano Banana | Future of Freshness',
  description: 'Premium cold-pressed juices - Revolutionizing refreshment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} min-h-screen text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
