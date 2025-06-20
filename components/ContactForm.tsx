'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// needed for recaptcha types
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const { language } = useLanguage();
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const SITE_KEY = '6LdOzGcrAAAAAKVqBzdIZTPHz6xseczF3zb68Zik';

  useEffect(() => {
    if ('grecaptcha' in window) {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: 'submit' })
          .then((token: string) => {
            setRecaptchaToken(token);
          });
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('https://next-kiosk-contact.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, recaptchaToken }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      setSuccessMsg(language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent!');
      setFormState({ firstName: '', lastName: '', phone: '', company: '', email: '', message: '' });
      // onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleContactSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          id="firstName"
          value={formState.firstName}
          onChange={handleChange}
          required
          placeholder={language === 'tr' ? 'Adınız' : 'First Name'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
        <Input
          id="lastName"
          value={formState.lastName}
          onChange={handleChange}
          required
          placeholder={language === 'tr' ? 'Soyadınız' : 'Last Name'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          id="phone"
          value={formState.phone}
          onChange={handleChange}
          type="tel"
          placeholder={language === 'tr' ? 'Telefon numaranız' : 'Phone'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
        <Input
          id="company"
          value={formState.company}
          onChange={handleChange}
          placeholder={language === 'tr' ? 'Şirket adı' : 'Company'}
          className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
        />
      </div>

      <Input
        id="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        required
        placeholder={language === 'tr' ? 'E-posta adresiniz' : 'Email Address'}
        className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
      />

      <Textarea
        id="message"
        rows={6}
        value={formState.message}
        onChange={handleChange}
        required
        placeholder={
          language === 'tr' ? 'Mesajınızı buraya yazın...' : 'Tell us your message...'
        }
        className="mt-1 text-white placeholder-white bg-transparent border-white focus:ring-white focus:border-white"
      />

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {successMsg && <p className="text-green-500">{successMsg}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={loading || !recaptchaToken}
        className="w-full text-lg font-semibold text-white"
        style={{ backgroundColor: 'rgb(76, 169, 88)' }}
      >
        {loading
          ? language === 'tr' ? 'Gönderiliyor...' : 'Sending...'
          : language === 'tr' ? 'Mesaj Gönder' : 'Send Message'}
      </Button>
    </form>
  );
}
