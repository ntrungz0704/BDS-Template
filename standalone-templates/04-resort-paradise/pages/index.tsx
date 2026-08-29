import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Resort Paradise Style',
    slug: 'resort-paradise',
    collectionSlug: 'resort-paradise',
  };

  return (
    <>
      <Head>
        <title>Resort Paradise Style — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="BĐS biển · Biệt thự đảo · Condotel · Second Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
