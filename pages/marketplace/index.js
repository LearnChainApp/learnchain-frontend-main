'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/withAuth';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Marketplace() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to the Marketplace, {userName}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This is a protected route. Only authenticated users can see this page.</p>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(Marketplace);