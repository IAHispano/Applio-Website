"use client"
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const locale = useLocale();
    const t = useTranslations("home");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      window.location.href = `${locale}/share?search=${encodeURIComponent(searchTerm)}`;
    };

    return (
        <form onSubmit={handleSubmit} className='justify-center items-center flex mt-24 z-50 gap-4 md:mx-44 mx-12'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("search_placeholder")}
          className='bg-white/10 rounded-lg px-4 py-2 w-full'
        />
        <button type="submit" className='bg-white/30 rounded-lg px-4 py-2'>{t("search")}</button>
      </form>
    )
}