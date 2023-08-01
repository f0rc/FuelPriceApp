import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty({
      message: "Username is required",
    })
    .max(50, "Username must contain at most 50 character(s)"),
  password: z
    .string()
    .nonempty({
      message: "Password is required",
    })
    .max(50, "Password must contain at most 50 character(s)"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,

    watch,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync } = api.auth.login.useMutation({
    onSuccess: () => {
      // console.log("success");
      // add a check to see if its first login then go to profile page prob some db check idk
      window.location.href = "/profile/main";
    },

    onError: (e) => {
      if (e.message === "User Not Found") {
        setError("root.serverError", {
          message: e.message,
        });
      } else if (e.message === "Invalid credentials") {
        setError("root.serverError", {
          message: e.message,
        });
      } else {
        setError("root.serverError", {
          message: "Internal Server Error",
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    // console.log("DATA", data);
    try {
      await mutateAsync({
        username: data.username,
        password: data.password,
      });
    } catch (e) {
      console.log("ERR");
    }
  });

  return (
    <div className="mt-14 flex justify-center align-middle">
      <div className="w-full  max-w-md border-4 border-black p-10">
        <h1 className="mb-10 text-center">
          <span className="text-3xl font-bold">Sign in to [FUEL]</span>
        </h1>

        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            {errors.root ? (
              <p className="text-sm text-red-500">
                {errors.root.serverError?.message}
              </p>
            ) : (
              ""
            )}
            <p className="text-sm text-red-500">{errors.username?.message}</p>
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
            <p className="text-sm text-red-500">{errors.password?.message}</p>
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
