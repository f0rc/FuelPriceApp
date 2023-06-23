import React from "react";

const newquote = () => {
  return (
    <div className="mt-14 flex justify-center align-middle">
      <div className="min-w-fit border-4 border-black p-10">
        <h1 className="mb-10 text-center">
          <span className="text-3xl font-bold">New Quote</span>
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fuelType"
              className="text-xs font-semibold uppercase"
            >
              Gallons Requested:
            </label>
            <input
              type="number"
              name="fuelType"
              id="fuelType"
              placeholder="123"
              className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fuelType"
              className="text-xs font-semibold uppercase"
            >
              Delivery Date:
            </label>
            <input
              type="date"
              name="fuelType"
              id="fuelType"
              className="flex flex-col justify-center rounded-2xl border-4 border-black bg-white p-4 align-middle "
              placeholder="12/12/2023"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fuelType"
              className="text-xs font-semibold uppercase"
            >
              Delivery Address:
            </label>
            <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4">
              <span className="text-start">123 yellow dr</span>
              <span className="text-start">Houston, TX 77001</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fuelType"
              className="text-xs font-semibold uppercase"
            >
              Price Per Gallon:
            </label>
            <div className="flex flex-col rounded-2xl border-4 border-black bg-white p-4">
              <span className="text-start">$1.50</span>
            </div>
          </div>
          <div className="ml-2 mt-5 flex flex-col gap-1">
            <label
              htmlFor="fuelType"
              className="text-md font-semibold uppercase"
            >
              Total Price:
            </label>
            <div className="flex flex-col p-4">
              <span className="text-start text-xl font-semibold">$100.50</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-1">
            <button className="rounded-2xl border-4 border-black bg-yellow-accent p-4 text-xl font-semibold uppercase hover:bg-yellow-300">
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default newquote;
