import { markdownToHtml } from "@/utils/markdownToHtml";
import { marked } from "marked";
import { useEffect, useState } from "react";

interface BlogProps {
  title: string;
  description: string;
  author: string;
  views: number;
  likes: number;
  category: string;
  content: string;
  date: string;
  image: string;
  authorImage: string;
  host: string;
}

function formatDate(dateString: string) {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

const Blog = (props: BlogProps) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    markdownToHtml(props.content).then((res) => {
      setContent(res);
    });
  }, []);
  return (
    <article className="mt-16 p-4">
      <div className="tracking-widest text-xs title-font font-medium">{`${formatDate(
        props.date
      )} / ${props.category.toUpperCase()}`}</div>
      <h1 className=" font-sans mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {props.title}
      </h1>

      <div className="flex items-center space-x-4 mb-6">
        <img
          className="w-10 h-10 rounded-full"
          src={props.authorImage}
          alt={props.title}
        />
        <div className="font-medium dark:text-white">
          <div>{props.author}</div>
        </div>
      </div>

      <img
        className=" h-auto max-w-full rounded-xl mb-6"
        src={props.image}
        alt={props.title}
      />

      <div
        className="p-3 text-lg font-sans font-normal tracking-wide"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};

export default Blog;
