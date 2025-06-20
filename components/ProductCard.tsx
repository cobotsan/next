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
        <div
          className="
            relative bg-white rounded-lg shadow-md overflow-hidden product-card-hover cursor-pointer flex flex-col items-center
          "
        >
          {/*image container with max height */}
          <div
            className="relative w-full aspect-[1/1.2] overflow-hidden flex-shrink-0"
            style={{ maxHeight: 200, minHeight: 160 }}
          >
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 260px"
              style={{ objectPosition: 'top center' }}
            />
            <div className="product-card-overlay">
              <span>{t('products.viewDetails')}</span>
            </div>
          </div>
          <div className="p-2 md:p-4 w-full flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {productName}
              </h3>
              {/* <span className="text-base md:text-lg font-bold" style={{ color: 'rgb(76, 169, 88)' }}>
                {product.price}
              </span> */}
            </div>
            {/* <p className="text-xs text-gray-600 mb-1">{product.category}</p>
            <p className="text-gray-700 text-xs line-clamp-1 flex-1">
              {productDescription}
            </p> */}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}