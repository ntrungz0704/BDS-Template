import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Mega Developer Portal',
    slug: 'mega-developer-portal',
    collectionSlug: 'mega-developer-portal',
  };

  return (
    <>
      <Head>
        <title>Mega Developer Portal — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Cổng thông tin Đa dự án · Quan hệ cổ đông Tập đoàn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
