'use client';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DOMPurify from "dompurify";
import { useRouter } from 'next/navigation';
import Blogs from '@/app/_ui/Blogs';

interface Blog {
  _id: string;
  title: string;
  titledesc: string,
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

  const router = useRouter();

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

  console.log(blog?.images);

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
        <div className='flex justify-center w-full'>
        <div className='flex flex-col mb-10 ml-28'>
        <button onClick={() => router.back()} className='p-3 bg-sky-500 h-12 w-24 items-center rounded-xl ml-auto mr-auto mb-5 text-center'>Go Back</button>
        <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl font-bold bg-gradient-to-tr from-emerald-600 via-emerald-400 to-emerald-200 bg-clip-text text-transparent">Title: {blog.title}</h1>
        {blog.images[0]?.startsWith('https://') || blog.images?.length === 0 ?  
          <Image
            src={blog.images[0]?.startsWith('"https://') || blog.images?.length > 0 ? blog.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'} 
            alt={blog.title}
            width={800}
            height={800}
            className="rounded-md object-cover h-[25rem] w-[50rem]"
          />
          : 
          <CldImage
          width="960"
          height="600"
          src={blog.images && blog.images[0]? blog.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600' } // Use the first image in the images array
          sizes="100vw"
          alt="Description of my image"
           className="rounded-md object-cover h-[15rem] w-[30rem]"
        />

        }
          <p className="text-lg">{blog.titledesc}</p>
          <p className="text-lg" dangerouslySetInnerHTML={{__html : blog.description}}></p>
         <div className='flex flex-col gap-3'>
          <div className='flex gap-3'>
          {blog.images[1]?.startsWith('https://') || blog.images?.length === 0 || blog.images[2] == undefined?  
          // <div className='flex gap-3'>
         <Image
            src={blog.images[1] ? blog.images[1] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'} 
            alt={blog.title}
            width={400}
            height={800}
            className="rounded-md object-cover h-[20rem] w-[15rem]"
            /> 
            :   
            <CldImage
            width="260"
            height="1000"
            src={blog.images[1] ? blog.images[1] : ''} // Use the first image in the images array
            sizes="100vw"
            alt="Description of my image"
             className="rounded-md object-cover h-[19rem] max-w-[30rem]"
          /> }
          {blog.images[2]?.startsWith('https://') || blog.images?.length === 0 || blog.images[2] == undefined ?  
         <Image
            src={blog.images[2] ? blog.images[2] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'} 
            alt={blog.title}
            width={800}
            height={800}
            className="rounded-md object-cover h-[20rem] w-[34.4rem]"
          /> 
          :
          // <div className='flex gap-3'>
          <CldImage
          width="260"
          height="1000"
          src={blog.images[2]? blog.images[2] : ''} // Use the first image in the images array
          sizes="100vw"
          alt="Description of my image"
           className="rounded-md object-cover h-[19rem] w-[33.1rem]"
        />
             }
         
          {/* </div> */}

          </div>
          <div className='flex gap-3'>
         <Image
            src={blog.images[3] || 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'} 
            alt={blog.title}
            width={800}
            height={800}
            className="rounded-md object-fill h-[18rem] w-[20rem]"
            /> 
         <Image
            src={blog.images[4] || 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'} 
            alt={blog.title}
            width={800}
            height={800}
            className="rounded-md object-fill h-[18rem] w-[29.4rem]"
            /> 
            </div>
            </div>
         
        </div>
        </div>
        {user && (
          <div className='absolute right-12 top-20 h-24 bg-gradient-to-r from-blue-800 to-blue-950 rounded-xl'>
            <p className="text-lg my-5 p-5  text-white rounded-xl h-16 sticky capitalize">Posted by: {user.name}</p>
          </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
          <ExclamationCircleIcon className="w-16 h-16 text-red-500 mb-4" /> {/* Icon */}
          <h1 className="text-3xl font-bold text-gray-700 mb-2">No Blog Found</h1>
          <p className="text-lg text-gray-500">Sorry, we could not find the blog you are looking for.</p>
          <button onClick={() => router.back()} className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;


