import { api } from "~/utils/api";
import React from "react";
import Router from "next/router";

const ProfileDisplay = () => {
  const profile = api.profile.profileById.useQuery();
  const data = profile.data;
  console.log(data);
  return (
    <div>
      <div className="mt-14 flex justify-center align-middle">
        <div className="min-w-fit border-4 border-black p-10">
          <h1 className="mb-10 text-center">
            <span className=" text-3xl font-bold">User Profile</span>
          </h1>
          <div className="grid gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className="text-xs font-semibold uppercase"
              >
                Full Name:
              </label>
              <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle">
                {data?.profile?.name}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address1"
                className="text-xs font-semibold uppercase"
              >
                Address Line1:
              </label>
              <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle">
                {data?.profile?.address1}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address2"
                className="text-xs font-semibold uppercase"
              >
                Address LINE2: &#40;optional&#41;
              </label>
              <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle">
                {data?.profile?.address2}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-xs font-semibold uppercase">
                city:
              </label>
              <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle">
                {data?.profile?.city}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="state"
                className="text-xs font-semibold uppercase"
              >
                State:
              </label>
              <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle">
                {data?.profile?.state}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="zipcode"
                className="text-xs font-semibold uppercase"
              >
                Zipcode:
              </label>
              <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle">
                {data?.profile?.zipcode}
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <button
                onClick={() => Router.push("/profile")}
                className="rounded-2xl border-4 border-black bg-yellow-accent p-4 text-xl font-semibold uppercase hover:bg-yellow-300"
              >
                Update User Information
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div> */}
    </div>
  );
};

export default ProfileDisplay;
