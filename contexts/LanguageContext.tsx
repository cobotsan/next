'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'tr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.custom': 'Custom Kiosk',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    
    // Hero Section
    'hero.title': 'Next Generation Kiosk Solutions',
    'hero.subtitle': 'Transform your business with our innovative, customizable kiosk systems designed for modern enterprises.',
    'hero.cta': 'Explore Kiosks',
    
    // Featured Section
    'featured.title': 'Why Choose Next Kiosk?',
    'featured.innovation.title': 'Innovation First',
    'featured.innovation.desc': 'Cutting-edge technology meets elegant design in every kiosk we create.',
    'featured.customization.title': 'Full Customization',
    'featured.customization.desc': 'Tailor every aspect to match your brand and operational needs.',
    'featured.support.title': '24/7 Support',
    'featured.support.desc': 'Comprehensive support and maintenance services for uninterrupted operation.',
    
    // Homepage blogs
    'home.latestBlogs': 'Latest Blog Posts',
    'home.viewAllBlogs': 'View All',

    // Products
    'products.title': 'Our Kiosk Solutions',
    'products.subtitle': 'Discover our comprehensive range of kiosk solutions designed for various industries.',
    'products.viewDetails': 'View Details',
    
    // Contact Form
    'contact.title': 'Contact Us Today',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.submit': 'Send Message',
    
    // Footer
    'footer.company': 'Next Kiosk Solutions',
    'footer.description': 'Leading provider of innovative kiosk solutions for modern businesses.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Info',
    'footer.email': 'info@nextkiosk.com',
    'footer.phone': '+90 (212) 555-0123',
    'footer.rights': 'All rights reserved.',
    
    // About Us
    'about.title': 'About Next Kiosk',
    'about.subtitle': 'Leading the future of interactive kiosk solutions',
    'about.story.title': 'Our Story',
    'about.story.content': 'Founded in 2020, Next Kiosk has been at the forefront of kiosk innovation, providing cutting-edge solutions to businesses worldwide.',
    'about.mission.title': 'Our Mission',
    'about.mission.content': 'To revolutionize customer interaction through innovative, reliable, and customizable kiosk solutions.',
    'about.values.title': 'Our Values',
    'about.values.innovation': 'Innovation',
    'about.values.quality': 'Quality',
    'about.values.service': 'Service',

    // About Page Stats
    'about.stats.kiosks': 'Kiosks Deployed',
    'about.stats.countries': 'Countries Served',
    'about.stats.clients': 'Happy Clients',
    'about.stats.years': 'Years Experience',

    // About Page Values Descriptions
    'about.values.innovation.desc': 'We continuously push the boundaries of kiosk technology.',
    'about.values.quality.desc': 'Every product meets our rigorous quality standards.',
    'about.values.service.desc': 'Customer satisfaction is at the heart of everything we do.',

    // About Page Story
    'about.story.commitment': 'Our commitment to innovation and customer satisfaction has made us a trusted partner for businesses looking to enhance their customer experience through technology.',

    // About Page Mission
    'about.mission.belief': 'We believe that technology should enhance human interaction, not replace it. Our kiosks are designed to streamline processes while maintaining the personal touch that customers value.',
 
    // Custom Kiosk
    'custom.title': 'Custom Kiosk Solutions',
    'custom.subtitle': 'Tailored to your unique business needs',
    'custom.process.title': 'Our Process',
    'custom.process.consultation': 'Consultation',
    'custom.process.design': 'Design',
    'custom.process.development': 'Development',
    'custom.process.delivery': 'Delivery',
    'custom.benefits.title': 'Benefits of Customization',
    'custom.cta': 'Request Custom Quote',
    
    // Showcase Section (New Additions)
    'showcase.title': 'Innovative Design Meets Functionality',
    'showcase.description': 'Our kiosks are designed with both aesthetics and performance in mind. Each unit combines sleek, modern design with robust functionality to deliver exceptional user experiences across various industries.',
    'showcase.feature1': 'Premium materials and construction',
    'showcase.feature2': 'Advanced touchscreen technology',
    'showcase.feature3': 'Customizable software solutions',
    
    // CTA Section (New Additions)
    'cta.title': 'Ready to Transform Your Business?',
    'cta.description': 'Discover how our innovative kiosk solutions can enhance your customer experience and streamline your operations.',
    'cta.viewProducts': 'View Products',
    'cta.customSolutions': 'Custom Solutions',

    // 3D Model Viewer (New Additions)
    'modelviewer.title': 'Interactive Kiosk Showcase',
    'modelviewer.description': 'Explore our kiosk in 3D with interactive controls to view its design and features from every angle, highlighting its innovative interactive capabilities.',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.products': 'Ürünler',
    'nav.custom': 'Özel Kiosk',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    
    // Hero Section
    'hero.title': 'Yeni Nesil Kiosk Çözümleri',
    'hero.subtitle': 'Modern işletmeler için tasarlanmış yenilikçi, özelleştirilebilir kiosk sistemlerimizle işinizi dönüştürün.',
    'hero.cta': 'Kioskleri Keşfedin',
    
    // Featured Section
    'featured.title': 'Neden Next Kiosk?',
    'featured.innovation.title': 'İnovasyon Öncelikli',
    'featured.innovation.desc': 'Yarattığımız her kioskte son teknoloji zarif tasarımla buluşuyor.',
    'featured.customization.title': 'Tam Özelleştirme',
    'featured.customization.desc': 'Markanıza ve operasyonel ihtiyaçlarınıza göre her detayı uyarlayın.',
    'featured.support.title': '7/24 Destek',
    'featured.support.desc': 'Kesintisiz operasyon için kapsamlı destek ve bakım hizmetleri.',

    // Homepage blogs
    'home.latestBlogs': 'Son Blog Yazıları',
    'home.viewAllBlogs': 'Tümünü Gör',
    
    // Products
    'products.title': 'Kiosk Çözümlerimiz',
    'products.subtitle': 'Çeşitli endüstriler için tasarlanmış kapsamlı kiosk çözümlerimizi keşfedin.',
    'products.viewDetails': 'Detayları Görüntüle',
    
    // Contact Form
    'contact.title': 'Bugün Bizimle İletişime Geçin',
    'contact.name': 'Ad Soyad',
    'contact.email': 'E-posta',
    'contact.phone': 'Telefon',
    'contact.message': 'Mesaj',
    'contact.submit': 'Mesaj Gönder',
    
    // Footer
    'footer.company': 'Next Kiosk Çözümleri',
    'footer.description': 'Modern işletmeler için yenilikçi kiosk çözümlerinin önde gelen sağlayıcısı.',
    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.contact': 'İletişim Bilgileri',
    'footer.email': 'info@nextkiosk.com',
    'footer.phone': '+90 (212) 555-0123',
    'footer.rights': 'Tüm hakları saklıdır.',
    
    // About Us
    'about.title': 'Next Kiosk Hakkında',
    'about.subtitle': 'İnteraktif kiosk çözümlerinin geleceğine öncülük ediyoruz',
    'about.story.title': 'Hikayemiz',
    'about.story.content': '2020 yılında kurulan Next Kiosk, kiosk inovasyonunun ön saflarında yer alarak dünya çapında işletmelere en son teknoloji çözümler sunmaktadır.',
    'about.mission.title': 'Misyonumuz',
    'about.mission.content': 'İnovatif, güvenilir ve özelleştirilebilir kiosk çözümleri ile müşteri etkileşimini devrimleştirmek.',
    'about.values.title': 'Değerlerimiz',
    'about.values.innovation': 'İnovasyon',
    'about.values.quality': 'Kalite',
    'about.values.service': 'Hizmet',

    // About Page Stats
    'about.stats.kiosks': 'Kurulan Kiosk',
    'about.stats.countries': 'Hizmet Verilen Ülke',
    'about.stats.clients': 'Mutlu Müşteri',
    'about.stats.years': 'Yıllık Deneyim',

    // About Page Values Descriptions
    'about.values.innovation.desc': 'Kiosk teknolojisinin sınırlarını sürekli zorluyoruz.',
    'about.values.quality.desc': 'Her ürünümüz titiz kalite standartlarımızı karşılar.',
    'about.values.service.desc': 'Müşteri memnuniyeti her şeyin merkezindedir.',

    // About Page Story
    'about.story.commitment': 'İnovasyon ve müşteri memnuniyetine olan bağlılığımız, teknolojiyi kullanarak müşteri deneyimini geliştirmek isteyen işletmeler için güvenilir bir ortak olmamızı sağladı.',

    // About Page Mission
    'about.mission.belief': 'Teknolojinin insan etkileşimini geliştirmesi gerektiğine inanıyoruz, yerine geçmemeli. Kiosklarımız, müşterilerin değer verdiği kişisel dokunuşu korurken süreçleri kolaylaştırmak için tasarlanmıştır.',
  
    // Custom Kiosk
    'custom.title': 'Özel Kiosk Çözümleri',
    'custom.subtitle': 'Benzersiz iş ihtiyaçlarınıza özel tasarım',
    'custom.process.title': 'Sürecimiz',
    'custom.process.consultation': 'Danışmanlık',
    'custom.process.design': 'Tasarım',
    'custom.process.development': 'Geliştirme',
    'custom.process.delivery': 'Teslimat',
    'custom.benefits.title': 'Özelleştirmenin Avantajları',
    'custom.cta': 'Özel Teklif İsteyin',
    
    // Showcase Section (New Additions)
    'showcase.title': 'İnovatif Tasarım Fonksiyonellikle Buluşuyor',
    'showcase.description': 'Kiosklarımız hem estetik hem de performans göz önünde bulundurularak tasarlanmıştır. Her ünite, çeşitli endüstrilerde olağanüstü kullanıcı deneyimleri sunmak için şık, modern tasarımla sağlam işlevselliği birleştirir.',
    'showcase.feature1': 'Premium malzemeler ve yapım',
    'showcase.feature2': 'Gelişmiş dokunmatik ekran teknolojisi',
    'showcase.feature3': 'Özelleştirilebilir yazılım çözümleri',
    
    // CTA Section (New Additions)
    'cta.title': 'İşinizi Dönüştürmeye Hazır mısınız?',
    'cta.description': 'İnovatif kiosk çözümlerimizin müşteri deneyiminizi nasıl geliştirebileceğini ve operasyonlarınızı nasıl optimize edebileceğini keşfedin.',
    'cta.viewProducts': 'Ürünleri Görüntüle',
    'cta.customSolutions': 'Özel Çözümler',

    // 3D Model Viewer (New Additions)
    'modelviewer.title': 'Etkileşimli Kiosk Sergisi',
    'modelviewer.description': 'Kioskumuzu 3D olarak keşfedin ve her açıdan tasarımını ve özelliklerini incelemek için etkileşimli kontrollerle yenilikçi etkileşim yeteneklerini vurgulayın.',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}