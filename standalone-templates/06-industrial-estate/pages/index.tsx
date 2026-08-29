import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Industrial & Logistics Park',
    slug: 'industrial-estate',
    collectionSlug: 'industrial-estate',
  };

  return (
    <>
      <Head>
        <title>Industrial & Logistics Park — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Khu công nghiệp · Nhà xưởng xây sẵn · Kho vận B2B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
