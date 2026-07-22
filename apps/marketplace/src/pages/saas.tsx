import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SaasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/pricing');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-medium text-sm">
      Đang chuyển hướng đến trang Bảng giá...
    </div>
  );
}
