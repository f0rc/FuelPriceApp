import React from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const QuoteDetail = () => {
  const router = useRouter();

  if (!router.query.id || typeof router.query.id !== "string") return null;

  const { data, isLoading, isError } = api.detail.getQuoteDetails.useQuery({
    id: router.query.id,
  });

  return (
    <>
      <Head>
        <title>Quote Details</title>
      </Head>

      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Order Details
          </h1>

          {isLoading ? (
            <>
              <p className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Gallons Ordered:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </p>
              <p className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Delivery Date:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </p>
              <p className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Delivery Address:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </p>
              <p className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Price Per Gallon:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </p>
              <p className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Total Price:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </p>
            </>
          ) : isError ? (
            <>
              <div className="flex w-full justify-center">
                <p className="justify-center self-center text-red-400">
                  Something went wrong.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="mb-6 flex gap-2 text-lg text-gray-800">
                Gallon(s) Ordered:{" "}
                <p>{data.quote?.gallonsRequested.toString()}</p>
              </p>
              <p className="mb-6 flex gap-2 text-lg text-gray-800">
                Delivery Date:{" "}
                <p>{data.quote?.deliveryDate.toLocaleDateString()} </p>
              </p>
              <p className="mb-6 flex gap-2 text-lg text-gray-800">
                Delivery Address:{" "}
                <p>
                  {data.quote?.deliveryAddressStreet2 ? (
                    <>
                      {data.quote?.deliveryAddressStreet}{" "}
                      {data.quote?.deliveryAddressStreet2},{" "}
                      {data.quote?.deliveryAddressCity},{" "}
                      {data.quote?.deliveryAddressState}{" "}
                      {data.quote?.deliveryAddressZipcode}
                    </>
                  ) : (
                    <>
                      {data.quote?.deliveryAddressStreet}{" "}
                      {data.quote?.deliveryAddressCity},{" "}
                      {data.quote?.deliveryAddressState}{" "}
                      {data.quote?.deliveryAddressZipcode}
                    </>
                  )}
                </p>
              </p>
              <p className="mb-6 flex gap-2 text-lg text-gray-800">
                Price Per Gallon:{" "}
                <p>{data.quote?.pricePerGallon.toString()} </p>
              </p>
              <p className="mb-6 flex gap-2 text-lg text-gray-800">
                Total Price: <p>{data.quote?.total.toString()} </p>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;
