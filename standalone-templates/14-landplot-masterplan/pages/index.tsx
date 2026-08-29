import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'Dự Án Đất Nền Phân Lô',
    slug: 'landplot-masterplan',
    collectionSlug: 'landplot-masterplan',
  };

  return (
    <>
      <Head>
        <title>Dự Án Đất Nền Phân Lô — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Đất nền phân lô · Sơ đồ quy hoạch 1/500 · Báo giá F1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
