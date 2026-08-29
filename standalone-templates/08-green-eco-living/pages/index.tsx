import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Green Eco Living',
    slug: 'green-eco-living',
    collectionSlug: 'green-eco-living',
  };

  return (
    <>
      <Head>
        <title>Green Eco Living — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Đô thị sinh thái xanh · Ecopark · Chuẩn Xanh ESG" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
