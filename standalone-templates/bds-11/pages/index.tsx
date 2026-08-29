import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Agency Marketing OnePage',
    slug: 'agency-marketing-onepage',
    collectionSlug: 'agency-marketing-onepage',
  };

  return (
    <>
      <Head>
        <title>Agency Marketing OnePage — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Landing page 1 trang · Tối ưu chạy Ads · Chuyển đổi cao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
