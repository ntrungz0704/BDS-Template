import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành',
    slug: 'bds123-benthanh-portal',
    collectionSlug: 'bds123-benthanh-portal',
  };

  return (
    <>
      <Head>
        <title>BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="Sàn Đấu Giá Bến Thành · Phân tầng khu vực · Lưới 4 cột" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
