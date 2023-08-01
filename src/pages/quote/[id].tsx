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
              <div className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Gallons Ordered:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </div>
              <div className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Delivery Date:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </div>
              <div className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Delivery Address:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </div>
              <div className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Price Per Gallon:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </div>
              <div className="mb-6 flex flex-row items-center text-lg text-gray-800">
                Total Price:{" "}
                <div className="animate-pulse pl-4">
                  <div className="mr-3 h-4 w-40 items-center justify-center rounded-full bg-gray-300 align-middle"></div>
                </div>
              </div>
            </>
          ) : isError ? (
            <>
              <div className="flex w-full justify-center">
                <div className="justify-center self-center text-red-400">
                  Something went wrong.
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 flex gap-2 text-lg text-gray-800">
                Gallon(s) Ordered:{" "}
                <div>{data.quote?.gallonsRequested.toString()}</div>
              </div>
              <div className="mb-6 flex gap-2 text-lg text-gray-800">
                Delivery Date:{" "}
                <p>{data.quote?.deliveryDate.toLocaleDateString()} </p>
              </div>
              <div className="mb-6 flex gap-2 text-lg text-gray-800">
                Delivery Address:{" "}
                <div>
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
                </div>
              </div>
              <div className="mb-6 flex gap-2 text-lg text-gray-800">
                Price Per Gallon:{" "}
                <div>{data.quote?.pricePerGallon.toString()} </div>
              </div>
              <div className="mb-6 flex gap-2 text-lg text-gray-800">
                Total Price: <div>{data.quote?.total.toString()} </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;
