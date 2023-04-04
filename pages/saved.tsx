import HomeLayout from "@/components/layouts/home";
import PostsWrapper from "@/components/layouts/home/posts-wrapper";
import useUser from "@/context/user/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
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
interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
const Saved = () => {
  const [posts, setPosts] = useState<postProps[]>([]);
  const { user } = useUser();

  const changePosts = async () => {
    if (user) {
      console.log(process.env.STRAPI_HOST);
      const res = await axios.get(
        `${process.env.STRAPI_HOST}/api/posts?populate=*`
      );
      const data: postProps[] = res.data.data.filter((data: any) => {
        let isUserSub = false;
        user.savedPosts.map((sub) => {
          if (sub.id == data.id) {
            isUserSub = true;
          }
        });
        return isUserSub;
      });
      setPosts(data);
    }
  };
  useEffect(() => {
    changePosts();
  }, [user?.savedPosts]);
  return (
    <HomeLayout isHome={true}>
      <PostsWrapper posts={posts} sort="latest" />
    </HomeLayout>
  );
};

export default Saved;
