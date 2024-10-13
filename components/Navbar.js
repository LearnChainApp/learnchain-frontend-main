// Navbar.js
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingBag, Library, PlusCircle, LogOut, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Navbar({ handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/images/learnchain.svg" alt="LearnChain Logo" width={30} height={30} />
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost" className="text-black" onClick={() => router.push('/marketplace')}>
          <ShoppingBag className="h-5 w-5 mr-2" /> Marketplace
        </Button>
        <Button variant="ghost" className="text-black" onClick={() => router.push('/my-courses')}>
          <Library className="h-5 w-5 mr-2" /> My Courses
        </Button>
        <Button variant="ghost" className="text-black" onClick={() => router.push('/create-course')}>
          <PlusCircle className="h-5 w-5 mr-2" /> Create a Course
        </Button>
        <Button onClick={handleLogout} variant="ghost" className="text-black">
          <LogOut className="h-5 w-5 mr-2" /> Logout
        </Button>
      </div>
      <div className="md:hidden">
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;