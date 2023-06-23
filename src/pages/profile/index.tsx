import React from "react";

const Profile = () => {
  const STATES = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  return (
    <form action="/">
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
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                maxLength={50}
                placeholder="John/Jane Doe"
                className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="address1"
                className="text-xs font-semibold uppercase"
              >
                Address Line1:
              </label>
              <input
                type="text"
                name="address1"
                id="address1"
                required
                maxLength={100}
                className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address2"
                className="text-xs font-semibold uppercase"
              >
                Address LINE2: &#40;optional&#41;
              </label>
              <input
                type="text"
                name="address2"
                id="address2"
                maxLength={100}
                className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-xs font-semibold uppercase">
                city:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                maxLength={100}
                className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="state"
                className="text-xs font-semibold uppercase"
              >
                State:
              </label>
              <select id="state" defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>
                  State
                </option>

                {STATES.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="zipcode"
                className="text-xs font-semibold uppercase"
              >
                Zipcode:
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                required
                minLength={5}
                maxLength={9}
                placeholder="XXXXX"
                className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              />
            </div>

            <div className="mt-5 flex flex-col gap-1">
              <button
                type="submit"
                className="rounded-2xl border-4 border-black bg-yellow-accent p-4 text-xl font-semibold uppercase hover:bg-yellow-300"
              >
                Update User Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
