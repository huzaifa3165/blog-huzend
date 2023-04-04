import Link from "next/link";
import React from "react";
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

const SubsCard = ({ data }: { data: subscriptionProps }) => {
  return (
    <Link href="#" className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer">
      <div className="h-full border-2 border-gray-600 border-opacity-60 rounded-lg overflow-hidden shadow-lg">
        <div className="max-w-xs">
          <div className="bg-white dark:bg-gray-800 hover:dark:bg-gray-700  hover:bg-gray-100 transition shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-36 h-36 rounded-full mx-auto"
                src={`${process.env.STRAPI_HOST}${data.attributes.image.data.attributes.url}`}
                alt={data.attributes.image.data.attributes.alternativeText}
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 dark:text-gray-100 font-medium leading-8">
                {data.attributes.category}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubsCard;
