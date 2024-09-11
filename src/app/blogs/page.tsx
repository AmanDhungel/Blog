'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Blogs from '../_ui/Blogs';

export type Blog = {
_id?: string,
title?: string,
description?: string,
images?: string[],
updateAt?: string,
__v? : number
}

const Page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Fetches the list of blogs from the server and updates the state
     *
     * On success, sets the `blogs` state to the response data and sets
     * `loading` to false.
     *
     * On error, logs the error to the console and sets `loading` to false.
     */
    const fetchBlogs = async () => {
      try {
        const response : AxiosResponse<Blog[]> = await axios.get<Blog[]>('/api/blogs');
        console.log('response', response.data);
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
      <Blogs data={blogs} />
    </div>
  );
};

export default Page;


