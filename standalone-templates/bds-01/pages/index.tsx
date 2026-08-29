import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Luxury Gold Style (Dinh Thự Hoàng Gia)',
    slug: 'luxury-gold',
    collectionSlug: 'luxury-gold',
  };

  return (
    <>
      <Head>
        <title>Luxury Gold Style (Dinh Thự Hoàng Gia) — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Biệt thự · Penthouse · Dinh thự dát vàng hoàng gia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
