import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Modern Corporate Pro',
    slug: 'modern-corporate',
    collectionSlug: 'modern-corporate',
  };

  return (
    <>
      <Head>
        <title>Modern Corporate Pro — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Tập đoàn BĐS · Tổng công ty · Sàn lớn 100+ nhân sự" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
