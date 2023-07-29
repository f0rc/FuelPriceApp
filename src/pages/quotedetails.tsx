import React from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import { newQuoteSchema, type newQuoteSchemaType } from "~/pages/newquote/newquoteSchema";
import { useRouter } from "next/router";

const QuoteDetail: React.FC = () => {
  const router = useRouter()
  console.log(router.pathname, "hello")
  router.pathname
  return (
    <>
      <Head>
        <title>Quote Details</title>
      </Head>
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800"> Order ID:</h1>
          <p className="mb-6 text-lg text-gray-800">
            Gallon(s) Ordered: 
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Delivery Date:
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Delivery Address:
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Price Per Gallon:
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Total Price:
          </p>
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;
