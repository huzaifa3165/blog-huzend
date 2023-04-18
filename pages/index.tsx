import HomeLayout from "@/components/layouts/home";
import PostsWrapper from "@/components/layouts/home/posts-wrapper";
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
}

const Home = ({ posts }: { posts: postProps }) => {
  return (
    <HomeLayout isHome={true}>
      <PostsWrapper posts={posts.data} sort="latest" />
    </HomeLayout>
  );
};
export async function getStaticProps() {
  const host = process.env.STRAPI_HOST;
  const res = await axios.get(`${host}/api/posts?populate=*`);
  const data = await res.data;
  return {
    props: {
      posts: { ...data },
    },
    revalidate: 60,
  };
}

export default Home;
