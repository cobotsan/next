import { notFound } from 'next/navigation'
import productsData from '@/data/products.json'
import { slugify } from '@/lib/utils'
import ProductDetailClient from './ProductDetailClient'

export async function generateStaticParams() {
  const params = []
  for (const product of productsData) {
    params.push({ slug: product.slug || slugify(product.name) })
    if (product.slugtr) {
      params.push({ slug: product.slugtr })
    }
  }
  return params
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = productsData.find(p => {
    const enSlug = p.slug || slugify(p.name)
    const trSlug = p.slugtr || (p.nametr ? slugify(p.nametr) : '')
    return enSlug === params.slug || trSlug === params.slug
  })

  if (!product) return notFound()

  return <ProductDetailClient product={product} />
}
