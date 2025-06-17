import { PostDataType } from "@/data/types";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import Link from "next/link";
import { Route } from "next";
import Image from "next/image";
import Badge from "@/shared/Badge";
import { DEMO_POSTS } from "@/data/posts";
import PostSlider from "./blogSlider";
import BlogSlider from "./blogSlider";

const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 14);

const Blog = () => {

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-4 md:py-12 lg:py-16"
    >
      <div className="">
        <div>
          <h2 className="text-2xl font-semibold text-silverGray">Our Latest Blogs</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`Find homes you can afford.`}
          </span>
        </div>
        <div className="w-50 border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
        <BlogSlider categories={DEMO_POSTS} itemPerRow={4}/>
      </div>
    </section>
  );
};

export default Blog;
