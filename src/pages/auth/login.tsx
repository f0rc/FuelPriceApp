import React from "react";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      passwordVerify: "",
    },
  });

  const { mutateAsync } = api.auth.login.useMutation({
    onSuccess: () => {
      console.log("success");
      // add a check to see if its first login then go to profile page prob some db check idk
      window.location.href = "/";
    },
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    console.log("DATA", data);
    try {
      await mutateAsync({
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  });

  return (
    <div className="mt-14 flex justify-center align-middle">
      <div className="min-w-fit border-4 border-black p-10">
        <h1 className="mb-10 text-center">
          <span className="text-3xl font-bold">Sign in to [FUEL]</span>
        </h1>

        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <p>{errors.username?.message}</p>
            <label className="text-xs font-semibold uppercase">Username:</label>
            <input
              type="text"
              placeholder="janedoe123"
              className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              {...register("username", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>{errors.password?.message}</p>
            <label className="text-xs font-semibold uppercase">password:</label>
            <input
              type="password"
              placeholder="verysecurepassword123"
              className="flex h-14 flex-col rounded-2xl border-4 border-black bg-white p-4 align-middle"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <button className="rounded-2xl border-4 border-black bg-yellow-accent p-4 text-xl font-semibold uppercase hover:bg-yellow-300">
              Log in
            </button>
          </div>
        </form>

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default Login;
