import Blog from "@/components/layouts/post/blog";
import HomeLayout from "@/components/layouts/home";

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

const Post = ({ post }: { post: postProps }) => {
  const data = post.data[0].attributes;
  return (
    <HomeLayout isHome={false}>
      <Blog
        title={data.title}
        description={data.description}
        author={data.author}
        views={data.views}
        likes={data.likes}
        category={data.category.data.attributes.category}
        content={data.content}
        date={data.updatedAt}
        image={data.bannerImg.data.attributes.url}
        authorImage={data.authorImg.data.attributes.url}
        host={post.host}
      />
    </HomeLayout>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://127.0.0.1:1337/api/posts");
  const posts = await res.json();
  const paths = posts.data.map((post: any) => ({
    params: { post: post.attributes.slug },
  }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params }: any) {
  const host = "http://127.0.0.1:1337";
  const res = await fetch(
    `${host}/api/posts?filters[slug][$eq]=${params.post}&populate=*`
  );
  const post = await res.json();
  return { props: { post: { ...post, host } } };
}
export default Post;
