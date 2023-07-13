import React from "react";
import Head from "next/head";

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About FUEL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            About FUEL
          </h1>
          <p className="mb-6 text-lg text-gray-800">
            FUEL is an application dedicated to providing customers with
            up-to-date fuel (gas) prices based on their location. We strive to
            offer the most accurate and competitive pricing information, helping
            you make informed decisions about fuel purchases.
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Our platform uses advanced algorithms and real-time data to provide
            reliable fuel price information tailored to your area. Whether you
            are looking for the lowest prices or want to compare different fuel
            options, we&apos;ve got you covered.
          </p>
          <p className="mb-6 text-lg text-gray-800">
            Stay connected with FUEL to get the latest updates on fuel prices
            and make the most of your fueling decisions. Start saving today!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
