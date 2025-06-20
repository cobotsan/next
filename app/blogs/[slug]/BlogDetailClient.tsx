'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Blog {
  id: number;
  title: string;
  titletr?: string;
  slug: string;
  slugtr?: string;
  author: string;
  authortr?: string;
  publishDate: string;
  featuredImage: string;
  excerpt: string;
  excerpttr?: string;
  content: string;
  contenttr?: string;
  categories: string[];
  categoriestr?: string[];
  tags: string[];
  tagstr?: string[];
  readTime: number;
  commentsCount: number;
  views: number;
}

export default function BlogDetailClient({ blog }: { blog: Blog }) {
  const { language } = useLanguage();
  const [showShareMenu, setShowShareMenu] = useState(false);

  const title = language === 'tr' && blog.titletr ? blog.titletr : blog.title;
  const content =
    language === 'tr' && blog.contenttr ? blog.contenttr : blog.content;
  const author =
    language === 'tr' && blog.authortr ? blog.authortr : blog.author;
  const categories =
    language === 'tr' && blog.categoriestr
      ? blog.categoriestr
      : blog.categories;
  const tags = language === 'tr' && blog.tagstr ? blog.tagstr : blog.tags;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${title} - Next Kiosk Blog`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
    }
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowShareMenu(false);
    // You could add a toast notification here
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src={blog.featuredImage}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="px-4 py-2 text-sm font-medium text-white rounded-full"
              style={{ backgroundColor: 'rgb(76, 169, 88)' }}
            >
              {categories[0]}
            </span>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.div
            className="flex items-center justify-center space-x-6 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(blog.publishDate)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>
                {blog.readTime} {language === 'tr' ? 'dk okuma' : 'min read'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/blogs">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'tr' ? "Blog'a Dön" : 'Back to Blog'}
                </Button>
              </Link>
            </motion.div>

            {/* Article Stats */}
            {/* <motion.div
              className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            > */}
            {/* <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{blog.views} {language === 'tr' ? 'görüntülenme' : 'views'}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{blog.commentsCount} {language === 'tr' ? 'yorum' : 'comments'}</span>
                </div>
              </div> */}

            {/* Share Button */}

            {/* <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'tr' ? 'Paylaş' : 'Share'}
                </Button>
                
                {showShareMenu && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                        LinkedIn
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {language === 'tr' ? 'Linki Kopyala' : 'Copy Link'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div> */}
            {/* </motion.div> */}

            {/* Article Content */}
            <motion.div
              className="prose prose-lg max-w-none mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-gray-700 leading-relaxed">
                {content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-gray-600 font-medium">
                  {language === 'tr' ? 'Etiketler:' : 'Tags:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              className="bg-gray-50 rounded-lg p-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  {author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {author}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'tr' ? 'Yazar' : 'Author'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'tr'
                  ? 'Kiosk teknolojileri ve dijital çözümler konusunda uzman yazar.'
                  : 'Expert writer specializing in kiosk technologies and digital solutions.'}
              </p>
            </motion.div>

            {/* Related Articles CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Link href="/blogs">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4"
                  style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                >
                  {language === 'tr'
                    ? 'Diğer Yazıları Görüntüle'
                    : 'View More Articles'}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
