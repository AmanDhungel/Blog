import { CldUploadWidget } from 'next-cloudinary';


import React, { useState } from 'react'

const UploadWidget = () => {
  const [resource, setResource] = useState([]);

  console.log("resource", resource)

  return (
    <CldUploadWidget uploadPreset="blogImg" 
    onSuccess={(result, { widget }) => {
      setResource((prev) => [...prev, result?.info.public_id]); 
      console.log(result);
      // { public_id, secure_url, etc }
    }}
    onQueuesEnd={(result, { widget }) => {
      widget.close();
    }}
  >
    {({ open }) => {
      return (
        <button onClick={() => open()} className='bg-amber-800 p-3 text-white mt-2 rounded-lg'>
          Upload an Image
        </button>
      );
    }}
  </CldUploadWidget>
  )
}

export default UploadWidget
 
