import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1',
    slug: 'portal-bds-so1',
    collectionSlug: 'portal-bds-so1',
  };

  return (
    <>
      <Head>
        <title>BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1 — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
