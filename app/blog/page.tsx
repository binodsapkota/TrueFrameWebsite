"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleBlog from "@/components/Blog/SingleBlog";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
   
      try {
        axios.get(`http://localhost:5000/api/blogs?page=${currentPage}&limit=6`)
        .then((response)=>{

        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
        })
        
        ;  // Customize limit
        
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    

    
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogs?.map((blog) => (
              <div key={blog.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} />
                <span>{blog.imageUrl}</span>
              </div>
            ))}
          </div>

          <div className="wow fadeInUp -mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                {/* Prev Button */}
                {currentPage > 1 && (
                  <li className="mx-1">
                    <a
                      href="#0"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                    >
                      Prev
                    </a>
                  </li>
                )}

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className="mx-1">
                    <a
                      href="#0"
                      onClick={() => handlePageChange(index + 1)}
                      className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white ${currentPage === index + 1 ? 'bg-primary text-white' : ''}`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                {/* Next Button */}
                {currentPage < totalPages && (
                  <li className="mx-1">
                    <a
                      href="#0"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                    >
                      Next
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
