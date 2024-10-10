import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}