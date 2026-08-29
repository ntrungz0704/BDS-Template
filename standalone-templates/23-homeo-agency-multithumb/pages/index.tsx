import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo',
    slug: 'homeo-agency-multithumb',
    collectionSlug: 'homeo-agency-multithumb',
  };

  return (
    <>
      <Head>
        <title>BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Sàn nhà phố Homeo · Card đa ảnh · Cẩm nang người mua" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
