'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const MyBlogs = ({ data }) => {
       async function handleDelete(id){
             try {
                const deletedata = await axios.delete(`/api/user/${id}`) 
                window.location.reload();
             } catch (error) {
                console.log(error)
             }
        }
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      {data.map((item) => (
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg " key={item._id}>
          {/* Render the first image from the array */}
          <Image
            src={item.images && item.images[0]? item.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600' } // Use the first image in the images array
            alt={item.title}
            width={600} // Adjust the width according to your layout needs
            height={400} // Adjust the height according to your layout needs
            className="rounded-md object-cover h-[15rem] w-[30rem]"
          />
          {/* Blog content */}
          <div className="bg-slate-200 p-4 flex flex-col gap-2 text-slate-900">
            <h1 className="text-lg font-bold capitalize tracking-wide">{item.title}</h1>
            <p className="w-52 h-12 text-ellipsis overflow-hidden">
              {item.description}
            </p>
            {/* Link to read more */}
            <div className='flex justify-between'>

            <Link
  href={`/blogs/${item._id}`}
  className="w-32 px-4 py-2 bg-slate-900 text-white font-semibold rounded-md shadow hover:bg-slate-700 transition duration-300"
>
  Read More
</Link>
            <button
            onClick={() => handleDelete(item._id)}
  className="w-32 px-4 py-2 bg-red-900 text-white font-semibold rounded-md shadow hover:bg-red-700 transition duration-300"
>
Delete
</button>
    </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;
