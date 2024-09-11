'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MyBlogs from '../../_ui/MyBlogs.jsx';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import Link from 'next/link.js';
/**
 * Page component for the user's myBlogs page
 *
 * Fetches the user's blogs on mount and displays a loading animation
 * if the data is still being fetched. If the user has no blogs, displays
 * an empty state message with a link to add a new blog.
 */

type Blog = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  userId: string;
  __v: number;
  updateAt: string;
}
const Page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Fetches the user's blogs from the server and sets the state
     *
     * On success, sets the `blogs` state to the response data and sets
     * `loading` to false.
     *
     * On error, logs the error to the console and sets `loading` to false.
     */
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/user');
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array to fetch data on component mount

   
  if (loading) {
    return   <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
    <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
  </div>;
  }

  return (
      blogs && blogs.length > 0 ?
    <div className='flex flex-wrap justify-center w-11/12 gap-4 ml-20'>
      <MyBlogs data={blogs} />
    </div> : <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
          <ExclamationCircleIcon className="w-16 h-16 text-red-500 mb-4" /> {/* Icon */}
          <h1 className="text-3xl font-bold text-gray-700 mb-2">No Blog Found</h1>
          <p className="text-lg text-gray-500">Sorry, You have not poseted any blogs.</p>
          <Link href='/user/addBlog' className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
            Add Blog
          </Link>
        </div>
  );
};

export default Page;


