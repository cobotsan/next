'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const { language } = useLanguage();
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  // todo: create with https://www.google.com/recaptcha/admin/create
  // useEffect(() => {
  //   if ('grecaptcha' in window) {
  //     window.grecaptcha.ready(() => {
  //       window.grecaptcha
  //         .execute('YOUR_SITE_KEY', { action: 'submit' })
  //         .then((token: string) => {
  //           setRecaptchaToken(token);
  //         });
  //     });
  //   }
  // }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting with reCAPTCHA token:', recaptchaToken);
    onClose();
  };

  return (
    <form onSubmit={handleContactSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          id="firstName"
          required
          placeholder={language === 'tr' ? 'Adınız' : 'First Name'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
        <Input
          id="lastName"
          required
          placeholder={language === 'tr' ? 'Soyadınız' : 'Last Name'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          id="phone"
          type="tel"
          placeholder={language === 'tr' ? 'Telefon numaranız' : 'Phone'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
        <Input
          id="company"
          placeholder={language === 'tr' ? 'Şirket adı' : 'Company'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
      </div>

      <Input
        id="email"
        type="email"
        required
        placeholder={language === 'tr' ? 'E-posta adresiniz' : 'Email Address'}
        className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
      />

      <Textarea
        id="message"
        rows={6}
        required
        placeholder={
          language === 'tr'
            ? 'Mesajınızı buraya yazın...'
            : 'Tell us your message...'
        }
        className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full text-lg font-semibold text-white"
        style={{ backgroundColor: 'rgb(76, 169, 88)' }}
      >
        {language === 'tr' ? 'Mesaj Gönder' : 'Send Message'}
      </Button>
    </form>
  );
}
