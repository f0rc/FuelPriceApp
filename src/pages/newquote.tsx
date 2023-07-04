import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useSession } from "./auth/SessionProvider";

export const newQuoteSchema = z.object({
  gallonsRequested: z
    .number({
      invalid_type_error: "Please enter only numbers",
    })
    .nonnegative("must request at least 1 gallon(s)")
    .min(1, "must request at least 1 gallon(s)"),
  deliveryDate: z.coerce.date().refine((data) => data > new Date(), {
    message: "Delivery must be in the future",
  }),
  pricePerGallon: z.number(),
});

export type newQuoteSchemaType = z.infer<typeof newQuoteSchema>;

const Newquote = () => {
  // const { session } = useSession();
  //TODO: add security check to see if a session exists else route to login

  const { mutateAsync } = api.quote.getPreNewQuote.useMutation({
    onSuccess: () => {
      console.log("MONEY");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // setError, TODO
    setValue,
  } = useForm<newQuoteSchemaType>({
    resolver: zodResolver(newQuoteSchema),
  });

  const submitForm = async (data: newQuoteSchemaType) => {
    try {
      console.log(data);
      await mutateAsync(data);
    } catch (e) {
      console.log(e);
    }
  };

  // fetching user profile
  const userProfile = api.auth.getUserAddress.useQuery();

  const pricePerGallon = api.quote.getPricePerGallon.useMutation({
    onSuccess: (data) => {
      setValue("pricePerGallon", data.suggestedPrice);
      // setValue("total", data.suggestedPrice);
    },
  });

  const handleGetPricePerGallon = async (data: newQuoteSchemaType) => {
    try {
      await pricePerGallon.mutateAsync(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative mt-14 flex w-full flex-row items-center  justify-center border-2 border-red-500">
      <div className="absolute inset-x-72 inset-y-40 ml-40 flex w-fit flex-col border-4 border-black bg-gray-200 p-4">
        <span>
          {" "}
          1. Click Get Quote to generate a preliminary price for your Order. 2.{" "}
        </span>
        <span>2. Click Submit Order to place the order.</span>
      </div>
      <div className="relative z-10 flex  align-middle ">
        <div className="min-w-fit border-4 border-black p-10">
          <h1 className="mb-10 text-center">
            <span className="text-3xl font-bold">New Quote</span>
            {errors.root ? (
              <p className="text-sm text-red-500">
                {errors.root.serverError?.message}
              </p>
            ) : (
              ""
            )}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-red-500">
                {errors.gallonsRequested?.message}
              </p>
              <label
                htmlFor="fuelType"
                className="text-xs font-semibold uppercase"
              >
                Gallons Requested:
              </label>
              <input
                type="number"
                {...register("gallonsRequested", { valueAsNumber: true })}
                placeholder="123"
                className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-red-500">
                {errors.deliveryDate?.message}
              </p>
              <label
                htmlFor="fuelType"
                className="text-xs font-semibold uppercase"
              >
                Delivery Date:
              </label>
              <input
                type="Date"
                {...register("deliveryDate", { valueAsDate: true })}
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
                {userProfile.isLoading ? (
                  <div className="animate-pulse">
                    <div className="flex flex-col items-start justify-center gap-4">
                      <div className="mr-3 h-2.5 w-20 rounded-full bg-gray-400"></div>
                      <div className="h-2 w-24 rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-start">
                      {userProfile.data?.address.street}
                    </span>
                    <span className="text-start">
                      {userProfile.data?.address.city},{" "}
                      {userProfile.data?.address.state}{" "}
                      {userProfile.data?.address.zipcode}
                    </span>
                  </>
                )}
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
                {/* <span className="text-start">$1.50</span> */}
                {pricePerGallon.isSuccess ? (
                  <span>money</span>
                ) : (
                  <p>Generate quote to see price</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="ml-2 mt-5 flex flex-col gap-1">
              <label
                htmlFor="fuelType"
                className="text-md font-semibold uppercase"
              >
                Total Price:
              </label>
              <div className="flex flex-col p-4">
                <span className="text-start text-sm">
                  ${watch().pricePerGallon > 0 ? watch().pricePerGallon : 0} x{" "}
                  {watch().gallonsRequested > 0 ? watch().gallonsRequested : 0}{" "}
                  gallons
                </span>
                <span className="text-start text-xl font-semibold">$</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-4">
              <button
                className="w-full rounded-2xl border-4 border-black bg-yellow-accent px-4 py-2 text-xl font-semibold uppercase hover:bg-yellow-300"
                onClick={handleSubmit(handleGetPricePerGallon)}
              >
                Get Quote
              </button>

              <button
                onClick={handleSubmit(submitForm)}
                className="w-full rounded-2xl border-4 border-black bg-yellow-accent p-4 text-xl font-semibold uppercase hover:bg-yellow-300"
              >
                Submit Order
              </button>
            </div>
          </div>
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Newquote;
