import HomeLayout from "@/components/layouts/home";
import SubsWrapper from "@/components/layouts/subscription/subs-wrapper";
import { useState, useEffect } from "react";
import useUser from "@/context/user/UserContext";
import axios from "axios";
interface subscriptionProps {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          url: string;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}

const Subscription = () => {
  const [subs, setSubs] = useState<subscriptionProps[] | null>(null);
  const { user } = useUser();
  const changeSubscriptions = async () => {
    if (user) {
      console.log(process.env.STRAPI_HOST);
      const res = await axios.get(
        `${process.env.STRAPI_HOST}/api/categories?populate=*`
      );
      const data: subscriptionProps[] = res.data.data.filter((data: any) => {
        let isUserSub = false;
        user.subscriptions.map((sub) => {
          if (sub.id == data.id) {
            isUserSub = true;
          }
        });
        return isUserSub;
      });
      setSubs(data);
    }
  };
  useEffect(() => {
    changeSubscriptions();
  }, [user?.subscriptions]);

  return (
    <HomeLayout isHome={true}>
      <>
        <SubsWrapper subscriptions={subs} />
      </>
    </HomeLayout>
  );
};

export default Subscription;
