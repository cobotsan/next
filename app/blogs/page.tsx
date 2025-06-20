'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, User, Clock, Eye, MessageCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import blogsData from '@/data/blogs.json'
import { slugify } from '@/lib/utils'

interface Blog {
  id: number
  title: string
  titletr?: string
  slug: string
  slugtr?: string
  author: string
  authortr?: string
  publishDate: string
  featuredImage: string
  excerpt: string
  excerpttr?: string
  categories: string[]
  categoriestr?: string[]
  tags: string[]
  tagstr?: string[]
  readTime: number
  commentsCount: number
  views: number
}

export default function BlogsPage() {
  const { language, t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    blogsData.forEach(blog => {
      const blogCategories = language === 'tr' && blog.categoriestr ? blog.categoriestr : blog.categories
      blogCategories.forEach(cat => categories.add(cat))
    })
    return Array.from(categories)
  }, [language])

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogsData.filter(blog => {
      const title = language === 'tr' && blog.titletr ? blog.titletr : blog.title
      const excerpt = language === 'tr' && blog.excerpttr ? blog.excerpttr : blog.excerpt
      const categories = language === 'tr' && blog.categoriestr ? blog.categoriestr : blog.categories
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || categories.includes(selectedCategory)
      
      return matchesSearch && matchesCategory
    })

    // Sort blogs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        case 'popularity':
          return b.views - a.views
        case 'comments':
          return b.commentsCount - a.commentsCount
        default:
          return 0
      }
    })

    return filtered
  }, [blogsData, searchTerm, selectedCategory, sortBy, language])

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage)
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const getBlogSlug = (blog: Blog) => {
    if (language === 'tr' && blog.slugtr) {
      return blog.slugtr
    }
    return blog.slug || slugify(blog.title)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Blog"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'tr' ? 'Blog' : 'Blog'}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'tr' 
              ? 'Kiosk teknolojisi ve endüstri trendleri hakkında en son haberler ve içgörüler'
              : 'Latest news and insights about kiosk technology and industry trends'
            }
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={language === 'tr' ? 'Blog yazılarında ara...' : 'Search blog posts...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              {language === 'tr' ? 'Filtreler' : 'Filters'}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">{language === 'tr' ? 'Tüm Kategoriler' : 'All Categories'}</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="date">{language === 'tr' ? 'Tarihe Göre' : 'Sort by Date'}</option>
                <option value="popularity">{language === 'tr' ? 'Popülerliğe Göre' : 'Sort by Popularity'}</option>
                <option value="comments">{language === 'tr' ? 'Yorumlara Göre' : 'Sort by Comments'}</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              className="lg:hidden mt-4 p-4 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Kategori' : 'Category'}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">{language === 'tr' ? 'Tüm Kategoriler' : 'All Categories'}</option>
                    {allCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Sıralama' : 'Sort By'}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="date">{language === 'tr' ? 'Tarihe Göre' : 'Sort by Date'}</option>
                    <option value="popularity">{language === 'tr' ? 'Popülerliğe Göre' : 'Sort by Popularity'}</option>
                    <option value="comments">{language === 'tr' ? 'Yorumlara Göre' : 'Sort by Comments'}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {language === 'tr' ? 'Arama kriterlerinize uygun blog yazısı bulunamadı.' : 'No blog posts found matching your criteria.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((blog, index) => {
                  const title = language === 'tr' && blog.titletr ? blog.titletr : blog.title
                  const excerpt = language === 'tr' && blog.excerpttr ? blog.excerpttr : blog.excerpt
                  const author = language === 'tr' && blog.authortr ? blog.authortr : blog.author
                  const categories = language === 'tr' && blog.categoriestr ? blog.categoriestr : blog.categories

                  return (
                    <motion.article
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                    >
                      <Link href={`/blogs/${getBlogSlug(blog)}`}>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={blog.featuredImage}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span
                              className="px-3 py-1 text-xs font-medium text-white rounded-full"
                              style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                            >
                              {categories[0]}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="mr-4">{formatDate(blog.publishDate)}</span>
                            <User className="w-4 h-4 mr-1" />
                            <span>{author}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{blog.readTime} {language === 'tr' ? 'dk' : 'min'}</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>{blog.views}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                <span>{blog.commentsCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      {language === 'tr' ? 'Önceki' : 'Previous'}
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? '' : 'hover:bg-gray-100'}
                        style={currentPage === page ? { backgroundColor: 'rgb(76, 169, 88)' } : {}}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      {language === 'tr' ? 'Sonraki' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}