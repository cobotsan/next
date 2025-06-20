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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {/* TODO: ENABLE RECAPTCHA <Script
            src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"
            strategy="afterInteractive"
          /> */}
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
