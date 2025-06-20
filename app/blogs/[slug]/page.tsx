import { notFound } from 'next/navigation'
import blogsData from '@/data/blogs.json'
import { slugify } from '@/lib/utils'
import BlogDetailClient from './BlogDetailClient'

export async function generateStaticParams() {
  const params = []
  for (const blog of blogsData) {
    params.push({ slug: blog.slug || slugify(blog.title) })
    if (blog.slugtr) {
      params.push({ slug: blog.slugtr })
    }
  }
  return params
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogsData.find(b => {
    const enSlug = b.slug || slugify(b.title)
    const trSlug = b.slugtr || (b.titletr ? slugify(b.titletr) : '')
    return enSlug === params.slug || trSlug === params.slug
  })

  if (!blog) return notFound()

  return <BlogDetailClient blog={blog} />
}