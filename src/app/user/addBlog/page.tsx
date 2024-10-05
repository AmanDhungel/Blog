'use client';
import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import UploadWidget from '../../_ui/UploadWidget'
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


interface BlogData{
  title: string;
  description: string;
  images: string[];
}

const BlogForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [titleDesc, setTitleDesc] = useState<string>('');
  const [resource, setResource] = useState<any[]>([]);
  const [content, setContent] = useState('');


  const handleSubmit = async () => {
    // const {payload} = await jwtVerify()
    if(resource.length < 1 || content === '' || title === '' ){
      return toast.error('Please fill in all fields');
    }
      const response : AxiosResponse<BlogData> = await axios.post<BlogData>('/api/blogs', {
        title,
        titledesc: titleDesc,
        description: content,
        images : resource,
      });
      setTitle('');
      setContent('')
      router.push('/user/myBlogs') ;
      router.refresh();
      toast.success('Blog added successfully');
}

const mutation = useMutation({mutationFn: handleSubmit})

const createBlog = (e: React.FormEvent) => {
  e.preventDefault();
  mutation.mutate();
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    [{ color: [] }],
    ['code-block'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'align',
  'color',
  'code-block',
];

const handleEditorChange = (newContent) => {
  setContent(newContent);
};

const {error, isPending, isSuccess} = mutation;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Add New Blog</h2>
      <form onSubmit={createBlog}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            maxLength={30}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full bg-white-900 p-3 text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-white">
            Title Description (Less than 35 and more than 20 words)
          </label>
          <input
            type="text"
            minLength={20}
            maxLength={35}
            id="title"
            value={titleDesc}
            onChange={(e) => setTitleDesc(e.target.value)}
            required
            className="mt-1 block w-full bg-white-900 p-3 text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-20 h-[12.5rem]">
          <label htmlFor="editor" className="block text-lg font-medium text-white">
            Description
          </label>
           <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            id='editor'
            className="h-[10rem] mb-20 mt-3 bg-white text-black"
          />
        </div>

        <div className="flex flex-col gap-3 my-4">
          <label htmlFor="images" className="block text-sm font-medium text-white-700">
           Upload Images 
          </label>
          <CldUploadWidget uploadPreset="blogImg" 
            onSuccess={(result : any) => {
              setResource((prev) => [...prev, result?.info?.public_id] as never[]); 
              console.log(result);
              // { public_id, secure_url, etc }
            }}
            onQueuesEnd={(result, { widget }) => {
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <button onClick={(e) => {e.preventDefault(); open()}} className='bg-amber-800 p-3 text-white mt-2 rounded-lg w-52'>
                  Upload an Image
                </button>
              );
            }}
  </CldUploadWidget>
        </div>
         <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-300"
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error.message}</p>}
        {isSuccess && <p className="mt-4 text-green-500">{isSuccess}</p>}
      </form>
    </div>
  );
};

export default BlogForm;


