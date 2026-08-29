import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Grand Riverside Eco-Township',
    slug: 'industrial-estate',
    collectionSlug: 'industrial-estate',
  };

  return (
    <>
      <Head>
        <title>Grand Riverside Eco-Township — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Đại đô thị sinh thái 120ha · Căn hộ & Shophouse · Hồ cảnh quan 12ha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
