import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Villa Royal Garden',
    slug: 'villa-royal-garden',
    collectionSlug: 'villa-royal-garden',
  };

  return (
    <>
      <Head>
        <title>Villa Royal Garden — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Biệt thự đơn lập sân vườn · Sơ đồ mặt bằng · 3D Tour" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
