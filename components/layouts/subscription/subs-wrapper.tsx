import React from "react";
import SubsCard from "./subs-card";
import useUser from "@/context/user/UserContext";
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
const SubsWrapper = ({
  subscriptions,
}: {
  subscriptions: subscriptionProps[] | null;
}) => {
  const { user } = useUser();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {subscriptions
              ? subscriptions.map((data) => {
                  return <SubsCard key={data.id} data={data} />;
                })
              : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubsWrapper;
