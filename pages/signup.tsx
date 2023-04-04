import HomeLayout from "@/components/layouts/home";
import SignUpWrapper from "@/components/layouts/signup/signup-wrapper";

const SignUp = () => {
  return (
    <HomeLayout isHome={true}>
      <>
        <SignUpWrapper />
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

export default SignUp;
