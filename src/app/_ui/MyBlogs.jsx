'use client';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import crypto from "crypto";


const generateSHA1 =(data) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const generateSignature = (publicId, apiSecret) => {
const timestamp = new Date().getTime();
return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const cloudApi = process.env.NEXT_SECRET_OF_CLOUD_API || 'eyI2m9Mhkp5DHjE6POwPBKaBogs';

console.log('public key', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('cloud secret', process.env.NEXT_SECRET_OF_CLOUD_API);

console.log(cloudApi)
const MyBlogs = ({ data }) => {
 const router = useRouter();
 const timestamp = new Date().getTime();
       async function handleDelete(id){
             try {
       const deletedata = await axios.delete(`/api/user/${id}`);
    if (deletedata?.data?.data?.images.length > 0) {
      for (let i = 0; i < deletedata?.data?.data?.images.length; i++) {
        if (deletedata?.data?.data?.images[i] && !deletedata?.data?.data?.images[i].startsWith('https://')) {
        // await cloudinary.v2.uploader.destroy(deletedata?.data?.data?.images[i]);
    }
  }
}
location.reload();
             } catch (error) {
                console.log(error)
             }
}

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      {data.map((item) => (
        <div className="w-1/4 min-w-[25rem] bg-white p-4 rounded-lg shadow-lg " key={item._id}>
          {/* Render the first image from the array */}
           {/* <Image
            src={item.images && item.images[0]? item.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600' } // Use the first image in the images array
            alt={item.title}
            width={600} // Adjust the width according to your layout needs
            height={400} // Adjust the height according to your layout needs
            className="rounded-md object-cover h-[15rem] w-[30rem]"
          /> */}
  {item.images[0]?.startsWith('https://') || item.images.length === 0 ? 
<Image
   src={item.images && item.images[0]? item.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600' } // Use the first image in the images array
   alt={item.title}
   width={600} // Adjust the width according to your layout needs
   height={400} // Adjust the height according to your layout needs
   className="rounded-md object-cover h-[15rem] w-[30rem]"
/> 
:
<CldImage
  width="960"
  height="600"
  src={item.images && item.images[0]? item.images[0] : 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600' } // Use the first image in the images array
  sizes="100vw"
  alt="Description of my image"
   className="rounded-md object-cover h-[15rem] w-[30rem]"
/>
  }
          {/* Blog content */}
          <div className="bg-slate-200 p-4 flex flex-col gap-2 text-slate-900 mt-[8px] rounded-xl">
            <h1 className="text-lg font-bold capitalize tracking-wide">{item.title}</h1>
            <p className="w-72 h-6 text-ellipsis overflow-hidden">
              {item.titledesc ? item.titledesc : item.title}
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
