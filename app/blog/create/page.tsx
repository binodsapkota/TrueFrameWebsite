'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogCreatePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (!image) {
      alert('Image is required');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', content);
    formData.append('tags', data.tags || '');
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/blog');
    } catch (err) {
      console.error('Blog creation failed', err);
    }
  };

  return (
    <section className="pt-36 pb-16 lg:pt-[180px] lg:pb-28">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              {...register('title', { required: true })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Blog title"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Content</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
            {!content && <p className="text-red-500 text-sm mt-1">Content is required</p>}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Tags (comma separated)</label>
            <input
              {...register('tags')}
              className="w-full border px-4 py-2 rounded"
              placeholder="e.g., Design, Development"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Publish
          </button>
        </form>
      </div>
    </section>
  );
}
