import { useEffect } from 'react';
import { useRouter } from 'next/router';
import customers from '../data/customers.json';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first customer
    if (customers.length > 0) {
      router.replace(`/${customers[0].slug}`);
    }
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <p>Redirecting...</p>
    </div>
  );
}
