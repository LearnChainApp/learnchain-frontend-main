'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Change import to useRouter from next/router
import { withAuth } from '@/components/withAuth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import axios from 'axios';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { courseUUID } = router.query; // Get courseUUID from URL parameters

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseUUID) return; // Ensure courseUUID is available
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://learnchain-backend.onrender.com/api/content/${courseUUID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCourse(response.data);
        } else {
          console.error('Failed to fetch course details', response);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseUUID]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Course not found or you do not have access.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Detalhes do curso</h1>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="relative w-full h-60 mb-6">
            <Image src="/images/31343C.png" alt="Course Placeholder" layout="fill" objectFit="cover" className="rounded" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
          <p className="text-sm text-gray-700 mb-2">{course.description}</p>
          <p className="text-sm text-gray-800 font-semibold mb-1">Author: {course.author}</p>
          <p className="text-lg font-bold text-gray-900 mb-4">Price: {course.price} Arbitrum</p>
          {course.cids && course.cids.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Unlocked Downloadable Content:</h3>
              <ul className="list-disc list-inside">
                {course.cids.map((cid, index) => (
                  <li key={index}>
                    <a
                      href={`https://ipfs.io/ipfs/${cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download Content {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button onClick={() => router.push("/my-courses")} variant="outline" className="mt-4 border-black text-black hover:bg-gray-200">
            Back to My Courses
          </Button>
        </div>
      </section>

      <footer className="bg-white shadow-inner py-6 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} LearnChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default withAuth(CourseDetail);
