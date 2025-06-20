import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Kiosk - Modern Kiosk Solutions',
  description:
    'Leading provider of innovative kiosk solutions for modern businesses. Discover our comprehensive range of customizable kiosk systems.',
  keywords:
    'kiosk, digital kiosk, interactive kiosk, self-service, payment kiosk, information kiosk',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  // openGraph: {
  //   title: 'Next Kiosk - Modern Kiosk Solutions',
  //   description:
  //     'Explore Next Kiosk’s customizable kiosk systems for modern businesses. Reliable, sleek, and built for performance.',
  //   url: 'https://next-kiosk.com',
  //   siteName: 'Next Kiosk',
  //   images: [
  //     {
  //       url: 'https://next-kiosk.com/images/og-image.png', // make sure this image exists
  //       width: 1200,
  //       height: 630,
  //       alt: 'Next Kiosk Product Preview',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Next Kiosk - Modern Kiosk Solutions',
  //   description:
  //     'Explore Next Kiosk’s customizable kiosk systems for modern businesses. Reliable, sleek, and built for performance.',
  //   images: ['https://next-kiosk.com/images/og-image.png'], // same image as OG
  // },
  themeColor: '#4ca958',
  // metadataBase: new URL('https://next-kiosk.com'),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Script
            src="https://www.google.com/recaptcha/api.js?render=6LdOzGcrAAAAAKVqBzdIZTPHz6xseczF3zb68Zik"
            strategy="afterInteractive"
          />
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
