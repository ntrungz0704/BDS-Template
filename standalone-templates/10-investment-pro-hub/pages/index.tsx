import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Investment Pro Hub',
    slug: 'investment-pro-hub',
    collectionSlug: 'investment-pro-hub',
  };

  return (
    <>
      <Head>
        <title>Investment Pro Hub — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Phân tích tài chính BĐS · Biểu đồ giá · Máy tính ROI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
