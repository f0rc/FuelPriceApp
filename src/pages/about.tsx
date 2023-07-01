import React from 'react';
import Head from 'next/head';

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About FUEL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About FUEL</h1>
          <p className="text-lg text-gray-800 mb-6">
            FUEL is an application dedicated to providing customers with
            up-to-date fuel (gas) prices based on their location. We strive to
            offer the most accurate and competitive pricing information, helping
            you make informed decisions about fuel purchases.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Our platform uses advanced algorithms and real-time data to provide
            reliable fuel price information tailored to your area. Whether you
            are looking for the lowest prices or want to compare different fuel
            options, we've got you covered.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Stay connected with FUEL to get the latest updates on fuel prices
            and make the most of your fueling decisions. Start saving today!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
