import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Top Personal Broker',
    slug: 'personal-top-broker',
    collectionSlug: 'personal-top-broker',
  };

  return (
    <>
      <Head>
        <title>Top Personal Broker — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Profile thương hiệu cá nhân · Môi giới triệu đô · One Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
