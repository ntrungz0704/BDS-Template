import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: 'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam',
    slug: 'realtybuild-tech-portal',
    collectionSlug: 'realtybuild-tech-portal',
  };

  return (
    <>
      <Head>
        <title>BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="RealtyBuild Tech Portal · Icon Pills · 6 Thành phố lớn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
