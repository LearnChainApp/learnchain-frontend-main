'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/withAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Menu, X, Library, PlusCircle, LogOut } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

function Marketplace() {
  const [userName, setUserName] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }

    // Fetch courses data from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://learnchain-backend.onrender.com/api/content');
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/images/learnchain.svg" alt="LearnChain Logo" width={30} height={30} />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-black">
            <Library className="h-5 w-5 mr-2" /> Library
          </Button>
          <Button variant="ghost" className="text-black">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          <Button variant="ghost" className="w-full text-black mb-2">
            <Library className="h-5 w-5 mr-2" /> Library
          </Button>
          <Button variant="ghost" className="w-full text-black mb-2">
            <PlusCircle className="h-5 w-5 mr-2" /> Create a Course
          </Button>
          <Button onClick={handleLogout} variant="ghost" className="w-full text-black">
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to LearnChain, {userName}!</h1>
        <p className="text-lg text-gray-600">Explore our marketplace to find and share courses within the blockchain ecosystem.</p>
      </header>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="relative w-full h-40 mb-4">
                  <Image src="/images/31343C.png" alt="Course Placeholder" layout="fill" objectFit="cover" className="rounded-t" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-2">{course.description}</p>
                <p className="text-sm text-gray-800 font-semibold mb-1">Author: {course.author}</p>
                <p className="text-lg font-bold text-gray-900 mb-4">Price: {course.price} Arbitrum</p>
                <Button
                  variant="outline"
                  className="mt-4 border-black text-black hover:bg-gray-200"
                  onClick={() => setSelectedCourse(course)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Course Details Modal */}
      {selectedCourse && (
        <Dialog open={true} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">{selectedCourse.title}</DialogTitle>
<div className="relative w-full h-40 my-4">
  <Image src="/images/31343C.png" alt="Course Placeholder" layout="fill" objectFit="cover" className="rounded" />
</div>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-gray-700 my-4">{selectedCourse.description}</p>
              <p className="text-sm text-gray-800 font-semibold mb-2">Author: {selectedCourse.author}</p>
              <p className="text-lg font-bold text-gray-900 mb-4">Price: {selectedCourse.price} Arbitrum</p>
              <Button
                variant="primary"
                className="bg-black text-white hover:bg-gray-800"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post(`https://learnchain-backend.onrender.com/api/content/buy/${selectedCourse.uuid}`, {}, {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    });
                    if (response.status === 200) {
                      alert('Token minted and deposited. Redirecting to course page...');
                      window.location.href = `https://learnchain-backend.onrender.com/api/content/${selectedCourse.uuid}`;
                    } else if (response.status === 404) {
                      alert('Course not found.');
                    } else if (response.status === 500) {
                      alert('Error while minting token. Please try again later.');
                    }
                  } catch (error) {
                    console.error('An error occurred while buying the course:', error);
                    alert('An error occurred. Please try again later.');
                  }
                }}
              >
                Buy Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="bg-white shadow-inner py-6 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} LearnChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default withAuth(Marketplace);