import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Sàn Đấu Giá BĐS',
    slug: 'auction-platform',
    collectionSlug: 'auction-platform',
  };

  return (
    <>
      <Head>
        <title>Sàn Đấu Giá BĐS — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Đấu giá trực tuyến · Countdown · Tài sản phát mãi ngân hàng" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
