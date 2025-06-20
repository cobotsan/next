'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.custom'), href: '/custom-kiosk' },
    { name: t('nav.about'), href: '/about' },
    { name: language === 'tr' ? 'Blog' : 'Blog', href: '/blogs' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-bold"
              style={{ color: 'rgb(76, 169, 88)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Next Kiosk
            </motion.h3>
            <p className="text-gray-300 text-sm">{t('footer.description')}</p>
            <div className="flex space-x-4">
              {/* {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <span className="sr-only">{social.label}</span>
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })} */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.h4
              className="text-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('footer.quickLinks')}
            </motion.h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <motion.h4
              className="text-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('footer.contact')}
            </motion.h4>
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Mail className="w-4 h-4" />
                <span>{t('footer.email')}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Phone className="w-4 h-4" />
                <span>{t('footer.phone')}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <MapPin className="w-4 h-4" />
                <span>Istanbul, Turkey</span>
              </motion.div>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div className="space-y-4">
            <motion.h4
              className="text-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Newsletter
            </motion.h4>
            <motion.p
              className="text-gray-300 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Stay updated with our latest products and news.
            </motion.p>
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-r-md transition-colors"
                style={{ backgroundColor: 'rgb(76, 169, 88)' }}
              >
                Subscribe
              </button>
            </motion.div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-gray-400 text-sm">
            © 2024 Next Kiosk Solutions. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
