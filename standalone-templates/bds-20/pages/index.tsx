import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 20 — Chung Cư Minh Khai & Times City',
    slug: 'minhkhai-timescity',
    collectionSlug: 'minhkhai-timescity',
  };

  return (
    <>
      <Head>
        <title>BĐS 20 — Chung Cư Minh Khai & Times City — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Chung cư Minh Khai · Times City · FAQ Accordion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
