'use client';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  description: string;
  images: string[];
  userId: string; // Added userId to the Blog type
}

interface User {
  _id: string;
  name: string;
  email: string;
  password? : string;
}

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = params;
  console.log(id)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: Blog }>(`/api/blogs/${id}`);
        const fetchedBlog = response.data.data;
        setBlog(fetchedBlog);
        console.log("fetched blogs", fetchedBlog)
        
        // After fetching the blog, fetch the user data using the userId
        if (fetchedBlog.userId) {
          const userResponse = await axios.get<{ data: User }>(`/api/login/${fetchedBlog.userId}`);
          const fetchedUser = {...userResponse.data.data, password: undefined};
          console.log('fetchedUser', fetchedUser);
          setUser(fetchedUser);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog or user:', error);
        setError('Failed to fetch the blog.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  console.log("user", user)

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
          <ExclamationCircleIcon className="w-16 h-16 text-red-500 mb-4" /> {/* Icon */}
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Error</h1>
          <p className="text-lg text-gray-500">{error}</p>
          <Link href='/blogs' className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
            Go Back
          </Link>
        </div>
      ) : blog ? (
        <div className="flex flex-col justify-center items-center gap-3">
          <Image
            src={blog.images[0] || 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'} 
            alt={blog.title}
            width={800}
            height={800}
            className="rounded-md object-cover h-[25rem] w-[50rem]"
          />
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <p className="text-lg">{blog.description}</p>
          {user && (
            <p className="text-sm text-gray-500">Posted by: {user.name} ({user.email})</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
          <ExclamationCircleIcon className="w-16 h-16 text-red-500 mb-4" /> {/* Icon */}
          <h1 className="text-3xl font-bold text-gray-700 mb-2">No Blog Found</h1>
          <p className="text-lg text-gray-500">Sorry, we could not find the blog you are looking for.</p>
          <Link href='/blogs' className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;


