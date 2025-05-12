'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <>
      <section className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mb-10 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-black dark:text-white">Blog Posts</h1>
                <Link href="/blog/create" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
                  + Create New
                </Link>
              </div>

              {blogs.length === 0 ? (
                <p className="text-gray-500">No blog posts found.</p>
              ) : (
                <ul className="space-y-6">
                  {blogs.map((blog) => (
                    <li key={blog._id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-dark">
                      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">{blog.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-3" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 150) + '...' }} />
                      <div className="text-sm text-gray-500 mb-2">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-4">
                        <Link href={`/blog/${blog._id}`} className="text-blue-600 hover:underline">View</Link>
                        <Link href={`/blog/${blog._id}/edit`} className="text-green-600 hover:underline">Edit</Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
