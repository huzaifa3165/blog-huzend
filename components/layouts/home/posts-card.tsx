import React from "react";
import Link from "next/link";
interface PostCardProps {
  id: number;
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
}

const PostCard = ({
  id,
  title,
  category,
  description,
  bannerImg: {
    data: {
      attributes: { url: image },
    },
  },
  views,
  likes,
  slug,
}: PostCardProps) => {
  return (
    <div className="p-4 md:w-1/2 lg:w-1/3 ">
      <div className="h-full border-2 border-gray-600 border-opacity-60 rounded-lg overflow-hidden shadow-lg bg-gray-800">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={image}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400  mb-1">
            {category.data.attributes.category.toUpperCase()}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
            {title.length > 30 ? title.slice(0, 25) + "...." : title}
          </h1>
          <p className="leading-relaxed mb-3 dark:text-gray-300">
            {description.length > 90
              ? description.slice(0, 91) + "....."
              : description}
          </p>
          <div className="flex items-center flex-wrap ">
            <Link
              href={`/post/${slug}`}
              className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 hover:underline"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {views > 1000000
                ? `${Math.floor(views / 1000000)}M`
                : views > 1000
                ? `${Math.floor(views / 1000)}K`
                : views}
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              {likes > 1000000
                ? `${Math.floor(likes / 1000000)}M`
                : likes > 1000
                ? `${Math.floor(likes / 1000)}K`
                : likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
