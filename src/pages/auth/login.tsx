import React from "react";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordVerify: "",
    },
  });

  const { mutateAsync } = api.auth.login.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    console.log("DATA", data);
    try {
      const result = await mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (result.status === "success") {
        router.push("/");
      } else {
        // set the error to ui
        console.log("ERROR", result);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <form
        className="container flex flex-col items-center justify-center gap-12 px-4 py-16"
        onSubmit={onSubmit}
      >
        <div className="">
          <p>{errors.email?.message}</p>
          <input
            placeholder="email"
            type="email"
            className="px-4 py-2"
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <div>
          <p>{errors.password?.message}</p>
          <input
            placeholder="password"
            type="password"
            className="px-4 py-2"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
          Log In
        </button>
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};

export default Login;