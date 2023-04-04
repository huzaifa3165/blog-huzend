import HomeLayout from "@/components/layouts/home";
import PostWrapper from "@/components/layouts/home/posts-wrapper";
import axios from "axios";
interface postProps {
  data: {
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
  }[];
  meta: any;
  host: string;
}

const Popular = ({ posts }: { posts: postProps }) => {
  return (
    <HomeLayout isHome={true}>
      <PostWrapper {...posts} posts={posts.data} sort="popular" />
    </HomeLayout>
  );
};
export async function getStaticProps() {
  const host = "http://127.0.0.1:1337";
  const res = await axios.get(`${host}/api/posts?populate=*`);
  const data = await res.data;
  return {
    props: {
      posts: { ...data, host },
    },
    revalidate: 60,
  };
}

export default Popular;
