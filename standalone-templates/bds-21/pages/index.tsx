import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội',
    slug: 'hanoi-rental-portal',
    collectionSlug: 'hanoi-rental-portal',
  };

  return (
    <>
      <Head>
        <title>BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Cho thuê chung cư Hà Nội · 5 Quận trọng điểm · Giá tốt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
