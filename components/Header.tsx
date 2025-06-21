'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Globe, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when contact form is open
  useEffect(() => {
    if (isContactFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactFormOpen]);


  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.custom'), href: '/custom-kiosk' },
    { name: t('nav.about'), href: '/about' },
    { name: language === 'tr' ? 'Blog' : 'Blog', href: '/blogs' },
  ];

  const socialLinks = [{ icon: Linkedin, href: '#', label: 'LinkedIn' }];

  return (
    <>
      <motion.header
        className={`z-[101] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-7 w-auto"
              >
                <Image
                  src="/images/logo/logo-gray.png"
                  alt="Next Kiosk Logo"
                  width={3508}
                  height={2481}
                  className="h-full w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-m font-medium transition-colors hover:text-primary ${pathname === item.href ? 'text-primary' : 'text-gray-600'
                    }`}
                  onClick={() => setIsContactFormOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Language Switcher & Contact Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                className="flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span>{language.toUpperCase()}</span>
              </Button>

              <Button
                className="flex items-center space-x-2"
                style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                onClick={() => setIsContactFormOpen((prev) => !prev)}

              >
                <Phone className="w-4 h-4" />
                <span>{t('nav.contact')}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              >
                <Globe className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsMobileMenuOpen(prev => !prev);
                  setIsContactFormOpen(false);
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              className="z-[101] md:hidden border-t bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium ${pathname === item.href
                      ? 'text-primary bg-gray-50'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  className="w-full mt-4"
                  style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactFormOpen(true);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('nav.contact')}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Full-Screen Contact Form Overlay */}
      {isContactFormOpen && (
        <div
          className="inset-0 z-[100] pt-24 overflow-y-auto md:overflow-hidden max-h-screen overscroll-contain fixed"
          style={{
            background:
              'linear-gradient(135deg, rgba(76, 169, 88, 0.95) 30%, rgba(59, 65, 69, 0.95) 100%)',
          }}
        >
          <div className="min-h-screen pt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-7xl mx-auto">
                {/* Close Button */}
                <button
                  className="absolute top-20 right-4 sm:right-8 text-white hover:text-gray-200 transition-colors z-10"
                  onClick={() => setIsContactFormOpen(false)}
                  aria-label="Close Contact Form"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Company Info */}
                  <div className="text-white">
                    <div className="mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('contact.title')}
                      </h2>
                      <div className="w-16 h-1 bg-white mb-6"></div>
                    </div>

                    <div className="mb-8">
                      <p className="text-lg text-white/90 mb-6 leading-relaxed">
                        {language === 'tr'
                          ? 'Anında danışmanlık veya teklif için formu doldurun. Uygulama, proje kapsamı ve gereksinimleriniz hakkında bize bilgi verin, en kısa sürede sizinle iletişime geçelim. Ya da bizi arayın!'
                          : 'Please fill out the form for an immediate consultation or a quote. Tell us about your application, project scope and requirements and we will contact you as quickly as we can. Or give us a call!'}
                      </p>

                      <div className="space-y-3 text-white/90">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
                          <div>
                            <p>Maslak Mahallesi, Büyükdere Caddesi</p>
                            <p>Şişli, Istanbul 34485</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                          <div>
                            <p>+90 (212) 555-0123</p>
                            <p>+90 (212) 555-0124</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                          <a
                            href="mailto:info@nextkiosk.com"
                            className="hover:text-white transition-colors"
                          >
                            info@nextkiosk.com
                          </a>
                        </div>
                        <p className="mt-4 font-medium">
                          {language === 'tr'
                            ? "Türkiye'de Üretilmiştir"
                            : 'Manufactured in Turkey'}
                        </p>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column - Contact Form */}
                  <div className="bg-transparent rounded-lg p-8 shadow-none">
                    <div className="mb-6">
                      <p className="text-white text-center">
                        {language === 'tr'
                          ? 'Anında danışmanlık veya teklif için aşağıdaki formu doldurun, en kısa sürede sizinle iletişime geçeceğiz. Teşekkürler!'
                          : 'Please fill out the form below for an immediate consultation or a quote, we will contact you as quickly as we can. Thanks!'}
                      </p>
                    </div>

                    <ContactForm onClose={() => setIsContactFormOpen(false)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
