import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Smart Urban City (An Viên Nha Trang)',
    slug: 'smart-urban-city',
    collectionSlug: 'smart-urban-city',
  };

  return (
    <>
      <Head>
        <title>Smart Urban City (An Viên Nha Trang) — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Căn hộ chung cư · Đại đô thị thông minh · Metro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
