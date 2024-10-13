'use client'

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/withAuth';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Library, PlusCircle, LogOut, Menu, X } from 'lucide-react';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    files.forEach((file) => formData.append('material', file));

    try {
      const response = await axios.post('https://learnchain-backend.onrender.com/api/content', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        const courseUUID = response.data.courseUUID;
        router.push(`/my-courses/${courseUUID}`);
      } else {
        toast({
          description: response.data?.message || 'Failed to create course.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        description: error.message || 'Error creating course.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      {/* Header */}
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Create a New Course</h1>
        <p className="text-lg text-gray-600">Fill in the details below to add a new course to the blockchain ecosystem.</p>
      </header>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price (in Arbitrum)</label>
            <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">Course Material (up to 12 files)</label>
            <div className="relative border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition duration-200 ease-in-out">
              <label htmlFor="material" className="cursor-pointer block text-center text-blue-600 hover:text-blue-800">Select Files</label>
              <Input type="file" id="material" multiple onChange={handleFileChange} required className="absolute inset-0 opacity-0 cursor-pointer" />
              {files.length > 0 && (
                <ul className="mt-2 list-disc list-inside">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-gray-800">{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-full mt-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all ease-in-out duration-200" disabled={loading}>
            {loading ? 'Creating Course...' : 'Create Course'}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default withAuth(CreateCourse);