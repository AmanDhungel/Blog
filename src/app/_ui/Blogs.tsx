'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '../blogs/page';
import { CldImage } from 'next-cloudinary';
import DOMPurify from 'dompurify';

const Blogs = ({data} : {data : Blog[]} ) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      {data.map((item : Blog) => (
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg " key={item._id}>
          {/* Render the first image from the array */}
          {item.images && item.images[0]?.startsWith('https://') || item.images?.length === 0 ?  
          <Image
            src={item.images && item.images[0]? item.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600' } // Use the first image in the images array
            alt={item.title || 'Blog image'}
            width={600} // Adjust the width according to your layout needs
            height={400} // Adjust the height according to your layout needs
               className="rounded-md object-cover h-[15rem] w-[30rem]"
          />
          :
          <CldImage
          width="960"
          height="600"
          src={item.images && item?.images[0] ? item.images[0] : ''} // Use the first image in the images array
          sizes="100vw"
          alt="Description of my image"
           className="rounded-md object-cover h-[15rem] w-[30rem]"
        />
          }
          {/* Blog content */}
          <div className="bg-slate-200 p-4 flex flex-col gap-2 text-slate-900">
            <h1 className="text-lg font-bold capitalize tracking-wide">{item.title}</h1>
            <p className="w-52 h-7 text-ellipsis overflow-hidden">
              {item.titledesc ? item.titledesc : ''}
            </p>
            {/* Link to read more */}
            <Link
  href={`/blogs/${item._id}`}
  className="w-32 px-4 py-2 bg-slate-900 text-white font-semibold rounded-md shadow hover:bg-slate-700 transition duration-300"
>
  Read More
</Link>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
