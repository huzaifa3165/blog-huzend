import HomeLayout from "@/components/layouts/home";
import LoginWrapper from "@/components/layouts/login/login-wrapper";

const SignIn = () => {
  return (
    <HomeLayout isHome={true}>
      <>
        <LoginWrapper />
      </>
    </HomeLayout>
  );
};
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 86400,
  };
}

export default SignIn;
