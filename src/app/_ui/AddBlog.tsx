'use client'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Blogs from './Blogs';
import axios, { AxiosResponse } from 'axios';
import { Blog } from '../blogs/page';

const AddBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response : AxiosResponse<Blog[]> = await axios.get<Blog[]>('http://localhost:3000/api/blogs');
          setBlogs(response.data);
          setLoading(false);
        } catch (error: any) {
          console.error('Error fetching blogs:', error);
          setLoading(false);
        }
      };
      fetchBlogs();
    }, []);
    
    
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
  )
}

export default AddBlog