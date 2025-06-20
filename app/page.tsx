'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Zap, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import blogsData from '@/data/blogs.json';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();


  // Get last 3 blogs (sorted by publishDate descending)
  const lastBlogs = [...blogsData]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3);

  const features = [
    {
      icon: Zap,
      title: t('featured.innovation.title'),
      description: t('featured.innovation.desc'),
    },
    {
      icon: Shield,
      title: t('featured.customization.title'),
      description: t('featured.customization.desc'),
    },
    {
      icon: Headphones,
      title: t('featured.support.title'),
      description: t('featured.support.desc'),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center video-hero">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay" />
        <div className="hero-content text-center text-white px-4 max-w-4xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="text-lg px-8 py-4 group"
                style={{ backgroundColor: 'rgb(76, 169, 88)' }}
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('featured.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

            {/* Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('showcase.title')}
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {t('showcase.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                  />
                  <span className="text-gray-700">
                    {t('showcase.feature1')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                  />
                  <span className="text-gray-700">
                    {t('showcase.feature2')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                  />
                  <span className="text-gray-700">
                    {t('showcase.feature3')}
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt={t('products.title')}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{ backgroundColor: 'rgb(76, 169, 88)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link href="/products">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4"
                >
                  {t('cta.viewProducts')}
                </Button>
              </Link> */}
              <Link href="/custom-kiosk">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4"
                >
                  {t('cta.customSolutions')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Last Blogs Section*/}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('home.latestBlogs') || 'Latest Blog Posts'}
            </h2>
            <Link href="/blogs" className="text-primary font-medium hover:underline">
              {t('home.viewAllBlogs') || 'View All'}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {lastBlogs.map((blog) => {
              const title =
                t && typeof t === 'function'
                  ? (blog.titletr && blog.title && t('language') === 'tr' ? blog.titletr : blog.title)
                  : blog.title;
              const excerpt =
                t && typeof t === 'function'
                  ? (blog.excerpttr && blog.excerpt && t('language') === 'tr' ? blog.excerpttr : blog.excerpt)
                  : blog.excerpt;
              const slug =
                t && typeof t === 'function'
                  ? (blog.slugtr && blog.slug && t('language') === 'tr' ? blog.slugtr : blog.slug)
                  : blog.slug;

              return (
                <Link
                  key={blog.id}
                  href={`/blogs/${slug}`}
                  className="block bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="relative h-48">
                    <Image
                      src={blog.featuredImage}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {excerpt}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(blog.publishDate).toLocaleDateString(
                        t('language') === 'tr' ? 'tr-TR' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}