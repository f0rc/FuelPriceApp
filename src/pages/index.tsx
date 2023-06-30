import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fuel Prices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-28 flex justify-center">
        <div className="min-w-7x w-full">
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 z-0 flex flex-col items-start justify-center pt-10 opacity-40 blur-md">
              <h1 className="text-center text-7xl font-bold drop-shadow-2xl ">
                Unlock Exclusive kkkkkkkkk
              </h1>
              <h1 className="text-center text-7xl font-bold">
                Fuel Prices For
              </h1>
              <h1 className="text-center text-7xl font-bold">Your Location</h1>
              <h1 className="text-center text-7xl font-bold">Today!</h1>
            </div>
            <div className="z-10 flex flex-col items-start justify-center pt-10">
              <h1 className="text-center text-7xl font-bold drop-shadow-2xl ">
                Unlock Exclusive
              </h1>
              <h1 className="text-center text-7xl font-bold">
                Fuel Prices For
              </h1>
              <h1 className="text-center text-7xl font-bold">Your Location</h1>
              <h1 className="text-center text-7xl font-bold">Today!</h1>
            </div>
          </div>
          <div className="ml-2 mt-5 flex flex-row">
            <button className="group flex flex-row items-center gap-3 rounded-full border-4 border-dark-color bg-yellow-accent px-4 py-3 align-middle text-2xl font-bold text-dark-color hover:bg-yellow-300 focus:ring-4">
              Get My Quote Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4.5}
                stroke="currentColor"
                className="h-6 w-6 transform transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
