import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function StudioPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/templates');
  }, [router]);
  return null;
}
