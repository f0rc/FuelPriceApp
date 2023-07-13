import React from "react";
import Head from "next/head";

const QuoteDetail: React.FC = () => {
  return (
    <>
      <Head>
        <title>Quote Details</title>
      </Head>
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800"> Pull data</h1>
          <p className="mb-6 text-lg text-gray-800">
            Gallons Requested:
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Delivery Date:
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Delivery Address:
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Price:
          </p>
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;