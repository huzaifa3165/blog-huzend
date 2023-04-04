import React from "react";
import PostCard from "./posts-card";
interface postProps {
  id: number;
  attributes: {
    title: string;
    description: string;
    author: string;
    content: string;
    views: number;
    likes: number;
    category: {
      data: {
        attributes: {
          category: string;
        };
      };
    };
    slug: string;
    updatedAt: string;
    authorImg: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    bannerImg: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const PostsWrapper = ({
  posts,
  sort,
}: {
  posts: postProps[];
  sort?: "popular" | "latest" | "trending";
}) => {
  const sortArray = (a: postProps, b: postProps) => {
    switch (sort) {
      case "trending":
        return b.attributes.likes - a.attributes.likes;
      case "popular":
        return b.attributes.views - a.attributes.views;
      case "latest":
      default:
        return (
          new Date(b.attributes.updatedAt).getTime() -
          new Date(a.attributes.updatedAt).getTime()
        );
    }
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {posts.sort(sortArray).map((post) => (
              <PostCard key={post.id} id={post.id} {...post.attributes} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostsWrapper;
