'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Lightbulb, Wrench, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CustomKioskPage() {
  const { t, language } = useLanguage()

  const processSteps = [
    {
      icon: Users,
      title: t('custom.process.consultation'),
      description: 'We understand your unique requirements and business goals.',
    },
    {
      icon: Lightbulb,
      title: t('custom.process.design'),
      description: 'Our team creates a custom design tailored to your needs.',
    },
    {
      icon: Wrench,
      title: t('custom.process.development'),
      description: 'We develop and manufacture your custom kiosk solution.',
    },
    {
      icon: Truck,
      title: t('custom.process.delivery'),
      description: 'Installation and support to ensure smooth operation.',
    },
  ]

  const benefits = [
    'Brand-specific design and colors',
    'Custom software integration',
    'Specialized hardware configurations',
    'Industry-specific compliance',
    'Scalable solutions for multiple locations',
    'Ongoing support and maintenance',
  ]

// Quote form state
  const [quoteForm, setQuoteForm] = useState({
    company: '',
    industry: '',
    contactName: '',
    contactEmail: '',
    quantity: '',
    requirements: '',
  })
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [quoteError, setQuoteError] = useState('')
  const [quoteSuccess, setQuoteSuccess] = useState('')

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteForm({ ...quoteForm, [e.target.id]: e.target.value })
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteLoading(true)
    setQuoteError('')
    setQuoteSuccess('')

    try {
      const res = await fetch('https://next-kiosk-contact.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: quoteForm.contactName,
          lastName: '',
          phone: '',
          company: quoteForm.company,
          email: quoteForm.contactEmail,
          message:
            `Industry: ${quoteForm.industry}\n` +
            `Estimated Quantity: ${quoteForm.quantity}\n` +
            `Requirements: ${quoteForm.requirements}`,
          recaptchaToken: '', // No recaptcha for quote form, or add if you want
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      setQuoteSuccess(language === 'tr' ? 'Teklif talebiniz başarıyla gönderildi!' : 'Your quote request has been sent!')
      setQuoteForm({
        company: '',
        industry: '',
        contactName: '',
        contactEmail: '',
        quantity: '',
        requirements: '',
      })
    } catch (err: any) {
      setQuoteError(err.message || 'Failed to send quote request')
    } finally {
      setQuoteLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Custom Kiosk Solutions"
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
            {t('custom.title')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('custom.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('custom.process.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="relative mb-6">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                      style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('custom.benefits.title')}
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6" style={{ color: 'rgb(76, 169, 88)' }} />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
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
                  src="https://images.pexels.com/photos/4968639/pexels-photo-4968639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Custom Kiosk Benefits"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('custom.cta')}
              </h2>
              <p className="text-gray-600">
                Tell us about your project and we'll provide a custom quote
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" value={quoteForm.company} onChange={handleQuoteChange} required />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" value={quoteForm.industry} onChange={handleQuoteChange} required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input id="contactName" value={quoteForm.contactName} onChange={handleQuoteChange} required />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input id="contactEmail" type="email" value={quoteForm.contactEmail} onChange={handleQuoteChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Estimated Quantity</Label>
                  <Input id="quantity" type="number" min="1" value={quoteForm.quantity} onChange={handleQuoteChange} required />
                </div>
                <div>
                  <Label htmlFor="requirements">Project Requirements</Label>
                  <Textarea
                    id="requirements"
                    rows={6}
                    value={quoteForm.requirements}
                    onChange={handleQuoteChange}
                    placeholder="Please describe your custom kiosk requirements, including size, features, industry needs, and any specific customizations..."
                    required
                  />
                </div>
                {quoteError && <p className="text-red-500">{quoteError}</p>}
                {quoteSuccess && <p className="text-green-500">{quoteSuccess}</p>}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg"
                  style={{ backgroundColor: 'rgb(76, 169, 88)' }}
                  disabled={quoteLoading}
                >
                  {quoteLoading
                    ? language === 'tr' ? 'Gönderiliyor...' : 'Sending...'
                    : language === 'tr' ? 'Teklif Gönder' : 'Submit Quote Request'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}