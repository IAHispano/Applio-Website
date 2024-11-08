import { redirect } from "next/navigation"

export default function Home() {

  redirect('/applio')

  return <></>
}

export function generateMetadata() {
  return {
    title: 'Applio Documentation',
    description: 'Documentation for the most used voice cloning tool in the world.',
    image: '/banner.png',
    openGraph: {
      title: 'Applio Documentation',
      description: 'Documentation for the most used voice cloning tool in the world.',
      images: ['https://docs.applio.org/banner.png'],
      url: 'https://docs.applio.org/applio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Applio Documentation',
      description: 'Documentation for the most used voice cloning tool in the world.',
      image: 'https://docs.applio.org/banner.png',
    },
  };
}
