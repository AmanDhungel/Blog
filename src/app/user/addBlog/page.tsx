'use client';
import { useState } from 'react';
import axios from 'axios';
import { jwtVerify } from 'jose';
import { getCookies } from 'cookies-next';
import { useCookies } from 'next-client-cookies';
import { revalidatePath } from 'next/cache';

const BlogForm = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {

    // const {payload} = await jwtVerify()

    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
     

      const response = await axios.post('https://blog-7stbd7isa-amandhungels-projects.vercel.app/api/blogs', {
        title,
        description,
        images,
      });

      setSuccess('Blog added successfully!');
      setTitle('');
      setDescription('');
      setImages([]);
      window.location.href ='/blogs'
    } catch (err) {
      setError('Failed to add blog. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full bg-slate-900 p-3 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full bg-slate-900 p-3 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Images (URLs, separated by commas)
          </label>
          <input
            type="text"
            id="images"
            value={images.join(',')}
            onChange={(e) => setImages(e.target.value.split(',').map(url => url.trim()))}
            className="mt-1 block w-full bg-slate-900 p-3 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-300"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
      </form>
    </div>
  );
};

export default BlogForm;
