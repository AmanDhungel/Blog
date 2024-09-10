'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MyBlogs from '../../_ui/MyBlogs.jsx';
const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blog-7stbd7isa-amandhungels-projects.vercel.app/api/user');
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
    <div className='flex flex-wrap justify-center w-11/12 gap-4 ml-20'>
      <MyBlogs data={blogs} />
    </div>
  );
};

export default Page;
