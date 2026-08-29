import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 22 — ZoHotels & Happy Land Nha Trang',
    slug: 'happyland-zohotels-nhatrang',
    collectionSlug: 'happyland-zohotels-nhatrang',
  };

  return (
    <>
      <Head>
        <title>BĐS 22 — ZoHotels & Happy Land Nha Trang — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Căn hộ nghỉ dưỡng biển · ZoHotels · Ưu đãi 50%" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
