import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { slugify } from '@/lib/utils'

interface Product {
  id: number
  name: string
  nametr?: string
  slug?: string
  slugtr?: string
  category: string
  price: string
  image: string
  description: string
  descriptiontr?: string
}

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { language, t } = useLanguage()

  const productName = language === 'tr' && product.nametr ? product.nametr : product.name
  const productDescription = language === 'tr' && product.descriptiontr ? product.descriptiontr : product.description
  
  // Get the appropriate slug based on current language
  const getProductSlug = () => {
    if (language === 'tr' && product.slugtr) {
      return product.slugtr
    }
    return product.slug || slugify(product.name)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${getProductSlug()}`}>
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden product-card-hover cursor-pointer">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="product-card-overlay">
              <span>{t('products.viewDetails')}</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {productName}
              </h3>
              <span className="text-lg font-bold" style={{ color: 'rgb(76, 169, 88)' }}>
                {product.price}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{product.category}</p>
            <p className="text-gray-700 text-sm line-clamp-2">
              {productDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}