import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';

export const runtime = process.env.CF_PAGES_URL ? 'edge' : undefined;

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return { notFound: true };
  }

  const title = page.data.title || 'Applio Documentation';
  const description = page.data.description || 'Documentation for the most used voice cloning tool in the world.';
  const image = '/banner.png';

  return {
    title, 
    description,
    openGraph: {
      title, 
      description,
      images: [image], 
      url: `https://docs.applio.org/${params.slug?.join('/')}`,  
      type: 'website', 
    },
    twitter: {
      card: 'summary_large_image', 
      title, 
      description,  
      image,  
    },
  };
}


export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}