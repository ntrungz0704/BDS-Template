import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Pannamera Eco-Village Bảo Lộc',
    slug: 'villa-royal-garden',
    collectionSlug: 'villa-royal-garden',
  };

  return (
    <>
      <Head>
        <title>Pannamera Eco-Village Bảo Lộc — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Làng sinh thái 900m biển · Đất vườn săn mây · Sổ đỏ thổ cư có sẵn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
