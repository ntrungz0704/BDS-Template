import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số',
    slug: 'nhadatso-density-portal',
    collectionSlug: 'nhadatso-density-portal',
  };

  return (
    <>
      <Head>
        <title>BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Mật độ cao · Lọc 6 tiêu chí · Phong thủy nhà đất" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
