import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Retail & Shophouse Podium',
    slug: 'retail-shophouse-podium',
    collectionSlug: 'retail-shophouse-podium',
  };

  return (
    <>
      <Head>
        <title>Retail & Shophouse Podium — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Shophouse khối đế · Mặt bằng kinh doanh · TTTM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
