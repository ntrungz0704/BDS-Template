import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Classic Heritage Architecture',
    slug: 'classic-heritage',
    collectionSlug: 'classic-heritage',
  };

  return (
    <>
      <Head>
        <title>Classic Heritage Architecture — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Tân cổ điển Châu Âu · Lâu đài quý phái · Indochine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
