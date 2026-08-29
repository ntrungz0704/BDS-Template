import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Minimal White Style (Sàn Novihome)',
    slug: 'minimal-white',
    collectionSlug: 'minimal-white',
  };

  return (
    <>
      <Head>
        <title>Minimal White Style (Sàn Novihome) — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Apple Minimalist · Căn hộ cao cấp Bắc Âu · Tinh tế" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
